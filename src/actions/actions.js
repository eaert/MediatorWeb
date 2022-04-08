
const setStart = (date) => {
    return {
        type: 'SET-START',
        payload: date
    }
}
const setEnd = (date) => {
    return {
        type: 'SET-END',
        payload: date
    }
}

const setType = (type) => {
    return {
        type: 'SET-TYPE',
        payload: type
    }
}

const setDuration = (duration) => {
    return {
        type: 'SET_DURATION',
        payload: duration
    }
}

const setFood = (food) => {
    return {
        type: 'SET_FOOD',
        payload: food
    }
}

exports.setStart = setStart
exports.setEnd = setEnd
exports.setType = setType
exports.setDuration = setDuration
exports.setFood = setFood