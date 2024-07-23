import { useDispatch, useSelector } from 'react-redux'
import { update, deleteBlog } from '../reducers/blogReducer'
import { Link, useNavigate } from 'react-router-dom'
import Comments from './Comments'
import { Button } from 'semantic-ui-react'

const Blog = ({ blog }) => {
  const loggedUser = useSelector(state => state.loggedUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addLike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(update(blog.id, newBlog))
  }

  const remove = () => {
    if(window.confirm(`Delete blog "${blog.title}"?`)){
      navigate('/')
      dispatch(deleteBlog(blog))
    }
  }

  if(!blog) return null

  return(
    <div style={{ paddingLeft: 10 }}>
      <h2>{blog.title}</h2>
      <Link to={blog.url}>{blog.url}</Link>
      <div>Likes: <span data-testid='likes'>{blog.likes} </span>
        <Button size='mini'
          onClick={addLike}
          id='likeButton'>
            Like
        </Button>
      </div>
      <div>Added by {blog.user.name}</div>
      <Button negative size='mini'
        onClick={remove}
        style={{ display: loggedUser && loggedUser.username === blog.user.username ? '' : 'none' }}
      >
        Delete
      </Button>
      <Comments blog={blog} />
    </div>
  )
}

export default Blog