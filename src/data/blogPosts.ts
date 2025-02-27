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
    slug: 'reducing-application-latency',
    category: 'tutorials',
    imageUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    isTrending: true,
    author: authors[1], // Sarah Chen
  },
  {
    title: '2024: The Year of Valkey',
    date: 'Friday December 20, 2024',
    excerpt:
      'The end of the calendar year is a great time to reflect, but for Valkey this particular year-end holds special meaning.',
    slug: 'year-of-valkey-2024',
    category: 'news',
    imageUrl:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    author: authors[0], // Kyle Davis
  },
  {
    title: 'Pushing the limits of Valkey on a Raspberry Pi',
    date: 'Thursday November 21, 2024',
    excerpt:
      "While most people won't go to production on a Raspberry Pi, we'll cover how to thoroughly performance test Valkey to understand how it works in production.",
    slug: 'valkey-on-raspberry-pi',
    category: 'case-studies',
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    author: authors[2], // Marcus Rodriguez
  },
  {
    title: 'Scaling Valkey in High-Traffic Environments',
    date: 'Tuesday March 4, 2025',
    excerpt:
      'Discover strategies to optimize Valkey performance under heavy loads, including caching, parallel processing, and load balancing techniques.',
    slug: 'scaling-valkey-high-traffic',
    category: 'tutorials',
    imageUrl:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
    author: authors[1], // Sarah Chen
  },
  {
    title: "Introducing Valkey's New Security Features",
    date: 'Monday May 12, 2025',
    excerpt:
      'Learn about the latest encryption, authentication, and role-based access enhancements that keep your Valkey deployment secure.',
    slug: 'valkey-security-features-2025',
    category: 'news',
    imageUrl:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    author: authors[2], // Marcus Rodriguez
  },
  {
    title: "A Deep Dive Into Valkey's Plugin Ecosystem",
    date: 'Wednesday July 16, 2025',
    excerpt:
      'From custom data transformations to real-time analytics, explore how Valkeys plugin system helps you tailor the platform to your specific needs.',
    slug: 'valkey-plugin-ecosystem',
    category: 'tutorials',
    imageUrl:
      'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop',
    author: authors[0], // Kyle Davis
  },
];
