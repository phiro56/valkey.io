import { Box, Container } from '@chakra-ui/react';
import { DocumentationContent } from '../components/documentation/DocumentationContent';
import { DocumentationHeader } from '../components/documentation/DocumentationHeader';
import { DocumentationSearch } from '../components/documentation/DocumentationSearch';
import { DocumentationSidebar } from '../components/documentation/DocumentationSidebar';

export const Documentation = () => {
  return (
    <Box>
      <DocumentationHeader />
      <Container maxW="100%" p={0}>
        <Box display="flex" gap={0} py={0}>
          <Box w="600px" p={4} background="secondary.lavender.100">
            <DocumentationSearch />
            <DocumentationSidebar />
          </Box>
          <Box flex={1} background={'rgba(226, 232, 240, 1)'}>
            <DocumentationContent />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
