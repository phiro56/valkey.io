import { Box, Button, Input, Select } from '@chakra-ui/react';
import { FormEvent } from 'react';
import { blogDigest, BlogPost } from './BlogContent';

type Category = BlogPost['category'];
const categories: Category[] = Array.from(new Set(blogDigest.map(post => post.category)));

interface BlogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category | '';
  setSelectedCategory: (category: Category | '') => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export const BlogSearch = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDate,
  setSelectedDate,
}: BlogSearchProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // The search is already live, but this prevents form submission
  };

  return (
    <>
      <Box as="form" display="flex" onSubmit={handleSubmit} mb={'2'}>
        <Input
          placeholder="Search articles"
          bg="white"
          borderRadius="md"
          mb={1}
          borderRightRadius={'0'}
          borderLeftRadius={'50px'}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <Button type="submit" variant="violet" borderRightRadius={'50px'}>
          Search
        </Button>
      </Box>

      <Box color={'secondary.purple.500'} mb={0}>
        Filters
      </Box>

      <Box
        background={'white'}
        padding={'2'}
        borderRadius={'10px'}
        display={'flex'}
        alignItems={'center'}
        gap={'2'}
      >
        <Box as="label" ml={'2'}>
          Category:
        </Box>
        <Select
          bg="white"
          borderRadius="10px"
          borderLeftRadius={'10px'}
          borderRightRadius={'10px'}
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value as Category | '')}
          defaultValue=""
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
            </option>
          ))}
        </Select>
      </Box>

      <Box
        mt={2}
        background={'white'}
        padding={'2'}
        borderRadius={'10px'}
        display={'flex'}
        alignItems={'center'}
        gap={'2'}
      >
        <Box as="label" ml={'2'}>
          Date:
        </Box>
        <Input
          type="date"
          placeholder="Select Date"
          bg="white"
          borderRadius="10px"
          borderLeftRadius={'10px'}
          borderRightRadius={'10px'}
          aria-label="Filter by date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
      </Box>
    </>
  );
};
