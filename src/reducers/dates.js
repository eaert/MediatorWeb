const datesReducer = (state={start: new Date(), end: new Date()}, action) => {
    switch (action.type) {
        case 'SET-START':
            return {
                ...state,
                start: action.payload
            };
        case 'SET-END':
            return {
                ...state,
                end: action.payload
            };
        default:
            return state;
    }
}

export default datesReducer