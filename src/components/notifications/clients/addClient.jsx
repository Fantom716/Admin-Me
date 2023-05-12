import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AddClientNotification(props) {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const client = selector.clients.clients;
  const [length, setLength] = useState(client.length);
  
  useEffect(() => {
    setLength(client.length);
  }, [selector.clients.addClient]);

  const notificationText = "Новый пользователь добавлен";

  return (
    <>
      {Array.from({ length }, (_, index) => (
        <div key={index} className="notification" style={{marginBottom: "10px", display: "flex", alignItems: "center"}}>
          <img style={{marginRight: "10px", width: "50px"}} src="/notification/action/add.svg" alt="Добавление пользователя" />
          <p>{notificationText}</p>
        </div>
      ))}
    </>
  );
}

export default AddClientNotification;