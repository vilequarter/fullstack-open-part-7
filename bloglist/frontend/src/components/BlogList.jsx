import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ loggedUser }) => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  return(
    <div>
      {blogs.map((blog) => {
        if(blog) return <Blog blog={blog} loggedUser={loggedUser} key={blog.id}/>
      })}
    </div>
  )
}

export default BlogList