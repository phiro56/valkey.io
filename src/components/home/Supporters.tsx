import { Box, Container, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import aivenLogo from '/src/assets/images/aiven.svg';
import awsLogo from '/src/assets/images/aws.svg';
import perconaLogo from '/src/assets/images/percona.svg';
import upcloudLogo from '/src/assets/images/upcloud.svg';

const supporters = [
  {
    name: 'Pepercona',
    desc: 'Provides Valkey expertise whenever you need it, offering day-to-day operational support and hands-on assistance for complex projects.',
    logo: perconaLogo,
  },
  {
    name: 'Aiven',
    desc: 'In-memory NoSQL database with a small footprint and big performance. It is built on open source Valkey and compatible with legacy Redis®',
    logo: aivenLogo,
  },
  {
    name: 'UpCloud',
    desc: 'With UpClouds global reach, Valkey guarantees reliability and scalability, allowing developers to focus on building outstanding applications.',
    logo: upcloudLogo,
  },
  {
    name: 'Amazon Web Services',
    desc: 'It merges Valkeys speed and versatility with Amazons manageability, perfect for data-driven applications.',
    logo: awsLogo,
  },
];

export const Supporters = () => {
  return (
    <Box as="section" pb={{ base: '4rem', md: '8rem' }} bgGradient="linear(to-b, #2054B2, #52B4EC)">
      <Container maxW="7xl">
        <Stack spacing={12}>
          <Stack spacing={4} textAlign="center">
            <Heading as="h2" fontSize="60px" color={'#ffffff'}>
              Supporters
            </Heading>
            <Text fontSize="lg" color="white" maxW="3xl" mx="auto">
              The Valkey project participants are a diverse group of organizations that have come
              together to maintain and contribute to the project. Valkey participants are more than
              vendors, they are dedicated to continuously strengthening the long-term health and
              viability of this project so that everyone can benefit from it. Since its inception
              Valkey has enjoyed steady adoption demonstrating the industry's desire for an open,
              community-driven database solution. We look forward to seeing our list of participants
              grow as more companies work on our project.
            </Text>
          </Stack>

          <SimpleGrid
            columns={{ base: 1, md: 4 }}
            spacing={{ base: 0, md: 8 }}
            pt={6}
            bg="white"
            borderRadius={'20px'}
          >
            {supporters.map(supporter => (
              <Box key={supporter.name} p={6} textAlign={'center'}>
                <Image
                  src={supporter.logo}
                  alt={supporter.name}
                  maxH="40px"
                  mx={'auto'}
                  mb={'6'}
                  objectFit="contain"
                />
                <Text color={'#072150'} fontSize={'16px'} fontWeight={'bold'} mb={'1'}>
                  {supporter.name}
                </Text>
                <Text color={'##353535'} fontSize={'14px'} fontWeight={'400'}>
                  {supporter.desc}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};
