const initialState = {
  text: ""
}

const ticketReducer = (state = initialState, action) =>  {
  switch (action.type) {
    case "SUBMIT_TICKET":
      return {
        text: "Тикет успешно отправлен"
      }

    default:
      return state;
  }
}

export default ticketReducer;