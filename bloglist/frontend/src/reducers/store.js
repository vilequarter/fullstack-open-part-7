import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogReducer'
import userReducer from './userReducer'
import notificationReducer from './notificationReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer
  }
})

export default store