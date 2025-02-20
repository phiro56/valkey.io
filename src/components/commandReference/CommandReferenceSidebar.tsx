import { Box, Link, Text, VStack } from '@chakra-ui/react';

interface NavItem {
  items: {
    name: string;
    path: string;
  }[];
}

const navigationItems: NavItem[] = [
  {
    items: [
      {
        name: 'ACL',
        path: '#',
      },
      {
        name: 'ACL CAT',
        path: '#',
      },
      {
        name: 'ACL DRYRUN',
        path: '#',
      },
      {
        name: 'ACL GENPASS',
        path: '#',
      },
      {
        name: 'ACL GETUSER',
        path: '#',
      },
      {
        name: 'ACL LIST',
        path: '#',
      },
      {
        name: 'ACL LOAD',
        path: '#',
      },
      // Add more items as needed
    ],
  },
];

export const CommandReferenceSidebar = () => {
  return (
    <VStack align="stretch" spacing={6}>
      <Box>
        {navigationItems.map(section => (
          <Box mb={4}>
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
                </Link>
              ))}
            </VStack>
          </Box>
        ))}
      </Box>
    </VStack>
  );
};
