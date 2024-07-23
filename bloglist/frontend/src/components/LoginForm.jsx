import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loggedUserReducer'
import { Button, Form, FormField, Header } from 'semantic-ui-react'

const LoginForm = ({ handleToggle }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(login({ username, password }))

    setUsername('')
    setPassword('')
    handleToggle()
  }

  return(
    <div>
      <Header as='h2'>Log in to application</Header>
      <Form onSubmit={handleLogin} size='small'>
        <FormField width={4}>
          <label>username</label>
          <input
            placeholder='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </FormField>
        <FormField width={4}>
          <label>password</label>
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </FormField>
        <Button primary type="submit">login</Button>
      </Form>
    </div>
  )
}

export default LoginForm