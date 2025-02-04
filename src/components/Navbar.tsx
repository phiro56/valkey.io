import { Box, Flex, HStack, Link, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Install', href: '/install' },
  { label: 'Documentation', href: '/docs' },
  { label: 'Command Reference', href: '/commands' },
  { label: 'Blog', href: '/blog' },
  { label: 'Community', href: '/community' },
];

export const Navbar = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="nav"
      position="fixed"
      w="100%"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      zIndex="sticky"
    >
      <Flex
        maxW="7xl"
        mx="auto"
        px={4}
        h={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <Link
          as={RouterLink}
          to="/"
          fontSize="xl"
          fontWeight="bold"
          _hover={{ textDecoration: 'none' }}
        >
          Valkey.io
        </Link>

        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              as={RouterLink}
              to={item.href}
              fontSize="sm"
              fontWeight="500"
              _hover={{
                textDecoration: 'none',
                color: useColorModeValue('blue.500', 'blue.200'),
              }}
            >
              {item.label}
            </Link>
          ))}
        </HStack>
      </Flex>
    </Box>
  );
}; 