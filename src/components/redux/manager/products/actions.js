export const addProductRequest = () => {
  return {
    type: "ADD_PRODUCT_REQUEST",
  };
};

export const addProductSuccess = (data) => {
  return {
    type: "ADD_PRODUCT_SUCCESS",
    payload: data,
  };
};

export const addProductFailure = (error) => {
  return {
    type: "ADD_PRODUCT_FAILURE",
    payload: error,
  };
};

export const setAddProduct = (field, value) => {
  return {
    type: "SET_ADD_PRODUCT",
    payload: {
      field,
      value,
    },
  };
};

export const updateProductRequest = () => {
  return {
    type: "UPDATE_PRODUCT_REQUEST",
  };
};

export const updateProductSuccess = (data) => {
  return {
    type: "UPDATE_PRODUCT_SUCCESS",
    payload: data,
  };
};

export const updateProductFailure = (error) => {
  return {
    type: "UPDATE_PRODUCT_FAILURE",
    payload: error,
  };
};

export const deleteProductRequest = () => {
  return {
    type: "DELETE_PRODUCT_REQUEST",
  };
};

export const deleteProductSuccess = (data) => {
  return {
    type: "DELETE_PRODUCT_SUCCESS",
    payload: data,
  };
};

export const deleteProductFailure = (error) => {
  return {
    type: "DELETE_PRODUCT_FAILURE",
    payload: error,
  };
};
