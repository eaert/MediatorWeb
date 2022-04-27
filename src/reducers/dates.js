const datesReducer = (state={start: new Date().setDate(new Date().getDate()-1), end: new Date()}, action) => {
    switch (action.type) {
        case 'SET_START':
            return {
                ...state,
                start: action.payload
            };
        case 'SET_END':
            return {
                ...state,
                end: action.payload
            };
        default:
            return state;
    }
}

export default datesReducer