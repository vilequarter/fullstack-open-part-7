import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action){
      state.push(action.payload)
    },
    removeBlog(state, action){
      const id = action.payload
      return state.map(blog => {
        if(blog.id !== id){
          return blog
        }
      })
    },
    updateBlog(state, action){
      const id = action.payload.id
      const newBlog = action.payload.newBlog
      return state.map(blog => blog.id !== id ? blog : newBlog)
    },
    setBlogs(state, action){
      return action.payload
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
    dispatch(notification(`You created '${content.title}'`, 5, 'success'))
  }
}

export const update = (id, newBlog) => {
  return async dispatch => {
    await blogService.update(id, newBlog)
    dispatch(updateBlog({ id, newBlog }))
    dispatch(notification(`You liked '${newBlog.title}'`, 5, 'success'))
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch(removeBlog(blog.id))
    dispatch(notification(`You deleted '${blog.title}'`, 5, 'success'))
  }
}

export const { appendBlog, updateBlog, setBlogs, removeBlog } = blogSlice.actions
export default blogSlice.reducer