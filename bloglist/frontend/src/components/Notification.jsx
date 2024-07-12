import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if(notification === null){
    return null
  }

  //adjust className for success/failure
  return (
    <div className={notification.type}>
      {notification.content}
    </div>
  )
}

export default Notification