import { configureStore } from '@reduxjs/toolkit';
import { profileReducer, subscriptionReducer, userReducer } from './reducers/userReducer';
import { course } from './reducers/courseReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    profile:profileReducer,
    course:course,
    subscription:subscriptionReducer
  },
});
export default store;
export const server = `https://unusual-eel-tweed-jacket.cyclic.app/api/v1`;
// http://unusual-eel-tweed-jacket.cyclic.app/api/v1