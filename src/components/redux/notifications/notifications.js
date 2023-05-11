import { notifyButton } from "./actions"

const initialState = {
  notifications: [],
  notifyButton: false
}

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NOTIFY_BUTTON":
      return {
        ...state,
        notifyButton: !notifyButton
      }
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
    case "EDIT_NOTIFY":
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    case "DELETE_NOTIFY":
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    default:
      return state
  }
}


export default notifyReducer;