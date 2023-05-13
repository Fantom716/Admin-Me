export const isActiveMenu = (isActive) => {
  return {
    type: "IS_ACTIVE_MENU",
    payload: {
      isActive: isActive
    }
  }
}