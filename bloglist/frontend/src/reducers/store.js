import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogReducer'
import loggedUserReducer from './loggedUserReducer'
import notificationReducer from './notificationReducer'
import usersReducer from './usersReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    loggedUser: loggedUserReducer,
    users: usersReducer
  }
})

export default store