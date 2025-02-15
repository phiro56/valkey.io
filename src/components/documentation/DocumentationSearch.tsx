import { Box, Button, Input } from '@chakra-ui/react';

export const DocumentationSearch = () => {
  return (
    <Box display="flex" mb={2}>
      <Input
        placeholder="Search within the documentation"
        bg="white"
        borderRadius="md"
        borderRightRadius={'0'}
        borderLeftRadius={'50px'}
      />
      <Button variant="violet" borderRightRadius={'50px'}>
        Search
      </Button>
    </Box>
  );
};
