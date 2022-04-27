
const setStart = (date) => {
    return {
        type: 'SET_START',
        payload: date
    }
}
const setEnd = (date) => {
    return {
        type: 'SET_END',
        payload: date
    }
}

const setType = (type) => {
    return {
        type: 'SET_TYPE',
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

const setParticipant = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

exports.setStart = setStart
exports.setEnd = setEnd
exports.setType = setType
exports.setDuration = setDuration
exports.setFood = setFood
exports.setParticipant = setParticipant