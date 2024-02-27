import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { contact } from '../../redux/action/user';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(contact(name,email, message));
  };
  return (
    <Container h="92vh">
      <VStack h="full" justifyContent={'center'} spacing="16">
        <Heading children="Contact Us" />
        <form style={{ width: '100%' }} onSubmit={submitHandler}>
          <Box my={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter Your Name"
              type={'text'}
              focusBorderColor={'yellow.500'}
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="xyz@gmail.com"
              type={'email'}
              focusBorderColor={'yellow.500'}
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="message" children="Message" />
            <Textarea
              resize={'none'}
              required
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Your Message..."
              type={'text'}
              focusBorderColor={'yellow.500'}
            />
          </Box>

          <Button my="4" colorScheme={'yellow'} type="submit">
            Send Mail
          </Button>

          <Box my="4">
            Request for a course?{' '}
            <Link to="/request">
              <Button variant="link" colorScheme={'yellow'}>
                click here
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Contact;
