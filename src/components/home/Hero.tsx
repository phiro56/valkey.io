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
      backgroundColor={'#6983FF'}
    >
      <Container maxW="7xl">
        <Stack spacing={8} alignItems="center" textAlign="center">
          <Stack>
            <Heading
              as="h1"
              fontSize="34px"
              fontWeight="bold"
              lineHeight="1.2"
              letterSpacing="tight"
              color={'#ffffff'}
            >
              Lightning fast. Massively Scalable. Truly Open Source
            </Heading>
            <Heading
              as="h2"
              fontSize="18px"
              fontWeight="400"
              lineHeight="1.4"
              letterSpacing="tight"
              color={'#ffffff'}
              maxW={'720px'}
              mx={'auto'}
            >
              Accelerate your applications with Valkey, the high-performance, in-memory data store
              built for speed, scale, and open innovation. Backed by the Linux Foundation, Valkey
              delivers the real-time capabilities you need – without vendor lock-in
            </Heading>
          </Stack>
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
              minW={{ base: 'auto', sm: '380px' }}
            >
              GET STARTED
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
