import { Box, Button, Container, Flex, Heading, Image, Link, Text, VStack } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import { blogDigest, BlogPost } from '../../data/blogPosts';
import { Breadcrumbs } from '../common/Breadcrumbs';

// Get related posts (posts with same category)
const getRelatedPosts = (category: BlogPost['category'], currentSlug: string) => {
  return blogDigest
    .filter(post => post.category === category && post.slug !== currentSlug)
    .slice(0, 3);
};

// Get blog post by slug
const getBlogPost = (slug: string): BlogPost | undefined => {
  const post = blogDigest.find(p => p.slug === slug);
  if (!post) return undefined;

  return post;
};

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post || !slug) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(post.category, slug);

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: post.title }
  ];

  return (
    <Container maxW="none" p={0} background={'#E9EBF8'}>
      <Breadcrumbs items={breadcrumbItems} />

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

            <Heading as="h1" fontSize="28px" fontWeight="bold" mb={0} color={'secondary.purple.500'}>
              {post.title}
            </Heading>

            <Text color="gray.500" mb={8}>
              {post.date}
            </Text>

            <Box
              className="blog-content"
              sx={{
                'h2': {
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginTop: '24px',
                  marginBottom: '16px',
                  color: 'secondary.purple.500'
                },
                'h3': {
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginTop: '24px',
                  marginBottom: '16px',
                  color: 'secondary.purple.500'
                },
                'h4': {
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginTop: '24px',
                  marginBottom: '16px',
                  color: 'secondary.purple.500'
                },
                'p': {
                  marginBottom: '16px',
                  lineHeight: '1.6'
                },
                'ul, ol': {
                  marginBottom: '16px',
                  paddingLeft: '24px'
                },
                'li': {
                  marginBottom: '8px'
                },
                'img': {
                  width: '100%',
                  height: 'auto',
                  marginBottom: '8px'
                }
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Box>
        </Box>

        {/* Sidebar */}
        <Box w="33%" h={'calc(100vh - 185px)'} overflowX={'auto'} backgroundColor={'#F2F0FA'} p={4}>
          {/* Author Section */}
          <Box mb={8}>
            <Text color="purple.700" fontWeight="semibold" mb={4}>
              ABOUT THE AUTHOR
            </Text>

            <Flex gap={2} mb={4}>
              <Image
                src={post.author.imageUrl}
                alt={post.author.name}
                objectFit="cover"
                w={'60px'}
                h={'60px'}
                flex={'0 0 auto'}
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
