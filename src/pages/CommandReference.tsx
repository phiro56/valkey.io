import { Box, Container } from '@chakra-ui/react';
import { useState } from 'react';
import { CommandReferenceContent } from '../components/commandReference/CommandReferenceContent';
import { CommandReferenceHeader } from '../components/commandReference/CommandReferenceHeader';
import { CommandReferenceSearch } from '../components/commandReference/CommandReferenceSearch';
import { CommandReferenceSidebar } from '../components/commandReference/CommandReferenceSidebar';

export const CommandReference = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box>
      <CommandReferenceHeader />
      <Container maxW="100%" p={0}>
        <Box display="flex" gap={0} py={0}>
          <Box w="600px" p={4} background="secondary.lavender.100">
            <CommandReferenceSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CommandReferenceSidebar searchQuery={searchQuery} />
          </Box>
          <Box flex={1} background={'rgba(226, 232, 240, 1)'}>
            <CommandReferenceContent />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
