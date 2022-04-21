import axios from "axios"
import { serverAddress } from "../constants"

const getData = async (path, options) => {
    try {
        return await axios.post(`${serverAddress}/graphs/${path}`, options)
    } catch(e){
        console.log(e)
    }
}

export const createGrapData = async (One, Two, flag, options) => {
    try {
        var data = []
        var resOne = (await getData(One.path, options)).data.data
        if (!Two.path) {
            return [{info: resOne, type: One.path}]
        }
        var resTwo = (await getData(Two.path, options)).data.data
        var graphInfo = {
            tickCountLine: One.tickCountLine, 
            domainLine: One.domainLine, 
            tickCountBar: One.tickCountBar, 
            domainBar: One.domainBar, 
            circleName: One.circleName, 
            squareName: Two.squareName 
        }
        if (Two.path === 'MediGraphUser') {
            resTwo.forEach(med => {
                data.push({
                    info: {
                        content: setContent(resOne.content, med.content, flag),
                        secondryType: flag,
                        graphData: combineJson(resOne, med)
                    },
                    type: graphInfo
                })
            });
        } else {
            var combineData = combineJson(resOne, resTwo)
            data.push({
                info: {
                    content: setContent(resOne.content, resTwo.content, flag),
                    secondryType: flag,
                    graphData: combineData
                },
                type: graphInfo
            })
        }
        return data
    } catch(e){
        console.log(e)
    }
}

const combineJson = (jsonOne, jsonTwo) => {
    var combineData = []
    for (let i=0; i<jsonOne.graphData.length; i++) {
        combineData.push(Object.assign({}, jsonOne.graphData[i], jsonTwo.graphData[i]))
    }
    return combineData
}

const setContent = (first, second, flag) => {
    if (flag) {
        return {
            Line: first.Line,
            Secondry: second.Line
        }
    } else {
        return {
            Line: first.Line,
            Bar: second.Bar
        }
    }
}