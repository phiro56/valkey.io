import { Box, Button, Input } from '@chakra-ui/react';

interface BlogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const BlogSearch = ({ searchQuery, setSearchQuery }: BlogSearchProps) => {
  return (
    <Box display="flex">
      <Input
        placeholder="Search articles"
        bg="white"
        borderRadius="md"
        mb={1}
        borderRightRadius={'0'}
        borderLeftRadius={'50px'}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <Button variant="violet" borderRightRadius={'50px'}>
        Search
      </Button>
    </Box>
  );
};
