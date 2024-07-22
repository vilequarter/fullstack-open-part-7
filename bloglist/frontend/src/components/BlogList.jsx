import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  return(
    <div>
      {blogs.map((blog) => {
        if(blog){
          return (
            <div key={blog.id} className="blog">
              <Link to={`blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </div>
          )
        }
      })}
    </div>
  )
}

export default BlogList