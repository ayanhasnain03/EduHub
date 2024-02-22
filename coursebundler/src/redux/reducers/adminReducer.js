import { createReducer } from '@reduxjs/toolkit';
export const createCourse = createReducer({}, builder => {
  builder
    .addCase('createCourseRequest', state => {
      state.loading = true;
    })
    .addCase('createCourseSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('createCourseFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('getAllUsersRequest', state => {
      state.loading = true;
    })
    .addCase('getAllUsersSuccess', (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase('getAllUsersFail', (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    })
    .addCase('updateUserRoleRequest', state => {
      state.loading = true;
    })
    .addCase('updateUserRoleSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('updateUserRoleFail', (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    })
    .addCase('deleteUsersRequest', state => {
      state.loading = true;
    })
    .addCase('deleteUsersSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    })
    .addCase('deleteUsersFail', (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    })
    .addCase('deleteCourseRequest', state => {
      state.loading = true;
    })
    .addCase('deleteCourseSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    })
    .addCase('deleteCourseFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('addLectureRequest', state => {
      state.loading = true;
    })
    .addCase('addLectureSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    })
    .addCase('addLectureFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('deleteLectureRequest', state => {
      state.loading = true;
    })
    .addCase('deleteLectureSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    })
    .addCase('deleteLectureFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('clearError', state => {
      state.error = null;
    })
    .addCase('clearMessage', state => {
      state.message = null;
    });
});
