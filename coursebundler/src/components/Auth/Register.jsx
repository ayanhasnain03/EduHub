import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/action/user';
import toast from 'react-hot-toast';
export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC948',
  backgroundColor: 'white',
};

const fileUploadStyle = {
  '&::file-selector-button': fileUploadCss,
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);
    dispatch(register(myForm));
    navigate('/');
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
  }, [dispatch, error, message]);

  return (
    <>
      <Container h={'95vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
          <Heading children={'Registration'} textTransform={'uppercase'} />

          <form onSubmit={submitHandler} style={{ width: '100%' }}>
            <Box my="4" display={'flex'} justifyContent={'center'}>
              <Avatar size={'2xl'} src={imagePrev} />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="name" children="Name" />
              <Input
                required
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="abc"
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
              <FormLabel htmlFor="password" children="Password" />
              <Input
                required
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Your Passowrd"
                type={'password'}
                focusBorderColor={'yellow.500'}
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
              <Input
                accept="image/*"
                required
                id="chooseAvatar"
                placeholder="Enter Your Passowrd"
                type={'file'}
                focusBorderColor={'yellow.700'}
                css={fileUploadStyle}
                onChange={changeImageHandler}
              />
            </Box>

            <Button my="4" colorScheme={'yellow'} type="submit">
              Sign Up
            </Button>
            <Box my="4">
              Already Signup?{' '}
              <Link to="/login">
                <Button
                  isLoading={loading}
                  variant="link"
                  colorScheme={'yellow'}
                >
                  Login
                </Button>{' '}
                here
              </Link>
            </Box>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Register;
