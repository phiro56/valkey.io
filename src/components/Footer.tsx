import { Box, Container, Stack, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const FOOTER_ITEMS = [
  { label: 'Code of Conduct', href: '/code-of-conduct' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];

export const Footer = () => {
  return (
    <Box
      as="footer"
      py={10}
      borderTop="1px"
      borderColor="gray.200"
      mt="auto"
    >
      <Container maxW="7xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify="space-between"
          align="center"
        >
          <Text>© {new Date().getFullYear()} Valkey.io. All rights reserved.</Text>
          <Stack direction="row" spacing={6}>
            {FOOTER_ITEMS.map((item) => (
              <Link
                key={item.label}
                as={RouterLink}
                to={item.href}
                fontSize="sm"
                color="gray.600"
                _hover={{ color: 'gray.900' }}
              >
                {item.label}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}; 