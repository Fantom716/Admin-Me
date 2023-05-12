const initialState = {
  clients: [],
  error: null,
  notification: false,
  data: [],
  originalClient: null,
  addClient: 0,
  updateClient: 0
}

function clientReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CLIENT_SUCCESS":
      return {
        ...state,
        clients: [...state.clients, action.payload],
        error: null,
        notification: true
      };
    case "ADD_CLIENT_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "UPDATE_CLIENT_REQUEST":
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case "INCREMENT_UPDATE_CLIENT":
      return {
        ...state,
        updateClient: state.updateClient + 1
      };
    case "UPDATE_CLIENT_DATA":
      console.log(state)
      const { index, field, value } = action.payload;
      const updatedData = [...state.data];
      updatedData[index] = {
        ...updatedData[index],
        [field]: value,
      };
      console.log(updatedData)
      return {
        ...state,
        data: updatedData,
        originalClient: updatedData[index],
      };
    case "UPDATE_CLIENT_SUCCESS":
      const updatedClientIndex = state.clients.findIndex(client => client.id === action.payload.id);
      const updatedClients = [...state.clients];
      updatedClients[updatedClientIndex] = action.payload;
      console.log(updatedClients)
      return {
        ...state,
        isFetching: false,
        clients: updatedClients,
        error: null,
      };
    case "UPDATE_CLIENT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case "INCREMENT_ADD_CLIENT":
      return {
        ...state,
        addClient: state.addClient + 1
      };
    default:
      return state;
  }
}

export default clientReducer;