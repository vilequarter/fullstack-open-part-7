import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/">Home</Link>
      <Link stype={padding} to="users">Users</Link>
    </div>
  )
}

export default Menu