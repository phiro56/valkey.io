import { Box, Heading, Link, Text } from '@chakra-ui/react';

interface DocumentationContentProps {
  searchQuery: string;
}

export const DocumentationContent = ({ searchQuery }: DocumentationContentProps) => {
  return (
    <Box p={4}>
      {searchQuery ? (
        <Box borderRadius={'2px'} p={8} textAlign="center">
          <Text fontWeight="800" color="secondary.purple.500" mb={1} fontSize={'60px'}>
            &lt;/&gt;
          </Text>
          <Text fontWeight="medium" color="secondary.purple.500" mb={1}>
            We couldn't find any results matching your search
          </Text>
          <Text color="secondary.purple.500">Check your spelling or try different keywords</Text>
        </Box>
      ) : (
        <>
          <Box mb={4} background={'white'} borderRadius={'50px'} px={4} py={2}>
            <Text color="gray.600" fontSize="sm">
              <Link color={'primary.500'} textDecoration={'underline'}>
                Documentation
              </Link>{' '}
              /{' '}
              <Link color={'primary.500'} textDecoration={'underline'}>
                Install
              </Link>{' '}
              / Install
            </Text>
          </Box>

          <Box background={'white'} borderRadius={'2px'} p={4}>
            <Text mb={4}>
              This is a an installation guide. You'll learn how to install, run, and experiment with
              the Valkey server process. The download page valkey.io/download lists the latest
              releases.
            </Text>

            <Heading as="h2" size="lg" mb={4}>
              Install Valkey
            </Heading>

            <Text mb={4}>
              These are some ways to install Valkey. Refer to Valkey Administration for detailed
              setup tips.
            </Text>

            {/* Add more content sections as needed */}
          </Box>
        </>
      )}
    </Box>
  );
};
