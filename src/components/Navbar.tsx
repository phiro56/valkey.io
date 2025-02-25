import { Box, Flex, HStack, Image, Link } from '@chakra-ui/react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import ValkeyHorLogo from '/src/assets/images/valkey-horizontal-color.svg';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Install', href: '/install' },
  { label: 'Documentation', href: '/documentation' },
  { label: 'Command Reference', href: '/command-reference' },
  { label: 'Blog', href: '/blog' },
  { label: 'Community', href: '/community' },
  { label: 'Participants', href: '#Participants', isHashLink: true },
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1); // Remove the # from the href

    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on the home page, just scroll
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
      <Flex mx="auto" px={4} h={'80px'} alignItems="center" justifyContent="space-between">
        <Link as={RouterLink} to="/" variant="logo">
          <Image h={'46px'} w={'150px'} src={ValkeyHorLogo} alt="Valkey.io" />
        </Link>

        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          {NAV_ITEMS.map(item =>
            item.isHashLink ? (
              <Link
                key={item.label}
                href={item.href}
                onClick={e => handleHashLinkClick(e, item.href)}
                variant="nav"
                fontSize={'16px'}
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.label}
                as={RouterLink}
                to={item.href}
                variant="nav"
                aria-current={location.pathname === item.href ? 'page' : undefined}
                fontSize={'16px'}
              >
                {item.label}
              </Link>
            )
          )}
        </HStack>
      </Flex>
    </Box>
  );
};
