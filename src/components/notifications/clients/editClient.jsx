import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function EditClientNotification(props) {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch()

  const [notificationCount, setNotificationCount] = useState(selector.clients.updateClient);

  useEffect(() => {
    if (selector.clients.updateClient > 0) {
      setNotificationCount(notificationCount + 1);
    }
  }, [selector.clients.updateClient]);

  const notificationText = "Пользователь отредактирован";

  return (
    <>
      {Array.from({ length: notificationCount }, (_, index) => (
        <div key={index} className="notification" style={{marginBottom: "10px", display: "flex", alignItems: "center"}}>
          <img style={{marginRight: "10px", width: "50px"}} src="/notification/action/edit.svg" alt="Редактирование пользователя" />
          <p>{notificationText}</p>
        </div>
      ))}
    </>
  );
}

export default EditClientNotification;