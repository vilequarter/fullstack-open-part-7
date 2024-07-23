import { useSelector } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if(notification === null){
    return null
  }

  return (
    <Message
      info={notification.type === 'success' ? true : false}
      negative={notification.type === 'error' ? true : false}
    >
      {notification.content}
    </Message>
  )
}

export default Notification