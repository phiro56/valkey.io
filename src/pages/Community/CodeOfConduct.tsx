import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';

const sections = [
  {
    title: 'Our Pledge',
    content:
      'In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.',
  },
  {
    title: 'Our Standards',
    content:
      'Examples of behavior that contributes to creating a positive environment include:\n\n• Using welcoming and inclusive language\n• Being respectful of differing viewpoints and experiences\n• Gracefully accepting constructive criticism\n• Focusing on what is best for the community\n• Showing empathy towards other community members',
  },
  {
    title: 'Our Responsibilities',
    content:
      'Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.',
  },
  {
    title: 'Scope',
    content:
      'This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community.',
  },
  {
    title: 'Enforcement',
    content:
      'Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.',
  },
];

export default function CodeOfConduct() {
  return (
    <Container maxW="container.xl" py={16}>
      <Stack spacing={8} align="center">
        <Heading as="h1" size="2xl" textAlign="center">
          Code of Conduct
        </Heading>

        <Text textAlign="center" maxW="container.md">
          We are committed to providing a friendly, safe and welcoming environment for all,
          regardless of level of experience, gender identity and expression, sexual orientation,
          disability, personal appearance, body size, race, ethnicity, age, religion, nationality,
          or other similar characteristic.
        </Text>

        {sections.map((section, index) => (
          <Box
            key={index}
            w="100%"
            p={8}
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            shadow="sm"
          >
            <Stack spacing={4}>
              <Heading as="h2" size="lg">
                {section.title}
              </Heading>
              <Text whiteSpace="pre-line">{section.content}</Text>
            </Stack>
          </Box>
        ))}

        <Box w="100%" mt={12}>
          <Stack spacing={4}>
            <Heading as="h2" size="lg">
              Contact Information
            </Heading>
            <Text>If you have questions about this Code of Conduct, please contact us:</Text>
            <Stack as="ul" spacing={2} pl={5}>
              <Text as="li">Via email at conduct@valkey.io</Text>
              <Text as="li">Through our Matrix channel</Text>
              <Text as="li">By creating a GitHub issue</Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
