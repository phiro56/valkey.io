import { Box, Link, Text } from '@chakra-ui/react';

export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  category: 'tutorials' | 'news' | 'case-studies';
}

export const blogDigest: BlogPost[] = [
  {
    title: 'Reducing application latency and lowering Cloud bill by setting up your client library',
    date: 'Wednesday January 8, 2025',
    excerpt:
      'By implementing AZ affinity routing in Valkey and using GLIDE, you can achieve lower latency and cost savings by routing requests to replicas in the same AZ as the client.',
    slug: 'reducing-application-latency',
    category: 'tutorials',
  },
  {
    title: '2024: The Year of Valkey',
    date: 'Friday December 20, 2024',
    excerpt:
      'The end of the calendar year is a great time to reflect, but for Valkey this particular year-end holds special meaning.',
    slug: 'year-of-valkey-2024',
    category: 'news',
  },
  {
    title: 'Pushing the limits of Valkey on a Raspberry Pi',
    date: 'Thursday November 21, 2024',
    excerpt:
      "While most people won't go to production on a Raspberry Pi, we'll cover how to thoroughly performance test Valkey to understand how it works in production.",
    slug: 'valkey-on-raspberry-pi',
    category: 'case-studies',
  },
  {
    title: 'Scaling Valkey in High-Traffic Environments',
    date: 'Tuesday March 4, 2025',
    excerpt:
      'Discover strategies to optimize Valkey performance under heavy loads, including caching, parallel processing, and load balancing techniques.',
    slug: 'scaling-valkey-high-traffic',
    category: 'tutorials',
  },
  {
    title: "Introducing Valkey's New Security Features",
    date: 'Monday May 12, 2025',
    excerpt:
      'Learn about the latest encryption, authentication, and role-based access enhancements that keep your Valkey deployment secure.',
    slug: 'valkey-security-features-2025',
    category: 'news',
  },
  {
    title: "A Deep Dive Into Valkey's Plugin Ecosystem",
    date: 'Wednesday July 16, 2025',
    excerpt:
      'From custom data transformations to real-time analytics, explore how Valkeys plugin system helps you tailor the platform to your specific needs.',
    slug: 'valkey-plugin-ecosystem',
    category: 'tutorials',
  },
];

interface BlogContentProps {
  searchQuery: string;
  selectedCategory: BlogPost['category'] | '';
  selectedDate: string;
}

export const BlogContent = ({ searchQuery, selectedCategory, selectedDate }: BlogContentProps) => {
  const filteredPosts = blogDigest.filter(post => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.date.toLowerCase().includes(searchLower);

    const matchesCategory = !selectedCategory || post.category === selectedCategory;

    // Convert the post date to YYYY-MM-DD format for comparison
    const postDate = new Date(post.date).toISOString().split('T')[0];
    const matchesDate = !selectedDate || postDate === selectedDate;

    return matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <Box p={4}>
      {(searchQuery || selectedCategory || selectedDate) && filteredPosts.length === 0 ? (
        <Box borderRadius={'2px'} p={8} textAlign="center">
          <Text fontWeight="800" color="secondary.purple.500" mb={1} fontSize={'60px'}>
            &lt;/&gt;
          </Text>
          <Text fontWeight="medium" color="secondary.purple.500" mb={1}>
            We couldn't find any blog posts matching your criteria
          </Text>
          <Text color="secondary.purple.500">Try adjusting your filters or search terms</Text>
        </Box>
      ) : (
        <>
          <Box>
            {filteredPosts.map((post, index) => (
              <Box
                key={post.slug}
                mb={index < filteredPosts.length - 1 ? 2 : 0}
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
