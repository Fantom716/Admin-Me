const initialState = {
  isLoading: false,
  data: {},
  error: "",
};

const partnersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_PARTNER_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "DELETE_PARTNER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: "",
      };
    case "DELETE_PARTNER_FAILURE":
      return {
        ...state,
        isLoading: false,
        data: {},
        error: action.payload,
      };

    case "UPDATE_PARTNER_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_PARTNER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: "",
      };
    case "UPDATE_PARTNER_FAILURE":
      return {
        ...state,
        isLoading: false,
        data: {},
        error: action.payload,
      };
    case "ADD_PARTNER_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "ADD_PARTNER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: "",
      };
    case "ADD_PARTNER_FAILURE":
      return {
        ...state,
        isLoading: false,
        data: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default partnersReducer;