import { READ_NOTIFICATION_D } from "./actions";

const initialState = {
  read: true,
};

const desktopReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_NOTIFICATION_D:
      return {
        ...state,
        read: false,
      };
    default:
      return state;
  }
};

export default desktopReducer;
