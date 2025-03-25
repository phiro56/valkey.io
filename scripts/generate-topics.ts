import fs from 'fs';
import matter from 'gray-matter';
import https from 'https';
import { marked } from 'marked';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure marked for proper HTML generation
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert line breaks to <br>
});

interface CommandCategory {
  id: string;
  topicName: string;
  description: string;
  htmlContent: string;
}

interface TopicCategory {
  title: string;
  items: CommandCategory[];
}

// Function to fetch content from GitHub
async function fetchFromGitHub(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = `https://raw.githubusercontent.com/valkey-io/valkey-doc/main/${path}`;
    
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Function to process markdown files from GitHub
async function processMarkdownFiles(): Promise<CommandCategory[]> {
  const topicsPath = 'topics';
  const files = [
    'acl.md', 'cli.md', 'valkey.conf.md', 'server.md',
    'clients.md', 'client-side-caching.md', 'protocol.md',
    'strings.md', 'lists.md', 'sets.md', 'sorted-sets.md',
    'hashes.md', 'streams-intro.md', 'geospatial.md',
    'hyperloglogs.md', 'bitmaps.md', 'bitfields.md',
    'eval-intro.md', 'lua-api.md', 'functions-intro.md',
    'programmability.md', 'replication.md', 'sentinel.md',
    'cluster-tutorial.md', 'cluster-spec.md', 'admin.md',
    'security.md', 'encryption.md', 'persistence.md',
    'signals.md', 'memory-optimization.md', 'pipelining.md',
    'latency-monitor.md', 'performance-on-cpu.md', 'benchmark.md',
    'problems.md', 'debugging.md', 'ldb.md'
  ];
  
  const topics: CommandCategory[] = [];
  
  for (const file of files) {
    try {
      const content = await fetchFromGitHub(`${topicsPath}/${file}`);
      const { data, content: markdownContent } = matter(content);
      
      // Convert markdown to HTML with full formatting
      const htmlContent = marked.parse(markdownContent) as string;
      
      topics.push({
        id: path.basename(file, '.md'),
        topicName: data.title || path.basename(file, '.md'),
        description: data.description || '',
        htmlContent
      });
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  
  return topics;
}

// Function to organize topics by category
function organizeCategories(topics: CommandCategory[]): TopicCategory[] {
  const categoryMap: { [key: string]: string[] } = {
    'CONFIGURATION': ['acl', 'cli', 'valkey.conf', 'server'],
    'CLIENT HANDLING': ['clients', 'client-side-caching', 'protocol'],
    'DATA TYPES': ['strings', 'lists', 'sets', 'sorted-sets', 'hashes', 'streams-intro', 'geospatial', 'hyperloglogs', 'bitmaps', 'bitfields'],
    'SCRIPTING': ['eval-intro', 'lua-api', 'functions-intro', 'programmability'],
    'HIGH AVAILABILITY': ['replication', 'sentinel', 'cluster-tutorial', 'cluster-spec'],
    'ADMINISTRATION': ['admin', 'security', 'encryption', 'persistence', 'signals', 'memory-optimization'],
    'PERFORMANCE': ['pipelining', 'latency-monitor', 'performance-on-cpu', 'benchmark'],
    'TROUBLESHOOTING': ['problems', 'debugging', 'ldb']
  };

  return Object.entries(categoryMap).map(([title, ids]) => ({
    title,
    items: topics.filter(topic => ids.includes(topic.id))
  }));
}

// Main function to generate the topics.ts file
async function generateTopicsFile() {
  try {
    const topics = await processMarkdownFiles();
    const categories = organizeCategories(topics);

    const fileContent = `// This file is auto-generated. Do not edit manually.
import { CommandCategory, TopicCategory } from './types';

export const topics: CommandCategory[] = ${JSON.stringify(topics, null, 2)};

export const categories: TopicCategory[] = ${JSON.stringify(categories, null, 2)};
`;

    fs.writeFileSync(
      path.join(path.dirname(__dirname), 'src/data/topics.ts'),
      fileContent
    );

    console.log('Successfully generated topics.ts');
  } catch (error) {
    console.error('Error generating topics.ts:', error);
    process.exit(1);
  }
}

// Run the generator
generateTopicsFile(); 