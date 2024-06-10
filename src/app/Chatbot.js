import { useState, useRef, useEffect } from 'react';
import { Input, Button, Flex, Box, Text, useColorMode, IconButton, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FiSend, FiPaperclip } from 'react-icons/fi';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [documentText, setDocumentText] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, from: 'user' }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('/api/query', { query: input });
      setMessages([...newMessages, { text: response.data.answer, from: 'bot' }]);
    } catch (error) {
      console.error('Error querying the AI:', error);
      setMessages([...newMessages, { text: 'Sorry, there was an error processing your request.', from: 'bot' }]);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const text = await file.text();
      setDocumentText(text);

      try {
        const response = await axios.post('/api/process-document', { document: text });
        setMessages([{ text: response.data.summary, from: 'bot' }]);
      } catch (error) {
        console.error('Error processing the document:', error);
        setMessages([{ text: 'Sorry, there was an error processing your document.', from: 'bot' }]);
      }
    }
  };

  return (
    <Box className="chat-container" bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'} p={4} borderRadius="md">
      <Flex justify="flex-end">
        <IconButton onClick={toggleColorMode} icon={colorMode === 'dark' ? 'sun' : 'moon'} aria-label="Toggle dark mode" />
      </Flex>
      <Box flex="1" overflowY="auto" pb={4}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            borderRadius="md"
            bg={msg.from === 'user' ? 'blue.500' : colorMode === 'dark' ? 'gray.700' : 'gray.200'}
            color={msg.from === 'user' ? 'white' : 'inherit'}
            alignSelf={msg.from === 'user' ? 'flex-end' : 'flex-start'}
            p={2}
            my={2}
          >
            {msg.text}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Flex align="center">
        <Input
          type="file"
          display="none"
          onChange={handleFileUpload}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <IconButton as="span" icon={<FiPaperclip />} aria-label="Attach File" />
        </label>
        <InputGroup flex="1">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            variant="filled"
            size="md"
            borderRadius="md"
            bg={colorMode === 'dark' ? 'gray.700' : 'white'}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleSend} colorScheme="blue">
              <FiSend />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default Chatbot;
