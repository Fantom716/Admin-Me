const initialState = {
  notifications: [],
}

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_NOTIFYS":
      return {
        ...state,
        notifications: []
      }
    case "REMOVE_NOTIFY":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notify) => notify.id !== action.payload
        ),
      };
    case "ADD_NOTIFY":
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    case "ADD_NOTIFY_FAILURE":
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    case "EDIT_NOTIFY":
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    case "EDIT_NOTIFY_FAILURE":
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    case "DELETE_NOTIFY":
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    case "DELETE_NOTIFY_FAILURE":
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    case "SUBMIT_TICKET_NOTIFY":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      }
    default:
      return state
  }
}


export default notifyReducer;