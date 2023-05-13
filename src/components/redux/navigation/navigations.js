const initialState = {
  active: false
}

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_ACTIVE_MENU":
      return {
        ...state,
        active: !state.active
      }
    default:
      return state;
  }
}

export default navReducer;