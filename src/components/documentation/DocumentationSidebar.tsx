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
    title: 'CONFIGURATION',
    items: [
      {
        name: 'ACL',
        description: 'Valkey Access Control List',
        path: '/documentation/acl',
      },
      {
        name: 'CLI',
        description: 'Valkey command line interface',
        path: '/documentation/cli',
      },
      // Add more items as needed
    ],
  },
  {
    title: 'CLIENT HANDLING',
    items: [
      {
        name: 'Administration',
        description: 'Advice for configuring and managing Valkey in production',
        path: '/documentation/administration',
      },
      // Add more items as needed
    ],
  },
];

export const DocumentationSidebar = () => {
  return (
    <VStack align="stretch" spacing={6}>
      <Box>
        <Text color={'secondary.purple.500'} mb={2}>
          Browse by task
        </Text>
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
