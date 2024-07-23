import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react'

const BlogList = () => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  return(
    <div style={{ paddingLeft: 10 }}>
      <Table striped compact collapsing>
        <TableHeader>
          <TableRow>
            <TableHeaderCell width={5}>Title</TableHeaderCell>
            <TableHeaderCell width={5}>Author</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map(blog => {
            if(blog){
              return(
                <TableRow key={blog.id}>
                  <TableCell><Link to={`blogs/${blog.id}`}>{blog.title}</Link></TableCell>
                  <TableCell>{blog.author}</TableCell>
                </TableRow>
              )
            }
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default BlogList