import { configureStore } from '@reduxjs/toolkit';
import {
  profileReducer,
  subscriptionReducer,
  userReducer,
} from './reducers/userReducer';
import { course } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: course,
    subscription: subscriptionReducer,
    admin: adminReducer,
  },
});
export default store;
export const server = `http://localhost:4000/api/v1`;

// https://eduhubbackend.onrender.com/api/v1
