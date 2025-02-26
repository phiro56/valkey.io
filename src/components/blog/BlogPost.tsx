import { Box, Button, Container, Flex, Image, Link, Text, VStack } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import { blogDigest, BlogPost } from './BlogContent';

interface Author {
  name: string;
  username: string;
  bio: string;
  imageUrl: string;
}

interface BlogPostContent {
  title: string;
  date: string;
  author: Author;
  content: string;
  imageUrl: string;
  category: BlogPost['category'];
}

// Get related posts (posts with same category)
const getRelatedPosts = (category: BlogPost['category'], currentSlug: string) => {
  return blogDigest
    .filter(post => post.category === category && post.slug !== currentSlug)
    .slice(0, 3);
};

// Get blog post by slug
const getBlogPost = (slug: string): BlogPostContent | undefined => {
  const post = blogDigest.find(p => p.slug === slug);
  if (!post) return undefined;

  return {
    title: post.title,
    date: post.date,
    content: post.excerpt, // In a real app, you'd have full content
    imageUrl: post.imageUrl,
    category: post.category,
    author: {
      name: 'Kyle Davis',
      username: 'stockholmux',
      bio: 'Kyle is the Senior Developer Advocate on the Valkey project. He has a long history with open source software development; he was a founding contributor to the OpenSearch project and most recently worked to build a community around Betterrocket OS. When not working, Kyle enjoys 3D printing and getting his hands dirty in his Edmonton, Alberta-based home garden.',
      imageUrl:
        'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop',
    },
  };
};

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post || !slug) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(post.category, slug);

  return (
    <Container maxW="none" p={0} background={'#E9EBF8'}>
      {/* Breadcrumbs */}
      <Flex alignItems={'center'} background="#FAFAFD" h={'44px'}>
        <Container maxW="container.xl">
          <Flex align="center" gap={2}>
            <Link href="/blog" color="secondary.purple.500" fontWeight="medium">
              Blog
            </Link>
            <Text color="gray.500">&gt;</Text>
            <Text color="gray.700">{post.title}</Text>
          </Flex>
        </Container>
      </Flex>

      <Flex gap={0} minH={'100%'}>
        {/* Main Content */}
        <Box
          flex="1"
          background={'#E2E8F0'}
          padding={'4'}
          h={'calc(100vh - 185px)'}
          overflowX={'auto'}
        >
          <Box flex="1" background={'white'} padding={'4'}>
            <Image
              src={post.imageUrl}
              alt={post.title}
              width="100%"
              height="400px"
              objectFit="cover"
              borderRadius="lg"
              mb={2}
            />

            <Text fontSize="20px" fontWeight="bold" mb={0} color={'secondary.purple.500'}>
              {post.title}
            </Text>

            <Text color="gray.500" mb={8}>
              {post.date}
            </Text>

            <Text whiteSpace="pre-line" mb={8}>
              {post.content}
            </Text>
          </Box>
        </Box>

        {/* Sidebar */}
        <Box w="33%" h={'calc(100vh - 185px)'} overflowX={'auto'} backgroundColor={'#F2F0FA'} p={4}>
          {/* Author Section */}
          <Box mb={8}>
            <Text color="purple.700" fontWeight="semibold" mb={4}>
              ABOUT THE AUTHOR
            </Text>

            <Flex gap={4} mb={4}>
              <Image
                src={post.author.imageUrl}
                alt={post.author.name}
                boxSize="60px"
                objectFit="cover"
              />
              <Box>
                <Text fontSize="16px">{post.author.name}</Text>
                <Text color="secondary.purple.500">@{post.author.username}</Text>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  {post.author.bio}
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Related Posts Section */}
          <Box>
            <Text color="purple.700" fontWeight="semibold" mb={2}>
              RELATED
            </Text>
            <VStack align="stretch" spacing={4}>
              {relatedPosts.map(relatedPost => (
                <Flex key={relatedPost.slug} background="white" borderRadius="lg" overflow="hidden">
                  <Image
                    src={relatedPost.imageUrl}
                    alt={relatedPost.title}
                    height="auto"
                    width="50%"
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/600x400/4E51BF/FFFFFF?text=Valkey"
                  />
                  <Box p={4}>
                    <Text fontSize="lg" fontWeight="bold" mb={2} noOfLines={2}>
                      {relatedPost.title}
                    </Text>
                    <Text color="gray.600" fontSize="sm" mb={4} noOfLines={2}>
                      {relatedPost.excerpt}
                    </Text>

                    <Link href={`/blog/${relatedPost.slug}`} _hover={{ textDecoration: 'none' }}>
                      <Button
                        variant="outline"
                        borderWidth={'1px'}
                        size="md"
                        borderRadius={'50px'}
                        alignSelf={'flex-end'}
                        marginLeft={'auto'}
                        _hover={{
                          borderColor: '#072150',
                          color: 'white',
                          background: '#072150',
                        }}
                      >
                        Read More
                      </Button>
                    </Link>
                  </Box>
                </Flex>
              ))}
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};
