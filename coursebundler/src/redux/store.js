import { configureStore } from '@reduxjs/toolkit';
import { profileReducer, userReducer } from './reducers/userReducer';
import { course } from './reducers/courseReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    profile:profileReducer,
    course:course
  },
});
export default store;
export const server = `https://unusual-eel-tweed-jacket.cyclic.app/api/v1`;
////https://edu-hub-1oxu.vercel.app/api/v1
//https://unusual-eel-tweed-jacket.cyclic.app/api/v1
