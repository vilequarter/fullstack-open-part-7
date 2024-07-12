import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Toggleable from './components/Toggleable'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const notificationDispatch = useDispatch()

  const loginFormRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    const get = async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    get()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBlogappUser'
    )
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      notificationDispatch(notification(`${username} logged in successfully`, 5, 'success'))
      setUser(user)

      loginFormRef.current.toggleVisibility()

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    } catch(exception) {
      notificationDispatch(notification('Invalid username or password', 5, 'error'))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(newBlog)
      notificationDispatch(notification(`Blog '${newBlog.title}' by ${newBlog.author} created`, 5, 'success'))
      const newBlogs = await blogService.getAll()
      newBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)

    } catch(exception) {
      notificationDispatch(notification('Unable to add blog', 5, 'error'))
    }
  }

  const handleUpdate = async (newBlog) => {
    try {
      await blogService.update(newBlog.id, newBlog)
      notificationDispatch(notification(`You upvoted ${newBlog.title}`, 5, 'success'))
      const newBlogs = await blogService.getAll()
      newBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)
    } catch(exception) {
      notificationDispatch(notification('Unable to update blog', 5, 'error'))
    }
  }

  const handleRemove = async (blog) => {
    try {
      await blogService.remove(blog.id)
      const newBlogs = await blogService.getAll()
      newBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)
      notificationDispatch(notification(`Blog '${blog.title}' deleted`, 5, 'success'))
    } catch(exception) {
      notificationDispatch(notification('Unable to delete blog', 5, 'error'))
    }
  }

  return (
    <div>

      <Notification />

      <div style={{ display: user === null ? '' : 'none' }}>
        <Toggleable
          buttonLabel="Login"
          ref={loginFormRef}
          default={true}
        >
          <LoginForm
            handleLogin={handleLogin}
          />
        </Toggleable>
      </div>


      {user !== null
        ? <div>{`${user.name} logged in`}
          <button onClick={handleLogout}>Logout</button>
        </div>
        : <></>
      }

      <h2>Blogs</h2>
      <Toggleable buttonLabel="add blog" ref={blogFormRef}>
        <CreateBlogForm
          handleCreateBlog={handleCreateBlog}
          default={false}
        />
      </Toggleable>
      <br/>
      <div data-testid='blogList'>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdate={handleUpdate}
            handleRemove={handleRemove}
            loggedUser={user}
          />
        )}
      </div>
    </div>
  )
}

export default App