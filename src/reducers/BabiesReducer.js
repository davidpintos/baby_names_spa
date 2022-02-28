export const Action = {
    ADD_BABY: 'add-baby',
    SET_LIST: 'set-list'
}

export const babiesReducer = (state, {action, payload}) => {
    switch (action) {
        case Action.ADD_BABY: {
            return [...state, payload]
        }
        case Action.SET_LIST: {
            return payload;
          }
        default:
            return state;
    }
}
