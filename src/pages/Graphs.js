import React, { useEffect, useState } from 'react'
import { serverAddress, Colors } from '../constants'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Select from "react-select";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    LineChart,
    ComposedChart,
    ScatterChart,
    Line,
    Bar,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
import axios from 'axios'
import moment from 'moment'

export default function Graphs() {
    const [data, setData] = useState()

    const [isDisplay, setIsDisplay] = useState()

    const [username, setUsername] = useState()

    const [selectedType, setSelectedType] = useState();

    const [selectedDuration, setSelectedDuration] = useState();

    const [selectedZone, setSelectedZone] = useState();

    const optionsType = [
        { value: {path: 'PainGraphUser', tickCountLine: 11, domainLine:[0, 10]}, label: 'Pain' },
        { value: {path: 'VASGraphUser', tickCountLine: 11, domainLine:[0, 10]}, label: 'VAS' },
        { value: {path: 'FoodGraphUser', tickCountLine: 2, domainLine:[0, 1]}, label: 'Food' },
        { value: {path: 'ExerciseGraphUser', tickCountLine: 11, domainLine:[0, 300], tickCountBar: 2, domainBar:[0, 1]}, label: 'Exercise' },
    ]

    const optionsDuration = [
        { value: 7, label: 'Week' },
        { value: 31, label: 'Month' },
        { value: 93, label: 'Three Month' },
        { value: 365, label: 'Year' },
    ]

    const optionsZone = [
        { value: 26, label: 'Breakfast'},
        { value: 27, label: 'Lunch'},
        { value: 28, label: 'Dinner'},
        { value: 25, label: 'Night Meal'},
    ]

    const getData = async () => {
        try {
            var response = await axios.post(`${serverAddress}/graphs/${selectedType.path}`, {
                password: 'RheumaticMonitor123!',
                username: username,
                duration: selectedDuration,
                questionID: selectedType.path !== 'ExerciseGraphUser' ? selectedZone : 29,
            })
            var lineOpacity = response.data.data.content.Line ? response.data.data.content.Line.reduce((a, v) => {
                a[v] = false
                return a
            }, []) : []
            var barOpacity = response.data.data.content.Bar ? response.data.data.content.Bar.reduce((a, v) => {
                a[v] = false
                return a
            }, []) : []
            setIsDisplay({...lineOpacity, ...barOpacity})
            setData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLegendClick = (o) => {
        const { dataKey } = o;
        setIsDisplay({ ...isDisplay, [dataKey]: !isDisplay[o.dataKey]});
      };

    return (
        <div>
            <div>Graphs</div>
            <div className="container" style={{width: '25%'}}>
                <InputGroup style={{width: '100%'}} onChange={e => setUsername(e.target.value)}>
                    <InputGroup.Text id="basic-addon1"><b>Username</b></InputGroup.Text>
                    <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />  
                </InputGroup>
                <Select options={optionsType} isSearchable={true} onChange={e => setSelectedType(e.value)}/>
                <Select options={optionsDuration} isSearchable={true} onChange={e => setSelectedDuration(e.value)}/>
                { selectedType && selectedType.path === 'FoodGraphUser' && <Select options={optionsZone} onChange={e => setSelectedZone(e.value)}/>}
                <Button onClick={getData}>Click Me !</Button>
            </div>
            <div style={styles.graphDiv}>
                {data &&
                <ComposedChart className="container"
                    width={1000}
                    height={400}
                    data={data.graphData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
        
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" name="VAS" type="number"  tickCount={selectedType.tickCountLine} domain={selectedType.domainLine}/>
                    <YAxis yAxisId="right" name="test" orientation="right" type="number" tickCount={2} domain={[0,1]}/>
                    <Tooltip />
                    <Legend iconSize={28} onClick={handleLegendClick} />
                    {data.content.Bar.map((bar, index) => {
                        return (<Bar key={index+data.content.Line.length} hide={isDisplay[bar]} yAxisId="right" legendType='square' barSize={20} dataKey={bar} fill={Colors[index]} fillOpacity={0.5} />)
                    })} 
                    {data.content.Line.map((line, index) => {
                        return (<Line key={index} yAxisId="left" type="monotone" strokeWidth={5} dataKey={line} hide={isDisplay[line]} stroke={Colors[index]} />)
                    })} 
                </ComposedChart>}
            </div>
        </div>
    )
}

const styles = {
    graphDiv: {
        paddingLeft: 50,
        paddingTop: 100
    }
}
