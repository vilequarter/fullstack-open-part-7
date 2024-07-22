import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  const background = {
    backgroundColor: 'lightgray'
  }

  return (
    <div style={background}>
      <Link style={padding} to="/">Blogs</Link>
      <Link style={padding} to="users">Users</Link>
    </div>
  )
}

export default Menu