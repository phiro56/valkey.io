import { Box, Button, Input } from '@chakra-ui/react';
import { FormEvent } from 'react';

interface BlogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const BlogSearch = ({ searchQuery, setSearchQuery }: BlogSearchProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // The search is already live, but this prevents form submission
  };

  return (
    <Box as="form" display="flex" onSubmit={handleSubmit}>
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
      <Button type="submit" variant="violet" borderRightRadius={'50px'}>
        Search
      </Button>
    </Box>
  );
};
