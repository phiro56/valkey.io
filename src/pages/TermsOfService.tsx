import { Box, Container, Heading, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';

export const TermsOfService = () => {
  return (
    <>
      <Box bgGradient="linear(to-b, #3B2A66, #4E51BF)" color="white" py={16} textAlign="center">
        <Container maxW="container.xl">
          <Heading as="h1" size="2xl" mb={4}>
            Terms Of Service
          </Heading>
        </Container>
      </Box>
      <Container maxW="container.lg" py={8}>
        <VStack spacing={6} align="stretch">
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              1. Acceptance of Terms
            </Heading>
            <Text mb={4}>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={4}>
              2. Use License
            </Heading>
            <Text mb={4}>
              Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.
            </Text>
            <UnorderedList mb={4} spacing={2}>
              <ListItem>This is the grant of a license, not a transfer of title.</ListItem>
              <ListItem>You may not modify or copy the materials.</ListItem>
              <ListItem>You may not use the materials for any commercial purpose.</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={4}>
              3. Disclaimer
            </Heading>
            <Text mb={4}>
              The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={4}>
              4. Limitations
            </Heading>
            <Text mb={4}>
              In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={4}>
              5. Revisions and Errata
            </Heading>
            <Text mb={4}>
              The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current.
            </Text>
          </Box>
        </VStack>
      </Container>
    </>
  );
}; 