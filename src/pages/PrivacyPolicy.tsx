import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

export const PrivacyPolicy = () => {
  return (
    <>
    <Box bgGradient="linear(to-b, #3B2A66, #4E51BF)" color="white" py={16} textAlign="center">
      <Container maxW="container.xl">
        <Heading as="h1" size="2xl" mb={4}>
          Privacy Policy
        </Heading>
      </Container>
    </Box>
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            1. Information We Collect
          </Heading>
          <Text mb={4}>
            We collect information that you provide directly to us, including but not limited to your name, email address, and any other information you choose to provide.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            2. How We Use Your Information
          </Heading>
          <Text mb={4}>
            We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            3. Information Sharing
          </Heading>
          <Text mb={4}>
            We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent, except as required by law.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            4. Data Security
          </Heading>
          <Text mb={4}>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            5. Updates to This Policy
          </Heading>
          <Text mb={4}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </Text>
        </Box>
      </VStack>
    </Container>
  </>
  );
}; 