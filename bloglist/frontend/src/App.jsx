import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Toggleable from './components/Toggleable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { resetLoggedUser, setLoggedUser } from './reducers/loggedUserReducer'
import Menu from './components/Menu'
import { Route, Routes } from 'react-router-dom'
import Users from './components/users'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.loggedUser)

  const loginFormRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBlogappUser'
    )
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setLoggedUser(user))
    }
  }, [])

  const handleLogout = () => {
    dispatch(resetLoggedUser())
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleToggle = (ref) => {
    ref.current.toggleVisibility()
  }

  return (
    <div>

      <Menu />

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

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={
          <div>
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
        } />
      </Routes>


    </div>
  )
}

export default App