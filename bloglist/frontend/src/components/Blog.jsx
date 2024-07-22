import { useDispatch, useSelector } from 'react-redux'
import { update, deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const loggedUser = useSelector(state => state.loggedUser)
  const dispatch = useDispatch()

  const addLike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(update(blog.id, newBlog))
  }

  const remove = () => {
    if(window.confirm(`Delete blog "${blog.title}"?`)){
      dispatch(deleteBlog(blog))
    }
  }

  return(
    <div>
      <h2>{blog.title}</h2>
      <Link to={blog.url}>{blog.url}</Link>
      <div>Likes: <span data-testid='likes'>{blog.likes} </span>
        <button
          onClick={addLike}
          id='likeButton'>
            Like
        </button>
      </div>
      <div>Added by {blog.user.name}</div>
      <button
        onClick={remove}
        style={{ display: loggedUser && loggedUser.username === blog.user.username ? '' : 'none' }}
      >
        Delete
      </button>
    </div>
  )
}

export default Blog