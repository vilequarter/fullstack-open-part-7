import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Toggleable from './components/Toggleable'
import { useDispatch } from 'react-redux'
import { notification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const loginFormRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
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
      dispatch(notification(`${username} logged in successfully`, 5, 'success'))
      setUser(user)

      loginFormRef.current.toggleVisibility()

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    } catch(exception) {
      dispatch(notification('Invalid username or password', 5, 'error'))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleToggle = (ref) => {
    ref.current.toggleVisibility()
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
          handleToggle={() => handleToggle(blogFormRef)}
          default={false}
        />
      </Toggleable>
      <br/>
      <BlogList loggedUser={user} />
    </div>
  )
}

export default App