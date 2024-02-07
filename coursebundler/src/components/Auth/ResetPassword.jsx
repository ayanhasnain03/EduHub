import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/action/profile';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const { loading, message, error } = useSelector(state => state.profile);
  const { token } = useParams();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetPassword(token,password));
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
    <Container py={"16"}h={"90vh"} >
      <form onSubmit={submitHandler} >
        <Heading
          children="Reset Password"
          my="16"
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            required
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="New Password"
            type={'text'}
            focusBorderColor={'yellow.500'}
          />
          <Button isLoading={loading} type="submit" w={'full'} colorScheme="yellow">
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
