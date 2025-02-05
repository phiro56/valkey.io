import { Box, Flex } from '@chakra-ui/react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Flex minH="100vh" direction="column">
      <Navbar />
      <Box as="main" flex="1" mt={'80px'}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};
