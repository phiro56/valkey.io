import { Box, Button, Container, Heading, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import HeroBg from '/src/assets/images/hero-bg.webp';

export const Hero = () => {
  return (
    <Box
      as="section"
      pt={{ base: '4rem', md: '12rem' }}
      pb={{ base: '6rem', md: '12rem' }}
      backgroundImage={HeroBg}
      backgroundSize={'cover'}
      backgroundColor={'#2054B2'}
    >
      <Container maxW="7xl">
        <Stack spacing={8} alignItems="center" textAlign="center">
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={4}
            w="100%"
            maxW="md"
            justify="center"
          >
            <Button as={RouterLink} to="/install" variant="gradient">
              GET STARTED
            </Button>
          </Stack>
          <Stack>
            <Heading
              as="h1"
              fontSize="24px"
              fontWeight="bold"
              lineHeight="1.2"
              letterSpacing="tight"
              color={'#ffffff'}
            >
              Join the Valkey.io community and download the latest release.
            </Heading>
            <RouterLink
              to="#how-to-contribute"
              style={{ color: 'white', textDecoration: 'underline' }}
            >
              Click here to learn how to contribute
            </RouterLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
