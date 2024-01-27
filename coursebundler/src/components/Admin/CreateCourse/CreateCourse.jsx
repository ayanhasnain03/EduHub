import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import SideBar from '../SideBar';
import { fileUploadCss } from '../../Auth/Register';
const CreateCourse = () => {
  const categories = [
    'Web Developemnt',
    'Machine Learning',
    'Data Structure',
    'Andriod Developemnt',
    'Game Development',
    'Cloud',
  ];
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const changeImageHandler =(e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      setImagePrev(reader.result)
      setImage(file);
    }
  }
  return (
    <Grid
      css={{
        cursor: `url(${cursor}),default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Container p="16">
        <form>
          <Heading
            textTransform={'uppercase'}
            children="Create Course"
            my="16"
            textAlign={['center', 'left']}
          />
          <VStack m="auto" spacing={'8'}  >
            <Input
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              type={'text'}
              focusBorderColor={'purple.300'}
            />
            <Input
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type={'text'}
              focusBorderColor={'purple.300'}
            />
            <Input
              required
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              placeholder="Creator Name"
              type={'text'}
              focusBorderColor={'purple.300'}
            />
            <Select
              focusBorderColor="purple.300"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Category</option>
              {categories.map(item => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Input
              accept="image/*"
              required
              id="chooseAvatar"
              placeholder="Enter Your Passowrd"
              type={'file'}
              focusBorderColor={'purple.300'}
              css={{
                '&::file-selector-button':{
                  ...fileUploadCss,color:"purple"
                }
              }}
              onChange={changeImageHandler}
            />
            {
              imagePrev && (
                <Image src={imagePrev} boxSize="64" objectFit={"contain"}  />
              )
            }
            <Button w="full" colorScheme={"purple"} type='submit' >Create</Button>
          </VStack>
        </form>
      </Container>
      <SideBar />
    </Grid>
  );
};

export default CreateCourse;
