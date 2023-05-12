const initialState = {
  isLoading: false,
  data: {},
  error: "",
  addProduct: {
    nameProduct: "",
    categoryProduct: "",
    count: "",
    countSell: "",
    dateOfSell: "",
    descriptionProduct: "",
    developer: "",
    priceProduct: "",
  },
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "ADD_PRODUCT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: "",
      };
    case "ADD_PRODUCT_FAILURE":
      return {
        ...state,
        isLoading: false,
        data: {},
        error: action.payload,
      };
    case "SET_ADD_PRODUCT":
      return {
        ...state,
        addProduct: {
          ...state.addProduct,
          [action.payload.field]: action.payload.value,
        },
      };
    case "UPDATE_PRODUCT_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: "",
      };
    case "UPDATE_PRODUCT_FAILURE":
      return {
        ...state,
        isLoading: false,
        data: {},
        error: action.payload,
      };
    case "DELETE_PRODUCT_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: "",
      };
    case "DELETE_PRODUCT_FAILURE":
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

export default productsReducer;
