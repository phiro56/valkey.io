import { Box, Heading, List, ListItem } from '@chakra-ui/react';

export interface ReleaseNote {
  title: string;
  items: string[];
}

export const releaseNotes: ReleaseNote[] = [
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
];

export const WhatsNew = () => {
  return (
    <Box bg={'rgba(209, 217, 255, 0.5)'} p={6} borderRadius={'2'}>
      {releaseNotes.map((section, sectionIndex) => (
        <Box key={section.title} mb={sectionIndex !== releaseNotes.length - 1 ? 6 : 0}>
          <Heading as="h3" size="sm" mb={2} color={'secondary.lavender.text'}>
            {section.title}
          </Heading>
          <List spacing={2} color={'#353535'}>
            {section.items.map((item, itemIndex) => (
              <ListItem key={itemIndex} borderBottom={'1px solid #9D9D9D'} pb={2} pl={'2'}>
                • {item}
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};
