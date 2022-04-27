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
        if (!resOne) return []
        if (!Two || !flag) {
            if (One.path === 'MediGraphUser') {
                resOne.forEach(med => {
                    data.push({
                        info: {
                            content: med.content,
                            secondryType: flag,
                            graphData: med.graphData
                        },
                        type: One
                    })
                });
                return data
            }
            return [{info: resOne, type: One}]
        }
        var resTwo = (await getData(Two.path, options)).data.data
        if (!resTwo) return []
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
                        graphData: combineJson(resOne, med),
                        title: `${resOne.title} & ${med.title}`
                    },
                    type: graphInfo,

                })
            });
        } else {
            var combineData = combineJson(resOne, resTwo)
            data.push({
                info: {
                    content: setContent(resOne.content, resTwo.content, flag),
                    secondryType: flag,
                    graphData: combineData,
                    title: `${resOne.title} & ${resTwo.title}`
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
            // Secondry: second.Line
            Bar: second.Bar
        }
    } else {
        return {
            Line: first.Line,
            Bar: second.Bar
        }
    }
}