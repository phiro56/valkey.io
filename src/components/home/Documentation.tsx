import { Box, Button, Container, Heading, SimpleGrid, Stack, Text, UnorderedList, ListItem, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface DocCategory {
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
  list?: string[];
}

const docCategories: DocCategory[] = [
  {
    title: 'Install',
    description: 'Step-by-step instructions on how to install and configure Valkey for first-time users.',
    link: '/docs/getting-started',
    linkLabel: 'See Installation Guide',
  },
  {
    title: 'The Language',
    description: 'Detailed documentation on the language used within Valkey, including syntax, commands, and examples.',
    list: [
        'Supported Data Types',
        'Commands Syntax',
        'Examples'
    ],
    link: '/docs/api',
    linkLabel: 'See Command References',
  },
  {
    title: 'Programming with Valkey',
    description: 'A detailed section covering commands, data types, pipelining, Pub/Sub, memory optimization, and more.',
    list: [
        'Full Command List',
        'Pipelining',
        'Pub/Sub Messaging',
        'And more'
    ],
    link: '/docs/guides',
    linkLabel: 'Learn More',
  },
  {
    title: 'Server-side Scripting',
    description: 'An introduction to programmability within Valkey including:',
    list: [
        'Programmability Overview',
        'Valkey Lua API',
        'Using Eval Scripts',
        'Debugging Lua Scripts'
    ],
    link: '/docs/best-practices',
    linkLabel: 'Learn More',
  },
];

export const Documentation = () => {
  return (
    <Box 
      as="section" 
      py={{ base: '4rem', md: '8rem' }}
      bgGradient="linear(to-b, #2054B2, #52B4EC)"
    >
      <Container maxW="7xl">
        <Stack spacing={12}>
          <Stack spacing={4} textAlign="center">
            <Heading as="h2" fontSize="60px" color={"#ffffff"}>
              Documentation
            </Heading>
            <Text fontSize="lg" color="white" maxW="3xl" mx="auto">
                The Valkey documentation is a comprehensive resource designed to guide users in utilizing and managing Valkey effectively. It is maintained in markdown format and is available under the Creative Commons Attribution-ShareAlike 4.0 International license.
            </Text>

            <Box maxW={'4xl'} mx={'auto'} w={'100%'}>
                <InputGroup size="lg" w={'100%'}>
                    <Input
                        placeholder="Search within the documentation"
                        bg="white"
                        color="gray.600"
                        borderRadius="full"
                        height="50px"
                        fontSize="lg"
                        pr="0"
                        w={'100%'}
                        _placeholder={{ color: 'gray.400' }}
                    />
                    <InputRightElement width="100px" h="100%">
                        <Button
                        h="100%"
                        size="lg"
                        borderRightRadius="full"
                        bg="#4CAF50"
                        color="black"
                        width="100px"
                        _hover={{ bg: '#45a049' }}
                        >
                        Search
                        </Button>
                    </InputRightElement>
                </InputGroup>
             </Box>
        
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8} mt={'4'}>
            {docCategories.map((category, index) => (
              <Stack
                key={index}
                p={8}
                borderRadius="20px"
                color={'#ffffff'}
                bgGradient="linear(to-b, rgba(195, 188, 188, 0.2), rgba(255, 255, 255, 0.2))"
                
              >
                <Heading as="h3" size="md" textAlign={'center'} mb={'2'}>
                  {category.title}
                </Heading>
                <Text>{category.description}</Text>
                {category.list && (
                  <UnorderedList mb={2}>
                    {category.list.map((item, itemIndex) => (
                      <ListItem key={itemIndex}>{item}</ListItem>
                    ))}
                  </UnorderedList>
                )}
                {category.link && (
                  <Button
                    as={RouterLink}
                    to={category.link}
                    variant="outline"
                    borderRadius={"20px"}
                    borderWidth={'1px'}
                    colorScheme="white"
                    alignSelf="flex-start"
                    mt={'auto'}
                    mx={'auto'}
                    _hover={{
                        color: '#2054B2',
                        borderColor: '#ffffff',
                        background: '#ffffff',
                    }}
                  >
                    {category.linkLabel}
                  </Button>
                )}
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}; 