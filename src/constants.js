export const serverAddress=`https://rps.ise.bgu.ac.il/njsw20`

export const Colors = ['purple', '#A52A2A', '#8A2BE2', '#5F9EA0', '#7FFF00', 
                        '#006400', '#8B008B', '#696969', '#DAA520', '#191970']

export const optionsType = [
    { value: {path: 'PainGraphUser', tickCountLine: 11, domainLine:[0, 10], circleName: "Pain Level VAS (0-10)", squareName: null }, label: 'Pain'},
    { value: {path: 'VASGraphUser', tickCountLine: 11, domainLine:[0, 10], circleName: "VAS (0-10)", squareName: null }, label: 'VAS'},
    { value: {path: 'FoodGraphUser', tickCountLine: 2, domainLine:[0, 1], circleName: null, squareName: "Food and beverage consumption" }, label: 'Food'},
    { value: {path: 'ExerciseGraphUser', tickCountLine: 11, domainLine:[0, 300], tickCountBar: 2, domainBar:[0, 1], circleName: "Exercise duration(mins)", squareName: "Exercise performed" }, label: 'Exercise'},
    { value: {path: 'MediGraphUser', tickCountLine: 11, domainLine:[0, 300], tickCountBar: 2, domainBar:[0, 1], circleName: "Medication Dose", squareName: "Taken Medication" }, label: 'Medications'},
]

export const optionsDuration = [
    { value: 7, label: 'Week' },
    { value: 31, label: 'Month' },
    { value: 93, label: 'Three Month' },
    { value: 365, label: 'Year' },
]

export const optionsZone = [
    { value: 26, label: 'Breakfast'},
    { value: 27, label: 'Lunch'},
    { value: 28, label: 'Dinner'},
    { value: 25, label: 'Night Meal'}
]

export const foodQuestionsID = [
    25, 26, 27, 28
]

export const secondryTypeGraph = [
    { value: false, label: 'Bar'},
    { value: true, label: 'Line'},
]