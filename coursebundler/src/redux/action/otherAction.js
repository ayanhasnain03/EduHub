import axios from "axios";
import { server } from "../store";

export const contact = (name, email, message) => async dispatch => {
  try {
    dispatch({ type: 'contactRequest' });
    const { data } = await axios.post(
      `${server}/contact`,
      {
        name,
        email,
        message,
      },
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({ type: 'contactSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'contactFail',
      payload: error.response.data.message,
    });
  }
};

export const requestCourse = (name, email, course) => async dispatch => {
  try {
    dispatch({ type: 'requestCourseRequest' });

    const { data } = await axios.post(
      `${server}/courserequest`,
      {
        name,
        email,
        course,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({ type: 'requestCourseSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'requestCourseFail',
      payload: error.response.data.message,
    });
  }
};
