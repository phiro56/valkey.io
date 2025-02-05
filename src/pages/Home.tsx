import { Box } from '@chakra-ui/react';
import { Hero } from '../components/home/Hero';
import { About } from '../components/home/About';
import { Documentation } from '../components/home/Documentation';
import { WhatsNew } from '../components/home/WhatsNew';
import { Contribute } from '../components/home/Contribute';
import { Supporters } from '../components/home/Supporters';

export const Home = () => {
  return (
    <Box>
      <Hero />
      <About />
      <Documentation />
      <WhatsNew />
      <Contribute />
      <Supporters />
    </Box>
  );
}; 