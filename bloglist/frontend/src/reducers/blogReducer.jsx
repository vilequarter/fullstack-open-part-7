import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
  }
}

export const update = (id, newBlog) => {
  return async dispatch => {
    await blogService.update(id, newBlog)
    dispatch(updateBlog({ id, newBlog }))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const { appendBlog, updateBlog, setBlogs, removeBlog } = blogSlice.actions
export default blogSlice.reducer