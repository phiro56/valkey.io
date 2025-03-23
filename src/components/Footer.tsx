import { Box, Container, Icon, Link, Stack, Text } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { SiSlack } from "react-icons/si";
import { Link as RouterLink, useLocation } from 'react-router-dom';

const FOOTER_ITEMS = [
  { label: 'Code of Conduct', href: '/community/code-of-conduct' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'FAQ', href: '/community/faq' },
];

const SOCIAL_LINKS = [
  { label: 'Slack', href: 'https://valkey-oss-developer.slack.com/join/shared_invite/zt-2nxs51chx-EB9hu9Qdch3GMfRcztTSkQ#/shared-invite/email', icon: SiSlack, isExternal: true },
  { label: 'GitHub', href: 'https://github.com/orgs/valkey-io/discussions', icon: FaGithub, isExternal: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/valkey/', icon: FaLinkedin, isExternal: true },
  { label: 'Twitter', href: 'https://x.com/valkey_io', icon: FaTwitter, isExternal: true },
  { label: 'Connect', href: '/connect', icon: IoMdMail, isExternal: false },
];

export const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <Box 
      as="footer" 
      py={5} 
      mt="auto" 
      bg={'#1A2026'} 
      position={{ 
        base: 'relative',
        lg: isHomePage ? "relative" : "sticky"
      }}
      bottom={0} 
      width="100%"
    >
      <Container maxW="none">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify="space-between"
          align="center"
        >
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            {SOCIAL_LINKS.map(item => (
              item.isExternal ? (
                <Link
                  key={item.label}
                  href={item.href}
                  isExternal
                  color="white"
                  _hover={{ color: '#ccc' }}
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  fontSize="sm"
                >
                  <Icon as={item.icon} boxSize={5} />
                  <Text>{item.label}</Text>
                </Link>
              ) : (
                <Link
                  key={item.label}
                  as={RouterLink}
                  to={item.href}
                  color="white"
                  _hover={{ color: '#ccc' }}
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  fontSize="sm"
                >
                  <Icon as={item.icon} boxSize={5} />
                  <Text>{item.label}</Text>
                </Link>
              )
            ))}
          </Stack>
          <Stack direction="row" spacing={6}>
            {FOOTER_ITEMS.map(item => (
              <Link
                key={item.label}
                as={RouterLink}
                to={item.href}
                fontSize="sm"
                color="white"
                textDecor={'underline'}
                _hover={{ color: '#ccc' }}
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
