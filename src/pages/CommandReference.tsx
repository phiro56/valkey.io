import { Box, Container } from '@chakra-ui/react';
import { useState } from 'react';
import { CommandReferenceContent } from '../components/commandReference/CommandReferenceContent';
import { CommandReferenceHeader } from '../components/commandReference/CommandReferenceHeader';
import { CommandReferenceSearch } from '../components/commandReference/CommandReferenceSearch';
import { CommandReferenceSidebar } from '../components/commandReference/CommandReferenceSidebar';
import { commandReferences } from '../data/commandReference';

type CommandReferenceType = typeof commandReferences[0];

export const CommandReference = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommand, setSelectedCommand] = useState<CommandReferenceType | null>(null);

  return (
    <Box>
      <CommandReferenceHeader />
      <Container maxW="100%" p={0}>
        <Box display="flex" flexDirection={{base: "column", lg: "row"}} gap={0} py={0}>
          <Box
            w={{base: "100%", lg: "420px"}}
            flex={{base: "1", lg: "0 0 420px"}}
            p={4}
            background="secondary.lavender.100"
            position={{base: 'static', lg: 'sticky'}}
            top={{base: 'auto', lg: '80px'}}
            h={{base: 'auto', lg: 'calc(100vh - 80px)'}}
          >
            <CommandReferenceSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CommandReferenceSidebar 
              searchQuery={searchQuery} 
              onCommandSelect={setSelectedCommand}
              selectedCommand={selectedCommand}
              
            />
          </Box>
          <Box flex={1} background={'rgba(226, 232, 240, 1)'}>
            <CommandReferenceContent 
              selectedCommand={selectedCommand}
              onBack={() => setSelectedCommand(null)}
              onCommandSelect={setSelectedCommand}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
