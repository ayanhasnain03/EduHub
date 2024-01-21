import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import introVideo from '../../assets/videos/introvideo.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import TermsAndCondition from '../../assets/docs/termsAndCondition';

const About = () => {
  return (
    <Container maxW={'container.lg'} padding="16" boxShadow={'lg'}>
      <Heading children="About Us" textAlign={['center', 'left']} />
      <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
        <VStack>
          <Avatar
            src="https://imgs.search.brave.com/mR-qTglzpGl8uw83n_ErbMNuZKXcqnfulrRGN17nsn0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvY29vbC1wcm9m/aWxlLXBpY3R1cmUt/ODdoNDZnY29iamw1/ZTR4dS5qcGc"
            boxSize={['40', '48']}
          />
          <Text children="Co-Founder" opacity={0.7} />
        </VStack>

        <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
          <Heading children="Ayan Hasnain" size={['md', 'xl']} />
          <Text
            children={`Iam a full-stack developer and a teacher.
        Our mission is to provide quality contant at reasonable price.`}
          />
        </VStack>
      </Stack>
      <Stack m="8" direction={['column', 'row']} alignItems="center">
        <Text fontFamily={'cursive'} m="8" textAlign={['center', 'left']}>
          We are a video streaming platform with some premium courses available
          only for premium users
        </Text>
        <Link to="/subscribe">
          <Button variant={'ghost'} colorScheme="yellow">
            Checkout Our Plans
          </Button>
        </Link>
      </Stack>
      <Box>
        <video
          autoPlay={true}
          muted
          controlsList="nodownlod nofullscreen noremoteplayback"
          disablePictureInPicture
          src={introVideo}
        ></video>
      </Box>

      <Box>
        <Heading
          children="Terms & Condition"
          textAlign={['center', 'left']}
          my={'4'}
        />
        <Box h="sm" p="4"overflowY={"scroll"} >
<Text fontFamily={"heading"} textAlign={["center","left"]} letterSpacing={"widest"} >
   <TermsAndCondition/>
</Text>
<Heading my="4" size={"xs"}children="Refund only applicable for cancellation within 7 days" />
        </Box>
      </Box>

      <HStack>
        <RiSecurePaymentFill />
        <Heading
          size={'xs'}
          fontFamily="sans-serif"
          textTransform={'uppercase'}
          my={'4'}
          p={'4'}
          children={'Payment is secured by Razorpay'}
        />
      </HStack>
    </Container>
  );
};

export default About;
