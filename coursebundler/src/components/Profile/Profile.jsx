import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../Auth/Register';
const Profile = () => {
  const user = {
    name: 'Ayan',
    email: 'xyz@gmail.com',
    createdAt: String(new Date().toISOString()),
    role: 'user',
    subscription: {
      status: 'active',
    },
    playlist: [
      {
        course: 'sdsewd',
        poster:
          'https://imgs.search.brave.com/7HL1lW7HKo5z8zFekR_QjEBKJlYUA2HJWQLAhWdox8s/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9iMjY2/MjA3NS5zbXVzaGNk/bi5jb20vMjY2MjA3/NS93cC1jb250ZW50/L3VwbG9hZHMvZUxl/YXJuaW5nLWdyYXBo/aWNzLnBuZz9sb3Nz/eT0wJnN0cmlwPTEm/d2VicD0x',
      },
    ],
  };
  const removeFromPlaylistHandler = id => {
    console.log('playlist deleted');
  };
  const changeImageSubmitHandler = (e,image)=>{
    e.preventDefault()
console.log(image)
  }
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Container minH={'95vh'} maxW="container.lg" py="8">
      <Heading children="Profile" textTransform={'uppercase'} />

      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
        padding="8"
      >
        <VStack>
          <Avatar boxSize={'48'} />
          <Button onClick={onOpen} colorScheme={'yellow'} variant={'ghost'}>
            Change Photo
          </Button>
        </VStack>
        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text children="Name" fontWeight={'bold'} />
            <Text children={user.name} fontWeight={'bold'} />
          </HStack>
          <HStack>
            <Text children="Email" fontWeight={'bold'} />
            <Text children={user.email} fontWeight={'bold'} />
          </HStack>
          <HStack>
            <Text children="CreatedAt" fontWeight={'bold'} />
            <Text children={user.createdAt.split('T')[0]} fontWeight={'bold'} />
          </HStack>
          {user.role !== 'admin' && (
            <HStack>
              <Text children="Subscription" fontWeight={'bold'} />
              {user.subscription.status === 'active' ? (
                <Button color={'yellow.500'} variant="unstyled">
                  {' '}
                  Cancel Subscription
                </Button>
              ) : (
                <Link to="/subscribe">
                  <Button colorScheme="yellow">Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}

          <Stack direction={['column', 'row']} alignItems={'center'}>
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>

            <Link to="changepassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>
      <Heading children="Playlist" size={'md'} />
      {user.playlist.length > 0 && (
        <Stack
          direction={['column', 'row']}
          alignItems={'center'}
          flexWrap={'wrap'}
          p="4"
        >
          {user.playlist.map((element, index) => (
            <VStack w="48" m="2" key={element.length}>
              <Image
                boxSize={'full'}
                objectFit="contain"
                src={element.poster}
              />
              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={'ghost'} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>
                <Button onClick={() => removeFromPlaylistHandler(element.id)}>
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}

      <ChangePhotoBox isOpen={isOpen} onClose={onClose}  changeImageSubmitHandler={changeImageSubmitHandler} />
    </Container>
  );
};

export default Profile;

function ChangePhotoBox({ isOpen, onClose, changeImageSubmitHandler }) {
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');
  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  const closeHandler =()=>{
  onClose();
  setImage("");
  setImagePrev("");
  }
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e=>changeImageSubmitHandler(e,image)} >
              <VStack spacing={'8'}>
                {
                  imagePrev && 
                <Avatar src={imagePrev} boxSize={'48'} />

                }
                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                  onChange={changeImage}
                />
                <Button w="full" colorScheme="yellow" type="submit">
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Cancel{' '}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
