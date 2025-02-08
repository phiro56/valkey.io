import { Box, Button, Container, Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { BinaryArtifacts } from '../components/install/BinaryArtifacts';
import { DockerHub } from '../components/install/DockerHub';
import { PreviousReleases } from '../components/install/PreviousReleases';
import { WhatsNew } from '../components/install/WhatsNew';

export const Install = () => {
  return (
    <>
      <Box pt={20} bgGradient="linear(to-b, #E9EBF8, #ffffff)">
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            {/* Latest Release Section */}
            <Box>
              <Heading as="h1" size="3xl" mb={8} textAlign="center" color="secondary.purple.500">
                Get the Latest Release
              </Heading>

              <Flex alignItems="flex-end" justifyContent={'space-between'}>
                <Stack gap={0} color="secondary.purple.500">
                  <Heading as="h2" size="md">
                    Release Notes
                  </Heading>
                  <Text size="md" fontWeight={'bold'}>
                    Version: 1.5.0
                  </Text>
                  <Text>Release Date: January 20, 2025</Text>
                </Stack>

                <Button variant="violet">Download Source Code (.zip)</Button>
              </Flex>
            </Box>

            {/* What's New Section */}
            <WhatsNew />

            {/* Docker Hub Section */}
            <DockerHub />

            {/* Binary Artifacts Section */}
            <BinaryArtifacts />
          </VStack>
        </Container>
      </Box>
      <Box bg={'white'}>
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Previous Releases Section */}
            <PreviousReleases />
          </VStack>
        </Container>
      </Box>
    </>
  );
};
