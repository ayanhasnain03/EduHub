import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import SideBar from '../SideBar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from '../../../redux/action/admin';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../../redux/action/user';
import tost, { toast } from 'react-hot-toast';
const Users = () => {
  const dispatch = useDispatch();
  const { user, message, loading, error } = useSelector(state => state.admin);

  const updateHandler = async userId => {
    await dispatch(updateUserRole(userId));
    dispatch(loadUser());
  };
  const deleteButtonHandler =async userId => {
   await dispatch(deleteUser(userId));
   await dispatch(loadUser());
    toast.success("User Deleted SuccesFully")
  };

  useEffect(() => {
    dispatch(getAllUsers());
    if (message) {
      tost.success(message);
    }
    if (error) {
      tost.error(error);
    }
  }, [dispatch, message, error]);

  return (
    <Grid
      css={{
        cursor: `url(${cursor}),default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box padding={['0', '16']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All Users"
          my="16"
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={'lg'}>
            <TableCaption>All available user in the database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {user &&
                user.map(item => (
                  <Row
                    key={item._id}
                    item={item}
                    deleteButtonHandler={deleteButtonHandler}
                    updateHandler={updateHandler}
                    loading={loading}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <SideBar />
    </Grid>
  );
};

export default Users;

function Row({ item, updateHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      <Td>{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription && item.subscription.status === 'active'
          ? 'Active'
          : 'Not Active'}
      </Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => updateHandler(item._id)}
            variant={'outline'}
            color={'purple.500'}
          >
            Change Role
          </Button>
          <Button
            isLoading={loading}
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
