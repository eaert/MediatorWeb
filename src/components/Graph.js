import React, { useState, useEffect} from 'react'
import { Colors } from '../constants'
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

export default function Graph(props) {

    const [isLoading, setIsLoading] = useState(true)

    const [isDisplay, setIsDisplay] = useState()

    const handleLegendClick = (o) => {
        const { dataKey } = o;
        setIsDisplay({ ...isDisplay, [dataKey]: !isDisplay[o.dataKey]});
      };

    useEffect(() => {
        setIsDisplay(setDisplay(props.info))
        setIsLoading(false)
    }, [props])

    return (
        <div>
            <h1 style={{fontWeight: 'bold', fontFamily: 'cursive'}}>{props.info.title}</h1>
            <ResponsiveContainer width="100%" height={400}>
                {!isLoading && <ComposedChart className="container"
                    data={props.info.graphData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" label={{ value: "Dates", dy: 12}}/>
                    <YAxis yAxisId="left" name="VAS" type="number"  tickCount={props.type.tickCountLine} domain={props.type.domainLine} 
                    label={{ value: "VAS (0-10)", position: "insideLeft", angle: -90, dx: 15}}/>
                    <YAxis yAxisId="right" name="test" orientation="right" type="number" tickCount={2} domain={[0, 1]} 
                    label={{ value: "Yes (1) or No (0)", position: "insideLeft", angle: -90, dx: 15}}/>
                    <Tooltip />
                    <Legend iconSize={28} onClick={handleLegendClick} wrapperStyle={{marginBottom: -10}}/>
                    {props.info.content.Bar.map((bar, index) => {
                        return (<Bar key={index+props.info.content.Line.length} hide={isDisplay[bar]} yAxisId="right" legendType='square' barSize={20} dataKey={bar} fill={Colors[index]} fillOpacity={0.5} />)
                    })} 
                    {props.info.content.Line.map((line, index) => {
                        return (<Line key={index} yAxisId="left" type="monotone" strokeWidth={3} dataKey={line} connectNulls dot={{ strokeWidth: 6 }} hide={isDisplay[line]} stroke={Colors[index]} legendType='circle' />)
                    })} 
                </ComposedChart>}
            </ResponsiveContainer>
        </div>
    )
}

const setDisplay = (info) => {
    var LineDisplay = info.content.Line
    var lineOpacity = LineDisplay ? LineDisplay.reduce((a, v) => {
        a[v] = false
        return a
    }, []) : []
    if (info.secondryType) {
        var SecondryDisplay = info.content.Secondry
        var secondryOpacity = SecondryDisplay ? SecondryDisplay.reduce((a, v) => {
            a[v] = false
            return a
        }, []) : []
        return { ...lineOpacity, ...secondryOpacity }
    } else {
        var BarDisplay = info.content.Bar
        var barOpacity = BarDisplay ? BarDisplay.reduce((a, v) => {
            a[v] = false
            return a
        }, []) : []  
        return {...lineOpacity, ...barOpacity}
    }
}
