import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import SideBar from '../SideBar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../../redux/action/user';
import { getAllCourses, getCourseLectures } from '../../../redux/action/course';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from '../../../redux/action/admin';
import toast from 'react-hot-toast';
import { useState } from 'react';
const AdminCourses = () => {
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const { courses, lectures } = useSelector(state => state.course);
  const { message, loading, error } = useSelector(state => state.admin);
  const courseDetailsHandler = (courseId, title) => {
    dispatch(getCourseLectures(courseId));
    setCourseId(courseId);
    setCourseTitle(title);
    onOpen();
  };
  const deleteButtonHandler = async courseId => {
    await dispatch(deleteCourse(courseId));
    dispatch(loadUser());
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearErorr' });
    }
  }, [dispatch, message, error]);

  const addLectureHandler = (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);
    dispatch(addLecture(courseId,myForm));
  };
  const deleteLectureButtonHandler = (courseId, lectureId) => {
    dispatch(deleteLecture(courseId,lectureId));
  dispatch(loadUser())
  };

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);
  return (
    <Grid
      css={{
        cursor: `url(${cursor}),default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box padding={['0', '8']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All Users"
          my="16"
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={'lg'}>
            <TableCaption>All available courses in the database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map(item => (
                <Row
                  key={item._id}
                  item={item}
                  deleteButtonHandler={deleteButtonHandler}
                  courseDetailsHandler={courseDetailsHandler}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModal
          onClose={onClose}
          isOpen={isOpen}
          deleteLectureButtonHandler={deleteLectureButtonHandler}
          id={courseId}
          courseTitle={courseTitle}
          addLectureHandler={addLectureHandler}
          lectures={lectures}
        />
      </Box>
      <SideBar />
    </Grid>
  );
};

function Row({ item, courseDetailsHandler, deleteButtonHandler }) {
  return (
    <Tr>
      <Td>{item._id}</Td>
      <Td>
        <Image src={item.poster.url} alt="React Course" />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => courseDetailsHandler(item._id)}
            variant={'outline'}
            color={'purple.500'}
          >
            View Lectures
          </Button>
          <Button
            onClick={() => deleteButtonHandler(item._id, item.title)}
            color={'purple.600'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default AdminCourses;
