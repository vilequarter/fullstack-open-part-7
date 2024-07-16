import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { update, deleteBlog } from '../reducers/blogReducer'
import { notification } from '../reducers/notificationReducer'

const Blog = ({ blog, loggedUser }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const addLike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(update(blog.id, newBlog))
    dispatch(notification(`You liked '${blog.title}'`, 5, 'success'))
  }

  const remove = () => {
    if(window.confirm(`Delete blog "${blog.title}"?`)){
      dispatch(deleteBlog(blog.id))
      dispatch(notification(`You deleted '${blog.title}'`, 5, 'success'))
    }
  }

  return(
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>
        {detailsVisible ? 'hide' : 'view'}
      </button>
      <div
        style={{ display: detailsVisible ? '' : 'none' }}
        className='toggleableContent'
      >
        <div>{blog.url}</div>
        <div>Likes: <div data-testid='likes'>{blog.likes}</div>
          <button
            onClick={addLike}
            id='likeButton'>
              Like
          </button>
        </div>
        <div>{blog.user ? blog.user.name : ''}</div>
        <button
          onClick={remove}
          style={{ display: loggedUser && loggedUser.username === blog.user.username ? '' : 'none' }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Blog