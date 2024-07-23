import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, MenuItem, Button, Segment } from 'semantic-ui-react'

const Header = ({ logout, login }) => {
  const user = useSelector(state => state.loggedUser)

  return (
    <Menu>
      <MenuItem as={Link} to="/" name="blogs">Blogs</MenuItem>
      <MenuItem as={Link} to="users" name="users">Users</MenuItem>
      <MenuItem position='right'>
        {user ?
          <Segment size='mini'>
            <span style={{ paddingRight: 5 }}>{user.name} logged in</span>
            <Button size='mini' onClick={logout}>Logout</Button>
          </Segment>
          : ''}
      </MenuItem>
    </Menu>
  )
}

export default Header