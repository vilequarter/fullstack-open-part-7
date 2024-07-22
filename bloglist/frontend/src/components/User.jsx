const User = ({ user }) => {
  if(!user || user === undefined) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Blogs created</h4>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User