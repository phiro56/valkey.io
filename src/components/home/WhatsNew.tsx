import {
  Box,
  Button,
  Container,
  Flex,
  GridItem,
  Heading,
  Image,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import blogPlaceholder from '/src/assets/images/blog-placeholder.webp';

interface ImageData {
  src: string;
  alt: string;
}

interface ReleaseNote {
  version: string;
  releaseDate: string;
  sections: {
    title: string;
    items: string[];
  }[];
}

interface BlogPost {
  title: string;
  description: string;
  imageUrl: ImageData;
}

const releaseNotes: ReleaseNote = {
  version: '1.5.0',
  releaseDate: 'January 20, 2025',
  sections: [
    {
      title: "What's New",
      items: [
        'Advanced Usage Analytics Dashboard: A powerful new dashboard to visualize and monitor software license usage trends and insights in real-time.',
        'AI-Driven Insights: Enhanced AI capabilities to suggest license optimizations and predict future licensing needs.',
        'Automated License Renewals: Introduced automatic reminders and renewals for expiring licenses to reduce manual effort.',
      ],
    },
    {
      title: 'Improvements',
      items: [
        'Faster Load Times: Optimized backend processes to reduce dashboard load times by up to 40%.',
        'Enhanced Security: Implemented advanced encryption standards to improve data security.',
        'Improved Search Functionality: Refined search filters to make finding licenses and usage data easier.',
      ],
    },
    {
      title: 'Bug Fixes',
      items: [
        'Fixed an issue where license renewal notifications were not being sent in some cases.',
        'Resolved a glitch causing incorrect usage stats to display for certain licenses.',
        'Addressed UI inconsistencies in the subscription management section.',
      ],
    },
    {
      title: 'Known Issues',
      items: [
        'Bulk editing of licenses may occasionally result in a delay in updates. A fix is scheduled for the next release.',
        'Some users may experience a slight delay in loading the AI insights for large data sets.',
      ],
    },
  ],
};

const latestBlogPosts: BlogPost[] = [
  {
    title: 'Reducing application latency and lowering Cloud bill by setting up your client library',
    description:
      'By implementing AZ affinity routing in Valkey and using GLIDE, you can achieve lower latency and cost savings by routing requests to replicas in the same AZ as the client.',
    imageUrl: {
      src: blogPlaceholder,
      alt: 'Blog post about reducing latency and cloud costs',
    },
  },
  {
    title: '2024: The Year of Valkey',
    description:
      'The end of the calendar year is a great time to reflect, but for Valkey this particular year-end holds special meaning.',
    imageUrl: {
      src: blogPlaceholder,
      alt: '2024 Valkey year in review',
    },
  },
];

export const WhatsNew: React.FC = () => {
  return (
    <Box as="section" pb={{ base: '4rem', md: '8rem' }} bgGradient="linear(to-b, #4F62BF, #6983FF)">
      <Container maxW={'7xl'}>
        <Heading textAlign={'center'} fontSize={'5xl'} py={10} fontWeight={'bold'} color={'white'}>
          What is New?
        </Heading>

        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          spacing={8}
          p={'8'}
          borderRadius={'20px'}
          bg={'rgba(255, 255, 255, 0.2)'}
        >
          {/* Release Notes Section */}
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Box>
              <Heading as="h2" fontSize="30px" mb={8} color={'white'}>
                Release Notes
              </Heading>
              <Flex justifyContent={'space-between'} alignItems={'flex-start'}>
                <Box>
                  <Text fontSize="20px" fontWeight="bold" color={'white'}>
                    Version: {releaseNotes.version}
                  </Text>
                  <Text fontSize="20px" fontWeight="400" color={'white'}>
                    Release Date: {releaseNotes.releaseDate}
                  </Text>
                </Box>
                <Button
                  as="a"
                  href="#"
                  size="lg"
                  colorScheme="blue"
                  variant="outline"
                  borderWidth={'1px'}
                  borderColor={'white'}
                  color={'white'}
                  borderRadius={'30px'}
                  _hover={{
                    borderColor: '#ffffff',
                    color: '#072150',
                    background: '#ffffff',
                  }}
                >
                  Release Notes
                </Button>
              </Flex>

              <VStack
                align="stretch"
                spacing={6}
                background={'white'}
                borderRadius={'20px'}
                mt={'6'}
                padding={'8'}
              >
                {releaseNotes.sections.map(section => (
                  <Box key={section.title}>
                    <Heading as="h3" fontSize={'16px'} mb={3}>
                      {section.title}
                    </Heading>
                    <UnorderedList spacing={2} fontSize={'16px'}>
                      {section.items.map((item, index) => (
                        <ListItem
                          borderBottom={'1px solid'}
                          borderColor={'rgba(157, 157, 157, 0.5)'}
                          mb={'2'}
                          pb={'2'}
                          key={index}
                        >
                          {item}
                        </ListItem>
                      ))}
                    </UnorderedList>
                  </Box>
                ))}
              </VStack>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 1 }}>
            {/* Latest Blog Posts Section */}
            <Box>
              <Heading as="h2" fontSize="30px" mb={8} color={'white'}>
                Latest From Our Blog
              </Heading>
              <VStack spacing={6}>
                {latestBlogPosts.map((post, index) => (
                  <Box key={index} borderRadius="20px" overflow="hidden" bg="white" boxShadow="md">
                    <Image
                      src={post.imageUrl.src}
                      alt={post.imageUrl.alt}
                      width="100%"
                      height="100px"
                      objectFit="cover"
                    />
                    <Box p={6}>
                      <Heading as="h3" lineHeight={'1.4'} fontSize={'16px'} mb={2}>
                        {post.title}
                      </Heading>
                      <Text mb={4} fontSize={'16px'}>
                        {post.description}
                      </Text>
                      <Box textAlign={'right'}>
                        <Button
                          as="a"
                          href={post.description}
                          variant="outline"
                          borderWidth={'1px'}
                          borderColor={'#072150'}
                          color={'#072150'}
                          borderRadius={'30px'}
                          _hover={{
                            borderColor: '#072150',
                            color: 'white',
                            background: '#072150',
                          }}
                        >
                          Read More
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </VStack>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default WhatsNew;
