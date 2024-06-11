import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  courses: [],
}
export const courseSlice = createSlice({
  name: 'addCourse',
  initialState,
  reducers: {
    updateCourse: (state, action) => {
      state.courses = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateCourse } = courseSlice.actions

export default courseSlice.reducer