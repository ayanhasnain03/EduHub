import { configureStore } from '@reduxjs/toolkit';
import { profileReducer, userReducer } from './reducers/userReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    profile:profileReducer
  },
});
export default store;
export const server = `https://edu-hub-1oxu.vercel.app/api/v1`;
////https://edu-hub-1oxu.vercel.app/api/v1
//https://unusual-eel-tweed-jacket.cyclic.app/api/v1
