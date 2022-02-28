export const Action = {
  ADD_LIST: "add-list",
  SET_LIST: "set-list",
}

export const listsReducer = (state, {action, payload}) => {

  switch (action) {
      case Action.ADD_LIST: {
        return [...state, payload]
      }

      case Action.SET_LIST: {
        return payload;
      }

      default:
        return state;
  }
}
