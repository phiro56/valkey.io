import { Box, Flex } from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Flex minH="100vh" direction="column">
      <Navbar />
      <Box as="main" flex="1" mt={16}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}; 