import { Box, Container } from '@chakra-ui/react';
import { useState } from 'react';
import { DocumentationContent } from '../components/documentation/DocumentationContent';
import { DocumentationHeader } from '../components/documentation/DocumentationHeader';
import { DocumentationSearch } from '../components/documentation/DocumentationSearch';
import { DocumentationSidebar } from '../components/documentation/DocumentationSidebar';

export const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box>
      <DocumentationHeader />
      <Container maxW="100%" p={0}>
        <Box display="flex" flexDirection={{base: "column", lg: "row"}} gap={0} py={0}>
          <Box w={{base: "100%", lg: "600px"}} p={4} background="secondary.lavender.100">
            <DocumentationSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <DocumentationSidebar />
          </Box>
          <Box flex={1} background={'rgba(226, 232, 240, 1)'}>
            <DocumentationContent searchQuery={searchQuery} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
