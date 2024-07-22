import CreateCommentForm from './CreateCommentForm'

const Comments = ({ blog }) => {
  return(
    <div>
      <h4>comments</h4>
      <CreateCommentForm blog={blog}/>
      {blog ?
        <ul>
          {blog.comments.map(comment => {
            return(
              <li key={comment.id}>{comment.content}</li>
            )
          })}
        </ul>
        : null
      }
    </div>
  )
}

export default Comments