import { Box, Button, Container, Heading, Link, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import HeroBg from '/src/assets/images/hero-bg.webp';

export const Hero = () => {
  return (
    <Box
      as="section"
      pt={{ base: '4rem', md: '12rem' }}
      pb={{ base: '2rem', md: '4rem' }}
      backgroundSize={'cover'}
      backgroundPosition={'center bottom'}
      backgroundColor={'#30186e'}
      backgroundImage={{ 
        base: `linear-gradient(to bottom, rgba(48, 24, 110, 0.65), rgba(48, 24, 110, 0.75)), url(${HeroBg})`,
        md: `url(${HeroBg})`
      }}
    >
      <Container maxW="7xl">
        <Stack spacing={8} alignItems="center" textAlign="center">
          <Stack>
            <Heading
              as="h1"
              fontSize={{ base: '32px', md: '60px', lg: '80px' }}
              fontWeight="bold"
              lineHeight="1.2"
              letterSpacing="tight"
              color={'#ffffff'}
              textTransform={'uppercase'}
            >
              Lightning fast.
              <br />
              Massively Scalable.
              <br />
              Truly Open Source
            </Heading>
            <Heading
              as="h2"
              fontSize="18px"
              fontWeight="800"
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
            direction={{ base: 'column', sm: 'column' }}
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
            <Link
              href="#documentation"
              color="white"
              fontSize="lg"
              textDecoration="underline"
              _hover={{ color: 'primary.100' }}
              onClick={e => {
                e.preventDefault();
                const element = document.getElementById('documentation');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See Documentation
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
