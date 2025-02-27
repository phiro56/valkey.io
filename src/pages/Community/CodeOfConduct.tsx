import { Box, Container, Flex, Heading, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import SbHero from '/src/assets/images/code-of-conduct-image.webp';

export default function CodeOfConduct() {
  const breadcrumbItems = [
    { label: 'Community', href: '/community' },
    { label: 'Code of Conduct' }
  ];

  return (
    <Container maxW="none" p={0} background={'#E9EBF8'}>
      <Breadcrumbs items={breadcrumbItems} />

      <Flex 
        gap={0} 
        minH={'100%'} 
        direction={{ base: 'column-reverse', md: 'row' }}
      >
        {/* Main Content */}
        <Box
          flex="1"
          background={'#E2E8F0'}
          padding={'4'}
          h={'calc(100vh - 185px)'}
          overflowX={'auto'}
        >
          <Box flex="1" background={'white'} padding={'6'}>
            <Heading as="h1" fontSize="20px" color="secondary.purple.500" mb={'6'}>
              Contributor Covenant Code of Conduct
            </Heading>

            <Stack spacing={8}>
              <Box>
                <Heading as="h2" fontSize="16px" color="secondary.purple.500" mb={1}>
                  Our Pledge
                </Heading>
                <Text>
                  We as members, contributors, and leaders pledge to make participation in our community a harassment-free 
                  experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex 
                  characteristics, gender identity and expression, level of experience, education, socio-economic status, 
                  nationality, personal appearance, race, religion, or sexual identity and orientation. We pledge to act and 
                  interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" fontSize="16px" color="secondary.purple.500" mb={1}>
                  Our Standards
                </Heading>
                <Text mb={4}>Examples of behavior that contributes to a positive environment for our community include:</Text>
                <UnorderedList spacing={2} pl={5} mb={6}>
                  <ListItem>Demonstrating empathy and kindness toward other people</ListItem>
                  <ListItem>Being respectful of differing opinions, viewpoints, and experiences</ListItem>
                  <ListItem>Giving and gracefully accepting constructive feedback</ListItem>
                  <ListItem>Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience</ListItem>
                  <ListItem>Focusing on what is best not just for us as individuals, but for the overall community</ListItem>
                </UnorderedList>

                <Text mb={4}>Examples of unacceptable behavior include:</Text>
                <UnorderedList spacing={2} pl={5}>
                  <ListItem>The use of sexualized language or imagery, and sexual attention or advances of any kind</ListItem>
                  <ListItem>Trolling, insulting or derogatory comments, and personal or political attacks</ListItem>
                  <ListItem>Public or private harassment</ListItem>
                  <ListItem>Publishing others' private information, such as a physical or email address, without their explicit permission</ListItem>
                  <ListItem>Other conduct which could reasonably be considered inappropriate in a professional setting</ListItem>
                </UnorderedList>
              </Box>

              <Box>
                <Heading as="h2" fontSize="16px" color="secondary.purple.500" mb={1}>
                  Enforcement Responsibilities
                </Heading>
                <Text>
                  Community leaders are responsible for clarifying and enforcing our standards of acceptable behavior and 
                  will take appropriate and fair corrective action in response to any behavior that they deem inappropriate, 
                  threatening, offensive, or harmful. Community leaders have the right and responsibility to remove, edit, or 
                  reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code 
                  of Conduct, and will communicate reasons for moderation decisions when appropriate.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" fontSize="16px" color="secondary.purple.500" mb={1}>
                  Scope
                </Heading>
                <Text>
                  This Code of Conduct applies within all community spaces, and also applies when an individual is officially 
                  representing the community in public spaces. Examples of representing our community include using an 
                  official e-mail address, posting via an official social media account, or acting as an appointed 
                  representative at an online or offline event.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" fontSize="16px" color="secondary.purple.500" mb={1}>
                  Enforcement
                </Heading>
                <Text>
                  Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community 
                  leaders responsible for enforcement. All complaints will be reviewed and investigated promptly and fairly.
                </Text>
              </Box>
            </Stack>
          </Box>
        </Box>

        {/* Sidebar */}
        <Box 
          w={{ base: '100%', md: '33%' }}
          h={{ base: '250px', md: 'calc(100vh - 185px)' }}
          overflowX={'auto'} 
          backgroundColor={'#F2F0FA'}
          backgroundImage={SbHero}
          backgroundSize={'cover'}
          backgroundPosition={'center bottom'}
          p={4}>          
        </Box>
      </Flex>
    </Container>
  );
}
