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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { contact } from '../../redux/action/otherAction';
import toast from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactMessage, setcontactMessage] = useState('');
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(state => state.other);
  console.log(message)
  const submitHandler = e => {
    e.preventDefault();
    dispatch(contact(name, email, contactMessage));
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, error]);
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
              onChange={e => setcontactMessage(e.target.value)}
              placeholder="Your Message..."
              type={'text'}
              focusBorderColor={'yellow.500'}
            />
          </Box>

          <Button
            my="4"
            colorScheme={'yellow'}
            type="submit"
            isLoading={loading}
          >
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
