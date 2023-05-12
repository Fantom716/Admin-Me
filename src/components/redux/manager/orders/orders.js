const initialState = {
  orders: [],
  error: null,
  notification: false,
  data: [],
  originalOrder: null,
  deleteClick: false,
  responseOrder: null
}

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ORDER_SUCCESS":
      return {
        ...state,
        orders: [...state.orders, action.payload],
        error: null,
        notification: true
      };
    case "ADD_ORDER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "UPDATE_ORDER_REQUEST":
      return {
        ...state,
        isFetching: true,
        error: null,
      };
      case 'DELETE_ORDER_REQUEST':
        return {
          ...state,
          isLoading: true,
        }
      case 'DELETE_ORDER_SUCCESS':
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        }
      case 'DELETE_ORDER_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        }
    default:
      return state;
  }
}

export default orderReducer;