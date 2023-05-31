const initialState = {
  users: []
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      const existingUserIndex = state.users.findIndex(user => user.id === action.payload.id);
      if (existingUserIndex !== -1) {
        return state;
      }
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      }
    default:
      return state;
  }
};


export default authReducer;