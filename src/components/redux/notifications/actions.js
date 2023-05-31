import moment from "moment/moment";

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

export const addNotify = (element, topic, action, state, userId) => {
  const time = moment().format("HH:mm:ss");
  const id = Math.random().toString(36).substr(2, 9);
  const user = state.users.users.find((user) => user.id === userId)
  console.log("usus: " + user)
  return {
    type: "ADD_NOTIFY",
    payload: {
      id,
      element,
      topic,
      icon: "/card/icons/notifys/add_client.svg",
      action,
      time,
      user
    }
  };
}

export const addNotifyFailure = (topic, action, state, userId, error) => {
  const time = moment().format("HH:mm:ss");
  const id = Math.random().toString(36).substr(2, 9);
  const user = state.users.users.find((user) => user.id === userId)
  return {
    type: "ADD_NOTIFY_FAILURE",
    payload: {
      id,
      topic,
      icon: "/card/icons/notifys/add_client.svg",
      action,
      time,
      user,
      error
    }
  }
}

export const editNotify = (element, topic, action, state, userId) => {
  const time = moment().format("HH:mm:ss");
  const id = Math.random().toString(36).substr(2, 9);
  const user = state.users.users.find((user) => user.id === userId)
  return {
    type: "EDIT_NOTIFY",
    payload: {
      id,
      element,
      topic,
      icon: "/card/icons/notifys/edit.svg",
      action,
      time,
      user
    }
  };
}

export const editNotifyFailure = (element, topic, action, state, userId, error) => {
  const time = moment().format("HH:mm:ss");
  const id = Math.random().toString(36).substr(2, 9);
  const user = state.users.users.find((user) => user.id === userId)
  return {
    type: "EDIT_NOTIFY_FAILURE",
    payload: {
      id,
      element,
      topic,
      icon: "/card/icons/notifys/edit.svg",
      action,
      time,
      user,
      error
    }
  };
}

export const deleteNotify = (element, topic, action, state, userId) => {
  const time = moment().format("HH:mm:ss");
  const id = Math.random().toString(36).substr(2, 9);
  console.log(state)
  const user = state.users.users.find((user) => user.id === userId)
  return {
    type: "DELETE_NOTIFY",
    payload: {
      id,
      element,
      topic,
      icon: "/card/icons/notifys/deleting_order.svg",
      action,
      time,
      user
    }
  };
}

export const deleteNotifyFailure = (element, topic, action, state, userId, error) => {
  const time = moment().format("HH:mm:ss");
  const id = Math.random().toString(36).substr(2, 9);
  const user = state.users.users.find((user) => user.id === userId)
  return {
    type: "DELETE_NOTIFY_FAILURE",
    payload: {
      id,
      element,
      topic,
      icon: "/card/icons/notifys/deleting_order.svg",
      action,
      time,
      user,
      error
    }
  };
}

export const sumbitTicketNotify = (userId, state) => {
  const time = moment().format("HH:mm:ss");
  const id = Math.random().toString(36).substr(2, 9);
  console.log(id)
  const user = state.users.users.find((user) => user.id === userId)
  return {
    type: "SUBMIT_TICKET_NOTIFY",
    payload: {
      id,
      text: "Тикет успешно отправлен. Ожидайте ответа",
      icon: "/card/icons/notifys/ticket.svg",
      time,
      user
    }
  }
}