import { Box, Flex, HStack, Link } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Install', href: '/install' },
  { label: 'Documentation', href: '/docs' },
  { label: 'Command Reference', href: '/commands' },
  { label: 'Blog', href: '/blog' },
  { label: 'Community', href: '/community' },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <Box
      as="nav"
      position="fixed"
      w="100%"
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
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
          variant="logo"
        >
          {/* TODO: Replace with logo image */}
          Valkey.io
        </Link>

        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              as={RouterLink}
              to={item.href}
              variant="nav"
              aria-current={location.pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </HStack>
      </Flex>
    </Box>
  );
}; 