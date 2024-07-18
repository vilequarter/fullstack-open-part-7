import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Toggleable from './components/Toggleable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { resetUser, setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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
      dispatch(setUser(user))
    }
  }, [])

  const handleLogout = () => {
    dispatch(resetUser())
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
            handleToggle={() => handleToggle(loginFormRef)}
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