import { Box } from '@chakra-ui/react';
import { About } from '../components/home/About';
import { Contribute } from '../components/home/Contribute';
import { Documentation } from '../components/home/Documentation';
import { Hero } from '../components/home/Hero';
import { Supporters } from '../components/home/Supporters';
import { WhatsNew } from '../components/home/WhatsNew';

export const Home = () => {
  return (
    <Box>
      <Hero />
      {false && <About />}
      <Documentation />
      <WhatsNew />
      <Contribute />
      <Supporters />
    </Box>
  );
};
