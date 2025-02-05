import { Box, Button, Container, Heading, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const Hero = () => {
  return (
    <Box as="section" pt={{ base: '4rem', md: '8rem' }} pb={{ base: '6rem', md: '10rem' }} background={'#2054B2'}>
      <Container maxW="7xl">
        <Stack spacing={8} alignItems="center" textAlign="center">
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={4}
            w="100%"
            maxW="md"
            justify="center"
          >
            <Button
              as={RouterLink}
              to="/install"
              variant="gradient"
            >
              GET STARTED
            </Button>
          </Stack>
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
        </Stack>
      </Container>
    </Box>
  );
}; 