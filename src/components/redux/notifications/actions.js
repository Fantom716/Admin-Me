
export const notifyButton = () => {
  return {
    type: "NOTIFY_BUTTON"
  }
}

export const clearNotifys = () => {
  return {
    type: "CLEAR_NOTIFYS"
  }
}

export const removeNotify = (id) => ({
  type: "REMOVE_NOTIFY",
  payload: id,
});

export const addNotify = (element, topic, action) => {
  const time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
  const id = Math.random().toString(36).substr(2, 9); // генерируем случайный id
  return {
    type: "ADD_NOTIFY",
    payload: {
      id,
      element,
      topic,
      icon: "/card/icons/notifys/add_client.svg",
      action,
      time,
    }
  };
}

export const editNotify = (element, topic, action) => {
  const time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
  const id = Math.random().toString(36).substr(2, 9); // генерируем случайный id
  return {
    type: "EDIT_NOTIFY",
    payload: {
      id,
      element,
      topic,
      icon: "/card/icons/notifys/edit.svg",
      action,
      time,
    }
  };
}

export const deleteNotify = (element, topic, action) => {
  const time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
  const id = Math.random().toString(36).substr(2, 9); // генерируем случайный id
  return {
    type: "DELETE_NOTIFY",
    payload: {
      id,
      element,
      topic,
      icon: "/card/icons/notifys/deleting_order.svg",
      action,
      time,
    }
  };
}