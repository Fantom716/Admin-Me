export function addClientSuccess(client) {
  return {
    type: "ADD_CLIENT_SUCCESS",
    payload: client
  }
}

export function addClientFailure(error) {
  return {
    type: "ADD_CLIENT_FAILURE",
    payload: error
  }
}

export const updateClientRequest = (client) => ({
  type: "UPDATE_CLIENT_REQUEST",
  payload: client,
});

export const updateClientData = (index, field, value) => ({
  type: "UPDATE_CLIENT_DATA",
  payload: { index, field, value },
});

export const incrementUpdateClient = () => ({
  type: "INCREMENT_UPDATE_CLIENT"
})

export const incrementAddClient = () => {
  return {
    type: "INCREMENT_ADD_CLIENT"
  }
}