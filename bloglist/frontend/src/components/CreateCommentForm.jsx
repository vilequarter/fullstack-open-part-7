import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

const CreateCommentForm = ({ blog }) => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const newId = () => {
    return Math.floor(Math.random() * 10000000)
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(createComment(blog, {
      content: content,
      id: newId()
    }))

    setContent('')
  }

  return (
    <form onSubmit={addComment}>
      <input
        type="text"
        value={content}
        name="Comment"
        onChange={({ target }) => setContent(target.value)}
        id="commentInput"
        placeholder="add comment..."
      />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CreateCommentForm