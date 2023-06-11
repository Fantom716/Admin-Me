export const submitTicket = () => {
  return {
    type: 'SUBMIT_TICKET'
  }
}

export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    payload: user
  }
}

export const removeUser = (user) => {
  return {
    type: 'DELETE_USER',
    payload: user
  }
}