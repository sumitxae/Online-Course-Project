import { configureStore } from '@reduxjs/toolkit'
import courseReducer from './reducers/courseReducer'

export const store = configureStore({
  reducer: {
    courseSlice: courseReducer
  },
})