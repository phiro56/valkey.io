import { Box, Link, Text } from '@chakra-ui/react';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

const blogDigest: BlogPost[] = [
  {
    title: 'Reducing application latency and lowering Cloud bill by setting up your client library',
    date: 'Wednesday January 8, 2025',
    excerpt:
      'By implementing AZ affinity routing in Valkey and using GLIDE, you can achieve lower latency and cost savings by routing requests to replicas in the same AZ as the client.',
    slug: 'reducing-application-latency',
  },
  {
    title: '2024: The Year of Valkey',
    date: 'Friday December 20, 2024',
    excerpt:
      'The end of the calendar year is a great time to reflect, but for Valkey this particular year-end holds special meaning.',
    slug: 'year-of-valkey-2024',
  },
  {
    title: 'Pushing the limits of Valkey on a Raspberry Pi',
    date: 'Thursday November 21, 2024',
    excerpt:
      "While most people won't go to production on a Raspberry Pi, we'll cover how to thoroughly performance test Valkey to understand how it works in production.",
    slug: 'valkey-on-raspberry-pi',
  },
  {
    title: 'Reducing application latency and lowering Cloud bill by setting up your client library',
    date: 'Wednesday January 8, 2025',
    excerpt:
      'By implementing AZ affinity routing in Valkey and using GLIDE, you can achieve lower latency and cost savings by routing requests to replicas in the same AZ as the client.',
    slug: 'reducing-application-latency',
  },
  {
    title: '2024: The Year of Valkey',
    date: 'Friday December 20, 2024',
    excerpt:
      'The end of the calendar year is a great time to reflect, but for Valkey this particular year-end holds special meaning.',
    slug: 'year-of-valkey-2024',
  },
  {
    title: 'Pushing the limits of Valkey on a Raspberry Pi',
    date: 'Thursday November 21, 2024',
    excerpt:
      "While most people won't go to production on a Raspberry Pi, we'll cover how to thoroughly performance test Valkey to understand how it works in production.",
    slug: 'valkey-on-raspberry-pi',
  },
];

interface BlogContentProps {
  searchQuery: string;
}

export const BlogContent = ({ searchQuery }: BlogContentProps) => {
  return (
    <Box p={4}>
      {searchQuery ? (
        <Box borderRadius={'2px'} p={8} textAlign="center">
          <Text fontWeight="800" color="secondary.purple.500" mb={1} fontSize={'60px'}>
            &lt;/&gt;
          </Text>
          <Text fontWeight="medium" color="secondary.purple.500" mb={1}>
            We couldn't find any blog posts matching your search
          </Text>
          <Text color="secondary.purple.500">Check your spelling or try different keywords</Text>
        </Box>
      ) : (
        <>
          <Box>
            {blogDigest.map((post, index) => (
              <Box
                key={post.slug}
                mb={index < blogDigest.length - 1 ? 2 : 0}
                background={'white'}
                borderRadius={'2px'}
                p={4}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Text fontSize="1xl" fontWeight="bold" color="secondary.purple.500" mb={0}>
                    {post.title}
                  </Text>
                </Link>
                <Text fontSize="sm" color="gray.600" mb={0}>
                  {post.date}
                </Text>
                <Text mb={3}>{post.excerpt}</Text>
                <Link
                  href={`/blog/${post.slug}`}
                  color="primary.500"
                  fontWeight="medium"
                  textDecor={'underline'}
                >
                  Read More
                </Link>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};
