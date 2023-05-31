export const cleanedPhoneNumber = (phoneNumber) => {
  if (phoneNumber) {
    return phoneNumber.replace(/\D/g, "");
  }
}

export const actions = {
  success: {
    add: "добавлен",
    edit: "изменен",
    delete: "удален"
  },
  failure: {
    add: "добавления",
    edit: "изменения",
    delete: "удаления"
  }
}

export const idUser = localStorage.getItem("idUser");