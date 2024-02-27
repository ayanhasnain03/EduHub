import { createReducer } from '@reduxjs/toolkit';
export const otherReducer = createReducer({}, builder => {
  builder
    .addCase('requestCourseRequest', state => {
      state.loading = true;
    })
    .addCase('requestCourseSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('requestCourseFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('contactRequest', state => {
      state.loading = true;
    })
    .addCase('contactSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('contactFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
