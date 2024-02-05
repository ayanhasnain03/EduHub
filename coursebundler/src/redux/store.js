import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from "./reducers/userReducer"
const store = configureStore({
    reducer:{
       user:userReducer
    }
})
export default store;
export const server = `http://localhost:4000/api/v1`;
////https://edu-hub-1oxu.vercel.app/api/v1