import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/action/profile';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);
  const [email, setEmail] = useState('');
  const submitHandler = e => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({type:"clearMessage"})
    }
    if (error) {
      toast.error(error);
      dispatch({type:"clearError"})
    }
  }, [dispatch, message, error]);
  return (
    <Container py={'16'} h={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Forget Password"
          my="16"
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            required
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="xyz@gmail.com"
            type={'text'}
            focusBorderColor={'yellow.500'}
          />
          <Button isLoading={loading} type="submit" w={'full'} colorScheme="yellow">
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
