import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Link,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';

export interface Release {
  version: string;
  releaseDate: string;
  url: string;
}

export interface ReleaseGroup {
  majorVersion: string;
  releases: Release[];
}

export const previousReleases: ReleaseGroup[] = [
  {
    majorVersion: '7.X.X',
    releases: [
      { version: '7.2.8', releaseDate: '2025-01-07', url: '/releases/7.2.8' },
      { version: '7.2.7', releaseDate: '2024-10-02', url: '/releases/7.2.7' },
      { version: '7.2.6', releaseDate: '2024-07-31', url: '/releases/7.2.6' },
      { version: '7.2.5', releaseDate: '2024-04-15', url: '/releases/7.2.5' },
    ],
  },
  {
    majorVersion: '6.X.X',
    releases: [
      { version: '6.2.8', releaseDate: '2025-01-07', url: '/releases/6.2.8' },
      { version: '6.2.7', releaseDate: '2024-10-02', url: '/releases/6.2.7' },
      { version: '6.2.6', releaseDate: '2024-07-31', url: '/releases/6.2.6' },
      { version: '6.2.5', releaseDate: '2024-04-15', url: '/releases/6.2.5' },
    ],
  },
  {
    majorVersion: '5.X.X',
    releases: [
      { version: '5.2.8', releaseDate: '2025-01-07', url: '/releases/5.2.8' },
      { version: '5.2.7', releaseDate: '2024-10-02', url: '/releases/5.2.7' },
      { version: '5.2.6', releaseDate: '2024-07-31', url: '/releases/5.2.6' },
      { version: '5.2.5', releaseDate: '2024-04-15', url: '/releases/5.2.5' },
    ],
  },
];

export const PreviousReleases = () => {
  return (
    <Box bg={'rgba(209, 217, 255, 0.5)'} p={6} borderRadius={'2'}>
      <Box mb={4}>
        <Heading as="h2" size="md" color="secondary.purple.500">
          Previous Releases
        </Heading>
        <Text as="p">
          Check previous releases download links, including any security fixes for previous released
          versions.
        </Text>
      </Box>
      <Accordion allowToggle>
        {previousReleases.map(group => (
          <AccordionItem key={group.majorVersion} mb={2}>
            <AccordionButton
              border={'none'}
              borderRadius={0}
              bg={'rgba(250, 251, 255, 1)'}
              p={2}
              _hover={{
                bg: 'rgba(250, 251, 255, 1)',
              }}
            >
              <Box flex="1" textAlign="left" fontSize={'90%'}>
                {group.majorVersion}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={0}>
              <List spacing={1} mt={'1'}>
                {group.releases.map(release => (
                  <ListItem key={release.version} bg={'rgba(244, 246, 255, 1)'} p={2} mb={'1px'}>
                    <Link href={release.url} fontSize={'90%'} textDecoration={'underline'}>
                      {release.version} (Released {release.releaseDate})
                    </Link>
                  </ListItem>
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};
