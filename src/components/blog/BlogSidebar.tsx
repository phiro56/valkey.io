import { Box, Link, Text, VStack } from '@chakra-ui/react';

interface NavItem {
  title: string;
  items: {
    name: string;
    description: string;
    path: string;
  }[];
}

const navigationItems: NavItem[] = [
  {
    title: 'LATEST POSTS',
    items: [
      {
        name: 'Getting Started with Valkey',
        description: "A beginner's guide to using Valkey",
        path: '/blog/getting-started',
      },
      {
        name: 'Performance Tips',
        description: 'Optimize your Valkey implementation',
        path: '/blog/performance-tips',
      },
    ],
  },
  {
    title: 'CATEGORIES',
    items: [
      {
        name: 'Tutorials',
        description: 'Step-by-step guides and how-tos',
        path: '/blog/category/tutorials',
      },
      {
        name: 'News',
        description: 'Latest updates and announcements',
        path: '/blog/category/news',
      },
      {
        name: 'Case Studies',
        description: 'Real-world implementation stories',
        path: '/blog/category/case-studies',
      },
    ],
  },
];

export const BlogSidebar = () => {
  return (
    <VStack align="stretch" spacing={6} mt={'6'}>
      <Box>
        {navigationItems.map(section => (
          <Box key={section.title} mb={4}>
            <Text color="purple.700" fontWeight="semibold" mb={2}>
              {section.title}
            </Text>
            <VStack align="stretch">
              {section.items.map(item => (
                <Link
                  key={item.name}
                  href={item.path}
                  p={2}
                  background={'primary.100'}
                  _hover={{ bg: 'primary.200' }}
                >
                  <Text fontWeight="medium">{item.name}</Text>
                  <Text fontSize="sm">{item.description}</Text>
                </Link>
              ))}
            </VStack>
          </Box>
        ))}
      </Box>
    </VStack>
  );
};
