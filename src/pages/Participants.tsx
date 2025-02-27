import { Box, Container, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { participants } from '../data/participants';
import SbHero from '/src/assets/images/code-of-conduct-image.webp';

export const ParticipantsPage = () => {


  return (
    <Container maxW="none" p={0} background={'#E9EBF8'}>

      <Box bgGradient="linear(to-b, #3B2A66, #4E51BF)" color="white" py={16} textAlign="center">
        <Container maxW="800px">
          <Heading as="h1" size="2xl" mb={4}>
            Participants
          </Heading>
          <Text fontSize="xl" textAlign="center" maxW="800px">
            The diverse Valkey project participants are committed to maintaining and enhancing the project's long-term viability for all. Since its inception, Valkey has seen steady adoption, reflecting the industry's interest in an open, community-driven database solution. We anticipate further growth in participation from additional companies.
          </Text>
        </Container>
      </Box>

      <Flex 
        gap={0} 
        minH={'100%'} 
        direction={{ base: 'column-reverse', md: 'row' }}
      >
        {/* Main Content */}
        <Box
          flex="1"
          background={'#E2E8F0'}
          padding={'4'}
        >
          <VStack spacing={'4'}>
            {participants.map((participant, index) => (
              <Box
                key={index}
                p={2}
                background={'white'}
              >
                <Flex align="start" gap={4} alignItems={'center'} flexDirection={{ base: 'column', md: 'row' }}>
                  <Box 
                  flex={'0 0 auto'} 
                  width={{ base: '80%', md: '30%' }}
                  maxW={'200px'}
                  textAlign={'center'} 
                  padding={{ base: '30px 15px 0', md: '15px 15px 0' }}
                  >
                    <Image
                      src={participant.logo}
                      alt={participant.name}
                      height="auto"
                      width={'100%'}
                      objectFit="contain"
                      alignSelf="start"
                    />
                  </Box>
                  <Box 
                    flex={1}
                    className="participant-content"
                    padding={'2'}
                    sx={{
                      'h3': {
                        fontSize: 'lg',
                        fontWeight: 'bold',
                        color: 'secondary.purple.500',
                        mb: 2,
                        mt: 4,
                        '&:first-of-type': {
                          mt: 0
                        }
                      },
                      'p': {
                        color: 'gray.600',
                        mb: 4
                      },
                      'ul': {
                        listStylePosition: 'inside',
                        color: 'gray.600',
                        mb: 4
                      },
                      'li': {
                        ml: 4
                      }
                    }}
                    dangerouslySetInnerHTML={{ __html: participant.content }}
                  />
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Sidebar */}
        <Box 
          w={{ base: '100%', md: '33%' }}
          h={{ base: '250px', md: 'calc(100vh - 60px)' }}
          overflowX={'auto'} 
          backgroundColor={'#F2F0FA'}
          backgroundImage={SbHero}
          backgroundSize={'cover'}
          backgroundPosition={'center bottom'}
          position={{ base: 'static', md: 'sticky' }}
          top={0}
          p={4}>          
        </Box>
      </Flex>
    </Container>
  );
}; 