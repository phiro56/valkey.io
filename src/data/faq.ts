export interface FaqCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
}

export const faqCategories: FaqCategory[] = [
  {
    id: 'cat_1',
    name: 'Getting Started',
    slug: 'getting-started',
  },
  {
    id: 'cat_2',
    name: 'Installation',
    slug: 'installation',
  },
  {
    id: 'cat_3',
    name: 'Security',
    slug: 'security',
  },
  {
    id: 'cat_4',
    name: 'API Reference',
    slug: 'api-reference',
  },
  {
    id: 'cat_5',
    name: 'Troubleshooting',
    slug: 'troubleshooting',
  }
];

export const faqs: Faq[] = [
  // Getting Started
  {
    id: 'faq_1',
    question: 'What is Valkey?',
    answer: 'Valkey is an open-source key management solution designed to help teams manage and secure their API keys, secrets, and credentials effectively.',
    categoryId: 'cat_1'
  },
  {
    id: 'faq_1_1',
    question: 'How do I get started with Valkey?',
    answer: 'To get started with Valkey, first install it using npm, then run `valkey init` to create your configuration. Follow our quickstart guide in the documentation for detailed steps.',
    categoryId: 'cat_1'
  },
  {
    id: 'faq_1_2',
    question: 'What are the system requirements?',
    answer: 'Valkey requires Node.js version 14 or higher and works on Linux, macOS, and Windows. You\'ll need at least 100MB of disk space and 256MB of RAM.',
    categoryId: 'cat_1'
  },
  {
    id: 'faq_1_3',
    question: 'Is Valkey free to use?',
    answer: 'Yes, Valkey is open-source and free to use. We also offer premium support and enterprise features for teams requiring additional capabilities.',
    categoryId: 'cat_1'
  },

  // Installation
  {
    id: 'faq_2',
    question: 'How do I install Valkey on Linux?',
    answer: 'To install Valkey on Linux, run `npm install -g valkey` in your terminal. Make sure you have Node.js version 14 or higher installed.',
    categoryId: 'cat_2'
  },
  {
    id: 'faq_2_1',
    question: 'How do I install Valkey on macOS?',
    answer: 'On macOS, you can install Valkey using npm: `npm install -g valkey`. Alternatively, you can use Homebrew: `brew install valkey`.',
    categoryId: 'cat_2'
  },
  {
    id: 'faq_2_2',
    question: 'Can I install Valkey without npm?',
    answer: 'Yes, you can download the standalone binary from our releases page or use alternative package managers like Homebrew (macOS) or Chocolatey (Windows).',
    categoryId: 'cat_2'
  },
  {
    id: 'faq_2_3',
    question: 'How do I verify my Valkey installation?',
    answer: 'Run `valkey --version` to verify the installation and check your installed version. You can also run `valkey doctor` to check for common configuration issues.',
    categoryId: 'cat_2'
  },

  // Security
  {
    id: 'faq_3',
    question: 'Is my data encrypted at rest?',
    answer: 'Yes, all secrets in Valkey are encrypted using industry-standard AES-256 encryption before being stored. Your master key never leaves your system.',
    categoryId: 'cat_3'
  },
  {
    id: 'faq_3_1',
    question: 'How does Valkey handle key rotation?',
    answer: 'Valkey supports automatic and manual key rotation. You can set rotation policies or manually rotate keys using the `valkey rotate` command.',
    categoryId: 'cat_3'
  },
  {
    id: 'faq_3_2',
    question: 'What security certifications does Valkey have?',
    answer: 'Valkey undergoes regular security audits and is SOC 2 Type II compliant. We also maintain GDPR compliance for EU users.',
    categoryId: 'cat_3'
  },
  {
    id: 'faq_3_3',
    question: 'How can I report a security vulnerability?',
    answer: 'Security vulnerabilities should be reported to security@valkey.io or through our responsible disclosure program on HackerOne.',
    categoryId: 'cat_3'
  },

  // API Reference
  {
    id: 'faq_4',
    question: 'What are the available CLI commands?',
    answer: 'The main CLI commands include `valkey init`, `valkey add`, `valkey list`, `valkey remove`, and `valkey update`. Each command has various options and flags.',
    categoryId: 'cat_4'
  },
  {
    id: 'faq_4_1',
    question: 'Does Valkey have a REST API?',
    answer: 'Yes, Valkey provides a comprehensive REST API for programmatic access. Check our API documentation for endpoints and authentication details.',
    categoryId: 'cat_4'
  },
  {
    id: 'faq_4_2',
    question: 'Are there rate limits on the API?',
    answer: 'Free tier users have 1000 requests per hour. Enterprise users get custom limits based on their needs. Rate limit headers are included in all responses.',
    categoryId: 'cat_4'
  },
  {
    id: 'faq_4_3',
    question: 'What client libraries are available?',
    answer: 'We provide official client libraries for Node.js, Python, Java, and Go. Community-maintained libraries are available for other languages.',
    categoryId: 'cat_4'
  },

  // Troubleshooting
  {
    id: 'faq_5',
    question: 'Why am I getting an authentication error?',
    answer: 'Authentication errors usually occur due to expired tokens or incorrect permissions. Try running `valkey login` again or check your access rights.',
    categoryId: 'cat_5'
  },
  {
    id: 'faq_5_1',
    question: 'How do I recover a lost master key?',
    answer: 'Master keys cannot be recovered for security reasons. We recommend setting up key backup or using our enterprise key management solution.',
    categoryId: 'cat_5'
  },
  {
    id: 'faq_5_2',
    question: 'Why is my synchronization failing?',
    answer: 'Sync issues often result from network problems or conflicts. Check your internet connection and run `valkey sync --debug` for detailed error information.',
    categoryId: 'cat_5'
  },
  {
    id: 'faq_5_3',
    question: 'How do I debug permission issues?',
    answer: 'Use `valkey whoami` to check your current user and permissions. The `valkey audit` command can help track permission-related issues.',
    categoryId: 'cat_5'
  }
];
