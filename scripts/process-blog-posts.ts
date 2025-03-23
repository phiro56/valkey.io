import fs from 'fs';
import { marked } from 'marked';
import path from 'path';
import { BlogPost, Category } from '../src/data/types';

interface FrontmatterData {
  title?: string;
  date?: string;
  excerpt?: string;
  description?: string;
  category?: string;
  image?: string;
  authors?: string[];
  author?: string;
  trending?: string;
}

// Define categories
const categories: Category[] = [
  {
    value: 'tutorials',
    label: 'Tutorials',
    description: 'Step-by-step guides and technical walkthroughs',
  },
  {
    value: 'news',
    label: 'News',
    description: 'Latest updates and announcements from Valkey',
  },
  {
    value: 'case-studies',
    label: 'Case Studies',
    description: 'Real-world examples and implementation stories',
  },
];

// Add type for valid categories
type ValidCategory = 'tutorials' | 'news' | 'case-studies';

// Parse custom frontmatter format
function parseCustomFrontmatter(content: string): { data: FrontmatterData; content: string } {
  const lines = content.split('\n');
  const data: FrontmatterData = {};
  let contentStartIndex = 0;

  // Find the start of frontmatter
  let frontmatterStart = -1;
  let frontmatterEnd = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Check for both +++ and --- delimiters
    if (line === '+++' || line === '---') {
      if (frontmatterStart === -1) {
        frontmatterStart = i;
      } else {
        frontmatterEnd = i;
        contentStartIndex = i + 1;
        break;
      }
    }
  }

  // Parse frontmatter if found
  if (frontmatterStart !== -1 && frontmatterEnd !== -1) {
    for (let i = frontmatterStart + 1; i < frontmatterEnd; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Check if line starts with a field name followed by : or =
      const match = line.match(/^(\w+):?\s*[:=]\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        // Remove quotes if present
        const cleanValue = value.replace(/^["']|["']$/g, '');
        
        // Handle authors array
        if (key === 'authors') {
          // Parse array-like string into actual array
          data.authors = cleanValue
            .replace(/^\[|\]$/g, '') // Remove [ and ]
            .split(',')
            .map(author => author.trim().replace(/^["']|["']$/g, '')); // Remove quotes from each author
        } else if (key === 'title') {
          data.title = cleanValue;
        } else if (key === 'date') {
          data.date = cleanValue;
        } else if (key === 'excerpt') {
          data.excerpt = cleanValue;
        } else if (key === 'description') {
          data.description = cleanValue;
        } else if (key === 'category') {
          data.category = cleanValue;
        } else if (key === 'image') {
          data.image = cleanValue;
        } else if (key === 'author') {
          data.author = cleanValue;
        } else if (key === 'trending') {
          data.trending = cleanValue;
        }
      }
    }
  }

  return {
    data,
    content: lines.slice(contentStartIndex).join('\n')
  };
}

// Process a single markdown file into a blog post
function processMarkdownFile(filePath: string): Omit<BlogPost, 'authors'> & { authorUsernames: string[] } {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: markdownContent } = parseCustomFrontmatter(content);
  
  // Get the filename without extension and remove the date prefix if it exists
  const filename = path.basename(filePath, '.md');
  const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '');

  // Get the author usernames - support both single author and multiple authors
  const authorUsernames = data.authors || (data.author ? [data.author] : ['unknown']);

  // Format the date to ISO string
  const date = data.date ? new Date(data.date).toISOString() : new Date().toISOString();

  // Validate and cast category
  const category = (data.category || 'news') as ValidCategory;
  if (!['tutorials', 'news', 'case-studies'].includes(category)) {
    console.warn(`Warning: Invalid category "${category}" in ${filePath}, defaulting to "news"`);
  }

  // Configure marked with custom renderer for images
  marked.use({
    renderer: {
      image(href, title, text) {
        // Add /src prefix to image paths if they start with /assets
        const imagePath = href?.startsWith('/assets') ? `/src${href}` : href;
        return `<img src="${imagePath}" alt="${text}"${title ? ` title="${title}"` : ''} />`;
      }
    }
  });

  return {
    title: data.title || 'Untitled',
    date,
    excerpt: data.excerpt || data.description || markdownContent.slice(0, 200) + '...',
    content: marked.parse(markdownContent) as string,
    slug,
    category,
    imageUrl: data.image || '/src/assets/media/blog/default.png',
    authorUsernames,
    trending: data.trending === 'true'
  };
}

// Main function to process all blog posts
function processBlogPosts() {
  const blogDir = path.join(process.cwd(), 'public/content/blog');
  const files = fs.readdirSync(blogDir);

  const posts = files
    .filter(file => file.endsWith('.md') && !file.startsWith('_'))
    .map(file => processMarkdownFile(path.join(blogDir, file)));

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Generate the blogPosts.ts content
  const blogPostsContent = `// This file is auto-generated. Do not edit manually.
import { BlogPost, Category } from './types';
import { authors } from './authors';

export const categories: Category[] = ${JSON.stringify(categories, null, 2)};

export const blogPostsRaw = ${JSON.stringify(posts, null, 2)} as const;

export const blogPosts: BlogPost[] = blogPostsRaw.map(post => ({
  ...post,
  category: post.category as 'tutorials' | 'news' | 'case-studies',
  authors: post.authorUsernames.map(username => 
    authors.find(a => a.username === username) || {
      name: 'Unknown Author',
      username,
      bio: 'No bio available',
      imageUrl: '/images/authors/default.jpg',
      role: 'Contributor'
    }
  )
}));

export const blogDigest = blogPosts.map(({ title, date, excerpt, slug, category, imageUrl, authors, trending }) => ({
  title,
  date,
  excerpt,
  slug,
  category,
  imageUrl,
  authors,
  trending
}));
`;

  // Write the generated content to blogPosts.ts
  fs.writeFileSync(
    path.join(process.cwd(), 'src/data/blogPosts.ts'),
    blogPostsContent
  );

  console.log(`Processed ${posts.length} blog posts`);
}

// Run the script
processBlogPosts(); 