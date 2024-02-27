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
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestCourse } from '../../redux/action/otherAction';
import toast from 'react-hot-toast';
const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector(state => state.other);
  const submitHandler = e => {
    e.preventDefault();
    dispatch(requestCourse(name, email, course));
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
  }, [dispatch, message, error]);

  return (
    <Container h="92vh">
      <VStack h="full" justifyContent={'center'} spacing="16">
        <Heading children="Request Course" />
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
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Explain the course ..."
              type={'text'}
              focusBorderColor={'yellow.500'}
            />
          </Box>

          <Button
            isLoading={loading}
            my="4"
            colorScheme={'yellow'}
            type="submit"
          >
            Send Mail
          </Button>

          <Box my="4">
            See available Courses ! {'  '}
            <Link to="/courses">
              <Button variant="link" colorScheme={'yellow'}>
                click
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Request;
