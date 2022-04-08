var initState = {
    type: null,
    duration: null,
    food: null,
    exercise: null,
    medications: null
}

const selectorsReducer = (state=initState, action) => {
    switch (action.type) {
        case 'SET_TYPE':
            return {
                ...state, 
                type: action.payload
            };
        case 'SET_DURATION':
            return {
                ...state,
                duration: action.payload
            };
        case 'SET_FOOD':
            return {
                ...state,
                food: action.payload
            };
        case 'SET_EXERCISE':
            return {
                ...state,
                exercise: action.payload
            }
        case 'SET_MEDICATIONS':
            return {
                ...state,
                medications: action.payload
            }
        default:
            return state;
    }
}

export default selectorsReducer