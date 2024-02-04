// import {createReducer} from "@reduxjs/toolkit";

// export const userReducer = createReducer({},{
// loginRequest:(state)=>{
//     state.loading=true;
// },
// loginSuccess:(state,action)=>{

// },
// loginFail:(state,action)=>{
//     state.loading=false;
//     state.isAuthenticated=false;
//     state.error=action.payload;
// },
// clearError:(state)=>{
// state.error=null
// },
// clearMessage:(state)=>{
// state.error=null
// }
// })

import { createReducer } from '@reduxjs/toolkit';

export const userReducer = createReducer({}, builder => {
  builder
    .addCase("loginRequest", state => {
      state.loading = true;
    })
    .addCase("loginSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    })
    .addCase("loginFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase("clearError", state => {
      state.error = null;
    })
    .addCase("clearMessage", state => {
      state.error = null;
    });
});