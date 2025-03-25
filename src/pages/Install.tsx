import { Box, Button, Container, Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { PreviousReleases } from '../components/install/PreviousReleases';
import { WhatsNew } from '../components/install/WhatsNew';
import { releaseNotes } from '../data/releaseNotes';

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
                    Version: {releaseNotes.version}
                  </Text>
                  <Text>Release Date: {releaseNotes.releaseDate}</Text>
                </Stack>

                <Button
                  as="a"
                  href={releaseNotes.sourceCodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="violet"
                >
                  View Source Code on GitHub
                </Button>
              </Flex>
            </Box>

            {/* What's New Section */}
            <WhatsNew />

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
