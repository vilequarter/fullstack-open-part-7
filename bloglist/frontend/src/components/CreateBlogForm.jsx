import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Form, FormField, Button } from 'semantic-ui-react'

const CreateBlogForm = ({ handleToggle }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    handleToggle()

    dispatch(createBlog({
      title: title,
      author: author,
      url: url
    }))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <>
      <h3>Create new blog</h3>

      <Form onSubmit={addBlog}>
        <FormField width={4}>
          <label>Title</label>
          <input
            placeholder='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </FormField>
        <FormField width={4}>
          <label>Author</label>
          <input
            placeholder='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </FormField>
        <FormField width={4}>
          <label>Url</label>
          <input
            placeholder='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </FormField>
        <Button primary type="submit">Create</Button>
      </Form>
    </>
  )
}

export default CreateBlogForm