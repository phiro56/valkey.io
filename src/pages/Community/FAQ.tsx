import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { MdExpandMore } from 'react-icons/md';

const faqs = [
  {
    question: 'What is Valkey?',
    answer:
      'Valkey is an open-source key management solution designed to help teams manage and secure their API keys, secrets, and credentials effectively.',
  },
  {
    question: 'How do I get started with Valkey?',
    answer:
      'You can get started by following our installation guide in the documentation. The basic setup involves installing the CLI tool and configuring your first vault.',
  },
  {
    question: 'Is Valkey free to use?',
    answer:
      'Yes, Valkey is completely free and open-source. You can use it for both personal and commercial projects without any cost.',
  },
  {
    question: 'How can I contribute to Valkey?',
    answer:
      'There are many ways to contribute to Valkey: you can report bugs, suggest features, improve documentation, or submit pull requests. Check our contribution guidelines on GitHub for more details.',
  },
  {
    question: 'Where can I get help if I run into issues?',
    answer:
      'You can get help through multiple channels: our GitHub discussions, Matrix chat, or by filing an issue on our GitHub repository. Our community is always ready to help!',
  },
];

export default function FAQ() {
  return (
    <Container maxW="container.xl" py={16}>
      <Stack spacing={8} align="center">
        <Heading as="h1" size="2xl" textAlign="center">
          Frequently Asked Questions
        </Heading>

        <Text textAlign="center" maxW="container.md" mb={8}>
          Find answers to common questions about Valkey. Can't find what you're looking for? Join
          our community discussion or reach out to us directly.
        </Text>

        <Accordion allowMultiple width="100%">
          {faqs.map((faq, index) => (
            <AccordionItem key={index}>
              <AccordionButton>
                <Heading as="h3" size="md" flex="1" textAlign="left">
                  {faq.question}
                </Heading>
                <AccordionIcon as={MdExpandMore} />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text>{faq.answer}</Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    </Container>
  );
}
