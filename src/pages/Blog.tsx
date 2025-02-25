import { Box, Container } from '@chakra-ui/react';
import { useState } from 'react';
import { BlogContent } from '../components/blog/BlogContent';
import { BlogHeader } from '../components/blog/BlogHeader';
import { BlogSearch } from '../components/blog/BlogSearch';
import { BlogSidebar } from '../components/blog/BlogSidebar';

export const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box>
      <BlogHeader />
      <Container maxW="100%" p={0}>
        <Box display="flex" gap={0} py={0}>
          <Box w="600px" p={4} background="secondary.lavender.100">
            <BlogSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <BlogSidebar />
          </Box>
          <Box flex={1} background={'rgba(226, 232, 240, 1)'}>
            <BlogContent searchQuery={searchQuery} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
