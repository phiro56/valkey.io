# Blog Content Documentation

## Data Structure

### Author Interface

```typescript
interface Author {
  name: string; // Author's full name
  username: string; // Author's username (without @)
  bio: string; // Author's biography
  imageUrl: string; // Author's profile image URL
  role: string; // Author's role/position
}
```

### Category Interface

```typescript
interface Category {
  value: string; // Category identifier
  label: string; // Display name
  description: string; // Category description
}
```

### Blog Post Interface

```typescript
interface BlogPost {
  title: string; // The title of the blog post
  date: string; // Date in format "Day Month DD, YYYY"
  excerpt: string; // A brief summary of the post
  content: string; // HTML-formatted content of the post
  slug: string; // URL-friendly identifier
  category: string; // Post category (matches Category.value)
  imageUrl: string; // URL to the post's featured image
  isTrending?: boolean; // Optional: Mark post as trending
  author: Author; // Author information
}
```

## Categories

The blog system has predefined categories stored in the `categories` array:

```typescript
export const categories: Category[] = [
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
```

## Blog Components

### BlogContent

The main component that displays the list of blog posts. Features:

- Filters posts based on:
  - Search query (title, excerpt, date)
  - Category
  - Date
- Displays posts in a card format with:
  - Title
  - Date
  - Excerpt
  - Read More link

### BlogSearch

Search and filter interface component that includes:

- Search input for articles
- Category dropdown filter
- Date picker filter

### BlogSidebar

Displays trending posts in a sidebar format. Features:

- Shows posts marked with `isTrending: true`
- Each trending post displays:
  - Featured image (50% width)
  - Title (max 2 lines)
  - Excerpt (max 2 lines)
  - Read More button

### BlogPost Page

Individual blog post page layout:

1. **Header Section**

   - Breadcrumb navigation (Blog > Post Title)
   - Featured image (400px height)
   - Post title
   - Publication date

2. **Main Content Area**

   - Background: white
   - Full post content in HTML format
   - Styled HTML elements:
     - h2: 20px, bold, purple
     - h3: 18px, bold, purple
     - h4: 16px, bold, purple
     - Paragraphs: 16px with 1.6 line height
     - Lists: Properly indented with 24px padding
     - Images: Full width with proper spacing
   - Responsive layout

3. **Sidebar (33% width)**
   - Author information
     - Profile image
     - Name
     - Username
     - Role
     - Bio
   - Related posts section
     - Shows up to 3 posts from the same category
     - Each related post shows:
       - Featured image (50% width)
       - Title (max 2 lines)
       - Excerpt (max 2 lines)
       - Read More button

## URL Structure

- Blog listing: `/blog`
- Individual posts: `/blog/{slug}`

## Best Practices

1. **Images**

   - Use high-quality images optimized for web
   - Featured images: recommended 1200x800 pixels
   - Author profile images: 120x120 pixels
   - Include fallback images where appropriate

2. **Content**

   - Keep titles concise and descriptive
   - Write engaging excerpts (150-200 characters)
   - Format main content in HTML with proper semantic structure
   - Use appropriate heading hierarchy (h2, h3, h4)
   - Include proper spacing and formatting for lists and paragraphs
   - Use SEO-friendly slugs
   - Maintain consistent date format: "Day Month DD, YYYY"

3. **Categories**

   - Use predefined categories only
   - Ensure posts are properly categorized
   - Maintain a good balance of content across categories

4. **Trending Posts**

   - Limit number of trending posts
   - Regularly review and update trending status
   - Use high-quality featured images for trending posts

5. **Author Information**

   - Keep bios professional and concise
   - Include relevant role information
   - Use consistent username format
   - Provide high-quality profile images

6. **Performance**
   - Optimize all images
   - Use lazy loading for images where appropriate
   - Consider mobile responsiveness
