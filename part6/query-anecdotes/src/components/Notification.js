import { useContext, useEffect } from "react"
import NotificationContext from "../NotificationContext"
const Notification = () => {
  const [notificationState, notificationDispatch] = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  // if (message){
  //   message = ""

  // }
  useEffect(() => {
    if (notificationState) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notificationState]);

  if (!notificationState) return null;

  return (
    <>
    {
      notificationState === null? 
      "":
      <div style={style}>
        {notificationState}
      </div>
        

    }
    </>
  )
}

export default Notification
