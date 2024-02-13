import { server } from '../store';
import axios from 'axios';

export const createCourse = formdata => async dispatch => {
  try {
    dispatch({ type: 'createCourseRequest' });
    const config = {
      headers: { 'Content-type': 'multipart/form-data' },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${server}/createcourse`,
      formdata,
      config
    );
    dispatch({ type: 'createCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createCourseFail',
      payload: error.response.data.message,
    });
  }
};
