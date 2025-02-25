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
        name: 'ACL DELUSER',
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
        name: 'ACL HELP',
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
      {
        name: 'ACL LOG',
        path: '#',
      },
      {
        name: 'ACL SAVE',
        path: '#',
      },
      {
        name: 'ACL SETUSER',
        path: '#',
      },
      {
        name: 'ACL USERS',
        path: '#',
      },
      {
        name: 'ACL WHOAMI',
        path: '#',
      },
      {
        name: 'APPEND',
        path: '#',
      },
      {
        name: 'ASKING',
        path: '#',
      },
    ],
  },
];

interface CommandReferenceSidebarProps {
  searchQuery: string;
}

export const CommandReferenceSidebar = ({ searchQuery }: CommandReferenceSidebarProps) => {
  // Trim the search query to handle whitespace
  const trimmedQuery = searchQuery.trim();

  // Filter items if there's a search query
  const filteredItems = trimmedQuery
    ? navigationItems[0].items.filter(item =>
        item.name.toLowerCase().includes(trimmedQuery.toLowerCase())
      )
    : navigationItems[0].items;

  // Only show no results message if we have a non-empty search query AND no results
  if (trimmedQuery !== '' && filteredItems.length === 0) {
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

  // Show filtered results
  return (
    <VStack align="stretch" spacing={6}>
      <Box>
        <Box mb={4}>
          <VStack align="stretch">
            {filteredItems.map(item => (
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
      </Box>
    </VStack>
  );
};
