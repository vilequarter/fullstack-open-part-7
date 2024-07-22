import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { notification } from './notificationReducer'

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState: null,
  reducers: {
    setLoggedUser(state, action){
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(action.payload)
      )
      return action.payload
    },
    resetLoggedUser(state, action){
      window.localStorage.removeItem('loggedBlogappUser')
      return null
    },
  }
})

export const login = (credentials) => {
  return async dispatch => {
    try{
      const user = await loginService.login(credentials)
      dispatch(setLoggedUser(user))
      blogService.setToken(user.token)
      dispatch(notification(`${user.username} logged in successfully`, 5, 'success'))
    } catch(exception){
      dispatch(notification('Invalid username or password', 5, 'error'))
    }
  }
}

export const { setLoggedUser, resetLoggedUser } = loggedUserSlice.actions
export default loggedUserSlice.reducer