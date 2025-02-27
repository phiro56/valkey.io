export interface ReleaseNote {
  version: string;
  releaseDate: string;
  sections: {
    title: string;
    items: string[];
  }[];
}

export const releaseNotes: ReleaseNote = {
  version: '1.5.0',
  releaseDate: 'January 20, 2025',
  sections: [
    {
      title: "What's New",
      items: [
        'Advanced Usage Analytics Dashboard: A powerful new dashboard to visualize and monitor software license usage trends and insights in real-time.',
        'AI-Driven Insights: Enhanced AI capabilities to suggest license optimizations and predict future licensing needs.',
        'Automated License Renewals: Introduced automatic reminders and renewals for expiring licenses to reduce manual effort.',
      ],
    },
    {
      title: 'Improvements',
      items: [
        'Faster Load Times: Optimized backend processes to reduce dashboard load times by up to 40%.',
        'Enhanced Security: Implemented advanced encryption standards to improve data security.',
        'Improved Search Functionality: Refined search filters to make finding licenses and usage data easier.',
      ],
    },
    {
      title: 'Bug Fixes',
      items: [
        'Fixed an issue where license renewal notifications were not being sent in some cases.',
        'Resolved a glitch causing incorrect usage stats to display for certain licenses.',
        'Addressed UI inconsistencies in the subscription management section.',
      ],
    },
    {
      title: 'Known Issues',
      items: [
        'Bulk editing of licenses may occasionally result in a delay in updates. A fix is scheduled for the next release.',
        'Some users may experience a slight delay in loading the AI insights for large data sets.',
      ],
    },
  ],
};
