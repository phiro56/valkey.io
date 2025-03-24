import { execSync } from 'child_process';
import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';

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

// Function to clone/fetch the valkey-doc repository
function setupRepo() {
  const repoPath = path.join(process.cwd(), 'valkey-doc');
  
  if (!fs.existsSync(repoPath)) {
    console.log('Cloning valkey-doc repository...');
    execSync('git clone https://github.com/valkey-io/valkey-doc.git', { stdio: 'inherit' });
  } else {
    console.log('Updating valkey-doc repository...');
    execSync('cd valkey-doc && git pull', { stdio: 'inherit' });
  }
  
  return repoPath;
}

// Function to process markdown files
function processMarkdownFiles(repoPath: string): CommandCategory[] {
  const topicsPath = path.join(repoPath, 'topics');
  const files = fs.readdirSync(topicsPath).filter(file => file.endsWith('.md'));
  
  return files.map(file => {
    const content = fs.readFileSync(path.join(topicsPath, file), 'utf-8');
    const { data, content: markdownContent } = matter(content);
    
    // Convert markdown to HTML with full formatting
    const htmlContent = marked.parse(markdownContent) as string;
    
    return {
      id: path.basename(file, '.md'),
      topicName: data.title || path.basename(file, '.md'),
      description: data.description || '',
      htmlContent
    };
  });
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
function generateTopicsFile() {
  const repoPath = setupRepo();
  const topics = processMarkdownFiles(repoPath);
  const categories = organizeCategories(topics);

  const fileContent = `// This file is auto-generated. Do not edit manually.
import { CommandCategory, TopicCategory } from './types';

export const topics: CommandCategory[] = ${JSON.stringify(topics, null, 2)};

export const categories: TopicCategory[] = ${JSON.stringify(categories, null, 2)};
`;

  fs.writeFileSync(
    path.join(process.cwd(), 'src/data/topics.ts'),
    fileContent
  );

  console.log('Successfully generated topics.ts');
}

// Run the generator
generateTopicsFile(); 