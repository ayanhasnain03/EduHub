import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { addToPlaylist } from '../../redux/action/profile';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/action/course';
import { loadUser } from '../../redux/action/user';
const Course = ({
  loading,
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW="200px"
        size={'sm'}
        fontFamily={'sans-serif'}
        noOfLines={3}
        children={title}
      />
      <Text children={description} noOfLines={2} />
      <HStack>
        <Text
          children={'Creator'}
          textTransform="uppercase"
          fontWeight={'bold'}
        />
        <Text
          children={creator}
          textTransform="uppercase"
          fontFamily={'body'}
        />
      </HStack>
      <Heading
        textAlign={'center'}
        size="xs"
        children={`Lectues - ${lectureCount}`}
        textTransform={'uppercase'}
      />
      <Heading
        textAlign={'center'}
        size="xs"
        children={`Views - ${views}`}
        textTransform={'uppercase'}
      />
      <Stack direction={['column', 'row']} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button isLoading={loading} colorScheme={'yellow'}>
            Watch Now
          </Button>
        </Link>
        <Button
          colorScheme={'yellow'}
          variant={'ghost'}
          onClick={() => addToPlaylistHandler(id)}
        >
          Add To Playlist
        </Button>
      </Stack>
    </VStack>
  );
};
const Courses = () => {
  const dispatch = useDispatch();
  const [keyword, setkeyword] = useState('');
  const [category, setCategory] = useState('');
  const addToPlaylistHandler = async courseId => {
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  };
  const categories = [
    'webdevelopemnt',
    'Machine Learning',
    'Data Structure',
    'Andriod Developemnt',
    'Game Development',
    'Cloud',
  ];
  const { loading, courses, error, message } = useSelector(
    state => state.course
  );
  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }, [category, keyword, dispatch, message, error]);

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setkeyword(e.target.value)}
        placeholder="Search a course.."
        type={'text'}
        focusBorderColor="yellow.500"
      />
      <HStack
        overflowX={'auto'}
        paddingY="8"
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text key={index} children={item} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {courses.length > 0 ? (
          courses &&
          courses.map(item => (
            <Course
              key={item._id}
              loading={loading}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
            />
          ))
        ) : (
          <Heading mt={4} children="Courses Not Found" />
        )}
      </Stack>
    </Container>
  );
};

export default Courses;
