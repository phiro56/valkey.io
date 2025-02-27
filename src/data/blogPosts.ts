export interface Author {
  name: string;
  username: string;
  bio: string;
  imageUrl: string;
  role: string;
}

export interface Category {
  value: string;
  label: string;
  description: string;
}

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

export const authors: Author[] = [
  {
    name: 'Kyle Davis',
    username: 'stockholmux',
    role: 'Senior Developer Advocate',
    bio: 'Senior Developer Advocate on the Valkey project. Former founding contributor to OpenSearch and community builder for Betterrocket OS. Passionate about 3D printing and gardening in Edmonton, Alberta.',
    imageUrl:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Sarah Chen',
    username: 'sarahc',
    role: 'Principal Engineer',
    bio: 'Principal Engineer at Valkey, focusing on distributed systems and performance optimization. Previously led infrastructure teams at major tech companies. Speaker at tech conferences and open source contributor.',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Marcus Rodriguez',
    username: 'mroddev',
    role: 'Technical Lead',
    bio: 'Technical Lead for Valkey Cloud Services. Specializes in cloud architecture and security. Regular speaker at AWS events and author of several technical publications on distributed systems.',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
  },
];

export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  content: string;
  slug: string;
  category: string;
  imageUrl: string;
  isTrending?: boolean;
  author: Author;
}

export const blogDigest: BlogPost[] = [
  {
    title: 'Reducing application latency and lowering Cloud bill by setting up your client library',
    date: 'Wednesday January 8, 2025',
    excerpt:
      'By implementing AZ affinity routing in Valkey and using GLIDE, you can achieve lower latency and cost savings by routing requests to replicas in the same AZ as the client.',
    content: `
      <h2>Introduction</h2>
      <p>In today's cloud-native world, optimizing application performance while managing costs is crucial. This tutorial will guide you through implementing AZ affinity routing in Valkey using GLIDE.</p>
      
      <h2>Understanding AZ Affinity</h2>
      <p>Availability Zone (AZ) affinity ensures that your requests are routed to the closest physical infrastructure, reducing network latency and associated costs.</p>
      
      <h2>Implementation Steps</h2>
      <ol>
        <li>Configure your Valkey client with AZ awareness</li>
        <li>Set up GLIDE integration</li>
        <li>Implement routing policies</li>
        <li>Monitor and optimize performance</li>
      </ol>
      
      <h2>Performance Results</h2>
      <p>Our testing shows up to 40% reduction in latency and 25% decrease in cross-AZ data transfer costs.</p>
    `,
    slug: 'reducing-application-latency',
    category: 'tutorials',
    imageUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    isTrending: true,
    author: authors[1],
  },
  {
    title: '2024: The Year of Valkey',
    date: 'Friday December 20, 2024',
    excerpt:
      'The end of the calendar year is a great time to reflect, but for Valkey this particular year-end holds special meaning.',
    content: `
      <h2>A Year of Milestones</h2>
      <p>2024 has been transformative for Valkey. We've achieved remarkable growth, launched groundbreaking features, and built an amazing community.</p>
      
      <h2>Key Achievements</h2>
      <ul>
        <li>Reached 1 million active users</li>
        <li>Launched enterprise-grade security features</li>
        <li>Expanded our global infrastructure</li>
        <li>Released our plugin marketplace</li>
      </ul>
      
      <h2>Looking Forward</h2>
      <p>As we move into 2025, we're excited about our roadmap and the continued evolution of our platform.</p>
    `,
    slug: 'year-of-valkey-2024',
    category: 'news',
    imageUrl:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    author: authors[0],
  },
  {
    title: 'Pushing the limits of Valkey on a Raspberry Pi',
    date: 'Thursday November 21, 2024',
    excerpt:
      "While most people won't go to production on a Raspberry Pi, we'll cover how to thoroughly performance test Valkey to understand how it works in production.",
    content: `
      <h2>The Raspberry Pi Challenge</h2>
      <p>We decided to push Valkey to its limits on a Raspberry Pi to demonstrate its efficiency and versatility.</p>
      
      <h2>Test Setup</h2>
      <ul>
        <li>Raspberry Pi 4 Model B (8GB RAM)</li>
        <li>Ubuntu Server 22.04 LTS</li>
        <li>Valkey v2.5.0</li>
      </ul>
      
      <h2>Performance Results</h2>
      <p>Our tests revealed impressive capabilities:</p>
      <ul>
        <li>Handled 1000 concurrent connections</li>
        <li>Maintained sub-100ms response times</li>
        <li>Efficient memory usage under load</li>
      </ul>
    `,
    slug: 'valkey-on-raspberry-pi',
    category: 'case-studies',
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    author: authors[2],
  },
  {
    title: 'Scaling Valkey in High-Traffic Environments',
    date: 'Tuesday March 4, 2025',
    excerpt:
      'Discover strategies to optimize Valkey performance under heavy loads, including caching, parallel processing, and load balancing techniques.',
    content: `
      <h2>Scaling Challenges</h2>
      <p>High-traffic environments present unique challenges that require careful planning and optimization.</p>
      
      <h2>Key Strategies</h2>
      <ol>
        <li>Implementing distributed caching</li>
        <li>Optimizing database queries</li>
        <li>Setting up load balancers</li>
        <li>Monitoring and alerting</li>
      </ol>
      
      <h2>Best Practices</h2>
      <p>Learn from real-world implementations and avoid common pitfalls in scaling Valkey.</p>
    `,
    slug: 'scaling-valkey-high-traffic',
    category: 'tutorials',
    imageUrl:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
    author: authors[1],
  },
  {
    title: "Introducing Valkey's New Security Features",
    date: 'Monday May 12, 2025',
    excerpt:
      'Learn about the latest encryption, authentication, and role-based access enhancements that keep your Valkey deployment secure.',
    content: `
      <h2>Enhanced Security Suite</h2>
      <p>Security is our top priority. Our latest release includes comprehensive security enhancements to protect your data.</p>
      
      <h2>New Features</h2>
      <ul>
        <li>End-to-end encryption</li>
        <li>Multi-factor authentication</li>
        <li>Advanced role-based access control</li>
        <li>Audit logging and compliance reporting</li>
      </ul>
      
      <h2>Implementation Guide</h2>
      <p>Follow our step-by-step guide to implement these security features in your deployment.</p>
    `,
    slug: 'valkey-security-features-2025',
    category: 'news',
    imageUrl:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    author: authors[2],
  },
  {
    title: "A Deep Dive Into Valkey's Plugin Ecosystem",
    date: 'Wednesday July 16, 2025',
    excerpt:
      'From custom data transformations to real-time analytics, explore how Valkeys plugin system helps you tailor the platform to your specific needs.',
    content: `
      <h2>Plugin Architecture</h2>
      <p>Valkey's plugin system is designed for extensibility and performance, allowing you to customize functionality without compromising stability.</p>
      
      <h2>Popular Plugins</h2>
      <ul>
        <li>Real-time Analytics Engine</li>
        <li>Custom Data Transformers</li>
        <li>Integration Adapters</li>
        <li>Monitoring Tools</li>
      </ul>
      
      <h2>Development Guide</h2>
      <p>Learn how to create your own plugins and contribute to the ecosystem.</p>
    `,
    slug: 'valkey-plugin-ecosystem',
    category: 'tutorials',
    imageUrl:
      'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop',
    author: authors[0],
  },
];
