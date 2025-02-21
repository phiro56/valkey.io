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

interface CommandReferenceSidebarProps {
  searchQuery: string;
}

export const CommandReferenceSidebar = ({ searchQuery }: CommandReferenceSidebarProps) => {
  if (searchQuery) {
    return (
      <Box borderRadius={'2px'} p={8} textAlign="center">
        <Text fontWeight="800" color="secondary.purple.500" mb={1} fontSize={'60px'}>
          &lt;/&gt;
        </Text>
        <Text fontWeight="medium" color="secondary.purple.500" mb={1}>
          We couldn't find any results matching your search
        </Text>
        <Text color="secondary.purple.500">Check your spelling or try different keywords</Text>
      </Box>
    );
  }

  return (
    <VStack align="stretch" spacing={6}>
      <Box>
        {navigationItems.map((section, index) => (
          <Box key={`section-${index}`} mb={4}>
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
