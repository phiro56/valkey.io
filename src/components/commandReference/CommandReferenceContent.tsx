import { Box, Flex, Link, Select, Text } from '@chakra-ui/react';

interface BitmapOperation {
  name: string;
  description: string;
}

const BITMAP_OPERATIONS: BitmapOperation[] = [
  {
    name: 'BITCOUNT',
    description: 'Counts the number of set bits (population counting) in a string.',
  },
  {
    name: 'BITFIELD',
    description: 'Performs arbitrary bitfield integer operations on strings.',
  },
  {
    name: 'BITFIELD_RO',
    description: 'Performs arbitrary read-only bitfield integer operations on strings.',
  },
  {
    name: 'BITOP',
    description: 'Performs bitwise operations on multiple strings, and stores the result.',
  },
  {
    name: 'BITPOS',
    description: 'Finds the first set (1) or clear (0) bit in a string.',
  },
  {
    name: 'GETBIT',
    description: 'Returns a bit value by offset.',
  },
  {
    name: 'SETBIT',
    description:
      "Sets or clears the bit at offset of the string value. Creates the key if it doesn't exist.",
  },
];

export const CommandReferenceContent = () => {
  return (
    <Box>
      <Box p={4}>
        <Box mb={4} background={'white'} borderRadius={'50px'} px={4} py={2}>
          <Text color="gray.600" fontSize="sm">
            <Link color={'primary.500'} textDecoration={'underline'}>
              BITMAP
            </Link>{' '}
            / BITCOUNT
          </Text>
        </Box>

        <Flex
          mb={0}
          background={'white'}
          borderTopRadius={'20px'}
          px={4}
          py={2}
          borderBottom={'1px solid #6893EE'}
          alignItems={'center'}
        >
          <Text color="gray.600" fontSize="sm" flex={'1'} whiteSpace={'nowrap'} mr={2}>
            Command category:
          </Text>
          <Select
            placeholder="All"
            variant="lined"
            borderRadius="md"
            border={'1px solid'}
            borderColor={'#E2E8F0'}
          >
            <option value="all">All</option>
            <option value="bitmap">Bitmap</option>
            <option value="cluster">Cluster</option>
            <option value="connection">Connection</option>
            <option value="generic">Generic</option>
            <option value="geospatial">Geospatial indices</option>
            <option value="hash">Hash</option>
            <option value="hyperloglog">HyperLogLog</option>
            <option value="list">List</option>
            <option value="pubsub">Pub/Sub</option>
            <option value="scripting">Scripting and Functions</option>
            <option value="server">Server</option>
          </Select>
        </Flex>

        <Box background={'white'} borderRadius={'2px'} p={4}>
          <Box mb={6}>
            <Flex
              alignItems="center"
              mb={2}
              borderBottom={'1px solid'}
              borderColor={'rgba(188, 181, 231, 0.4)'}
              pb={2}
            >
              <Text fontWeight="bold" mr={2}>
                BITMAP
              </Text>
              <Text color="gray.600">Operations on the Bitmap data type</Text>
            </Flex>

            <Box>
              {BITMAP_OPERATIONS.map((operation, index) => (
                <Flex
                  key={`${operation.name}-${index}`}
                  mb={4}
                  borderBottom={'1px solid'}
                  borderColor={'rgba(188, 181, 231, 0.4)'}
                  pb={2}
                >
                  <Link color="blue.500" textDecor={'underline'}>
                    {operation.name}
                  </Link>
                  <Text ml={1}>{operation.description}</Text>
                </Flex>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
