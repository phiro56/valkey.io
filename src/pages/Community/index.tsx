import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { BiErrorCircle } from 'react-icons/bi';
import { FaQuestion } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import { IoMdBulb } from 'react-icons/io';
import { MdGavel, MdSecurity } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CommunityCard = ({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}) => (
  <Card height="100%" p={6}>
    <Stack spacing={4}>
      <Box color="primary.500">{icon}</Box>
      <Heading as="h3" size="md">
        {title}
      </Heading>
      <Text color="gray.600">{description}</Text>
      <Stack direction="row" spacing={4} mt="auto">
        {primaryAction && (
          <Button as={Link} to={primaryAction.href} variant="outline" colorScheme="primary">
            {primaryAction.label}
          </Button>
        )}
        {secondaryAction && (
          <Button as={Link} to={secondaryAction.href} variant="ghost" colorScheme="primary">
            {secondaryAction.label}
          </Button>
        )}
      </Stack>
    </Stack>
  </Card>
);

export default function Community() {
  return (
    <Container maxW="container.xl" py={16}>
      <Stack spacing={8} align="center">
        <Heading as="h1" size="2xl" textAlign="center">
          Community
        </Heading>

        <Heading as="h2" size="lg" textAlign="center">
          How to Contribute?
        </Heading>

        <Text textAlign="center" maxW="container.md">
          We welcome your involvement in the Valkey community! Here are several ways you can
          contribute:
        </Text>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8}>
          <GridItem>
            <CommunityCard
              icon={<FaQuestion size={24} />}
              title="Ask Questions"
              description="If you have any inquiries about Valkey, feel free to join the conversation on our GitHub discussions or chat with us on Matrix."
              primaryAction={{
                label: 'GitHub Repository',
                href: 'https://github.com/valkey-xyz/valkey',
              }}
              secondaryAction={{ label: 'Matrix', href: 'https://matrix.to/#/#valkey:matrix.org' }}
            />
          </GridItem>

          <GridItem>
            <CommunityCard
              icon={<BiErrorCircle size={24} />}
              title="Report Bugs"
              description="If you encounter any issues while using Valkey, please help us improve the project by filing a bug report at our GitHub repository."
              primaryAction={{
                label: 'GitHub Repository',
                href: 'https://github.com/valkey-xyz/valkey/issues',
              }}
            />
          </GridItem>

          <GridItem>
            <CommunityCard
              icon={<HiUsers size={24} />}
              title="Connect on Social Media"
              description="Stay updated and connect with us on our social media platforms."
              primaryAction={{ label: 'LinkedIn', href: 'https://linkedin.com/company/valkey' }}
              secondaryAction={{ label: 'Twitter', href: 'https://twitter.com/valkeyxyz' }}
            />
          </GridItem>

          <GridItem>
            <CommunityCard
              icon={<IoMdBulb size={24} />}
              title="Suggest Features"
              description="We value your ideas! If you have a suggestion for a new feature, please submit a feature request on our GitHub."
              primaryAction={{
                label: 'GitHub',
                href: 'https://github.com/valkey-xyz/valkey/issues',
              }}
            />
          </GridItem>

          <GridItem>
            <CommunityCard
              icon={<MdSecurity size={24} />}
              title="Security Concerns"
              description="For any potential security issues, please refer to our Security Policy."
              primaryAction={{ label: 'Learn more', href: '/security-policy' }}
            />
          </GridItem>

          <GridItem>
            <CommunityCard
              icon={<MdGavel size={24} />}
              title="Community Conduct"
              description="If you experience any issues with community members behavior, kindly check our Code of Conduct for guidance."
              primaryAction={{ label: 'Learn more', href: '/community/code-of-conduct' }}
            />
          </GridItem>
        </Grid>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8} w="100%">
          <GridItem>
            <Card p={6} height="100%">
              <Stack spacing={4}>
                <Heading as="h3" size="md">
                  Discussion Forum
                </Heading>
                <Text color="gray.600">
                  Join our community discussions to share ideas and get help.
                </Text>
                <Button as={Link} to="/community/forum" colorScheme="primary">
                  Join the conversation
                </Button>
              </Stack>
            </Card>
          </GridItem>

          <GridItem>
            <Card p={6} height="100%">
              <Stack spacing={4}>
                <Heading as="h3" size="md">
                  FAQ
                </Heading>
                <Text color="gray.600">Find answers to commonly asked questions about Valkey.</Text>
                <Button as={Link} to="/community/faq" colorScheme="primary">
                  Consult FAQ
                </Button>
              </Stack>
            </Card>
          </GridItem>

          <GridItem>
            <Card p={6} height="100%">
              <Stack spacing={4}>
                <Heading as="h3" size="md">
                  Code of Conduct
                </Heading>
                <Text color="gray.600">Learn about our community guidelines and expectations.</Text>
                <Button as={Link} to="/community/code-of-conduct" colorScheme="primary">
                  Read More
                </Button>
              </Stack>
            </Card>
          </GridItem>
        </Grid>
      </Stack>
    </Container>
  );
}
