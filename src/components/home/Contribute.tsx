import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { BiSolidBookBookmark } from 'react-icons/bi';
import {
  BsBugFill,
  BsFillLightbulbFill,
  BsFillQuestionCircleFill,
  BsShieldLockFill,
} from 'react-icons/bs';
import { FaPeopleGroup } from 'react-icons/fa6';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

import ValkeyIcon from '/src/assets/images/valkey-icon-black.svg';

interface ContributeWay {
  title: string;
  description: string;
  icon: IconType;
  buttons?: {
    label: string;
    href: string;
    icon?: IconType;
  }[];
}

const contributeWays: ContributeWay[] = [
  {
    icon: BsFillQuestionCircleFill,
    title: 'Ask Questions',
    description:
      'If you have any inquiries about Valkey, feel free to join the conversation on our GitHub discussions or chat with us on Matrix.',
    buttons: [
      { label: 'GitHub Repository', href: '#', icon: FiGithub },
      { label: 'Matrix', href: '#' },
    ],
  },
  {
    icon: BsBugFill,
    title: 'Report Bugs',
    description:
      'If you encounter any issues while using Valkey, please help us improve the project by filing a bug report at our GitHub repository.',
    buttons: [{ label: 'GitHub Repository', href: '#', icon: FiGithub }],
  },
  {
    icon: FaPeopleGroup,
    title: 'Connect on Social Media',
    description: 'Stay updated and connect with us on our social media platforms.',
    buttons: [
      { label: 'Linked In', href: '#', icon: FiLinkedin },
      { label: 'Twitter', href: '#', icon: FiTwitter },
    ],
  },
  {
    icon: BsFillLightbulbFill,
    title: 'Suggest Features',
    description:
      'We value your ideas! If you have a suggestion for a new feature, please submit a feature request on our GitHub.',
    buttons: [{ label: 'Github', href: '#', icon: FiGithub }],
  },
  {
    icon: BsShieldLockFill,
    title: 'Security Concerns',
    description: 'For any potential security issues, please refer to our Security Policy.',
    buttons: [{ label: 'Learn more →', href: '#' }],
  },
  {
    icon: BiSolidBookBookmark,
    title: 'Community Conduct',
    description:
      'If you experience any issues with community members behavior, kindly check our Code of Conduct for guidance.',
    buttons: [{ label: 'Learn more →', href: '#' }],
  },
];

export const Contribute = () => {
  return (
    <Box
      as="section"
      pb={{ base: '4rem', md: '8rem' }}
      bgGradient="linear(to-b, #30176E, #6983FF)"
      pos={'relative'}
      id="how-to-contribute"
      overflowX={'hidden'}
    >
      <Image
        pos={'absolute'}
        zIndex={'0'}
        h={'500px'}
        w={'500px'}
        src={ValkeyIcon}
        alt="Valkey.io"
        top={'0'}
        right={'0'}
        marginRight={'-50px'}
        opacity={'10%'}
      />

      <Container maxW="7xl" position={'relative'} zIndex={'1'}>
        <Stack spacing={12}>
          <Stack spacing={4} textAlign="center">
            <Heading as="h2" fontSize="60px" color="white">
              How to contribute?
            </Heading>
            <Text fontSize="lg" color="white" maxW="3xl" mx="auto">
              We welcome your involvement in the Valkey community! Here are several ways you can
              contribute:
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {contributeWays.map(way => (
              <Stack
                key={way.title}
                p={8}
                align="center"
                borderRadius={'20px'}
                background={'white'}
                color="#072150"
              >
                <Icon as={way.icon} boxSize={'48px'} mb={'1'} color={'#BCB5E7'} />
                <Heading as="h3" size="md" textAlign="center">
                  {way.title}
                </Heading>
                <Text textAlign={'left'} mb={'2'}>
                  {way.description}
                </Text>
                {way.buttons && (
                  <Stack
                    direction="row"
                    spacing={4}
                    mt={'auto'}
                    width={'100%'}
                    justifyContent={'flex-end'}
                  >
                    {way.buttons.map((button, index) => (
                      <Button
                        key={index}
                        as="a"
                        href={button.href}
                        variant="outline"
                        colorScheme="white"
                        borderWidth={'1px'}
                        borderColor={'#072150'}
                        color={'#072150'}
                        borderRadius={'20px'}
                        _hover={{
                          borderColor: '#ffffff',
                          color: '#ffffff',
                          background: '#072150',
                        }}
                      >
                        {button.icon && <Icon as={button.icon} mr={1} />}
                        {button.label}
                      </Button>
                    ))}
                  </Stack>
                )}
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};
