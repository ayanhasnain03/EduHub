import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import tost from 'react-hot-toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/action/user';
import logo from '../../assets/images/logo.png';
const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');
  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const subscribeHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);
    setKey(key);
    dispatch(buySubscription());
  };
  useEffect(() => {
    if (error) {
      tost.error(error);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'Course Bundler',
          description: 'Get access to all premium content',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'Course Bundler',
          },
          theme: {
            color: '#FFC800',
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [dispatch, error, user.name, user.email, key, subscriptionId]);
  return (
    <Container h="90vh" p="16">
      <Heading children="Welcome" my="8" textAlign={'center'} />
      <VStack
        boxShadow={'lg'}
        alignItems="stretch"
        borderRadius={'lg'}
        spacing="0"
      >
        <Box bg="yellow.400" p={'4'} css={{ borderRadius: '8px 8px 0 0 ' }}>
          <Text children={`Pro Pack - ₹299.00`} />
        </Box>
        <Box p="4">
          <VStack>
            <Text
              textAlign={'center'}
              px="8"
              mt={'4'}
              spacing="8"
              children={`Join Pro Pack and Get Access to all content.`}
            />
            <Heading size="md" children={' ₹299 Only'} />
          </VStack>
          <Button
            my="8"
            w="full"
            colorScheme={'yellow'}
            onClick={subscribeHandler}
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>
        <Box bg="blackAlpha.600" p="4" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading
            size="sm"
            color={'white'}
            textTransform={'uppercase'}
            children={'100% refund at cancellation'}
          />
          <Text
            fontSize={'xs'}
            color={'white'}
            children={'Term & Condition Apply.'}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
