import React, { useState } from 'react'
import { serverAddress, optionsDuration, foodQuestionsID } from '../constants'
import { InputGroup, FormControl, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCircle } from '@fortawesome/fontawesome-free-solid'
import Select from "react-select";
import Graph from '../components/Graph';
import axios from 'axios'
import SwitchSelector from 'react-switch-selector';
import DatePicker from "react-datepicker";

// css imports
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import '../css/Classes.css'

export default function Graphs() {
    const [data, setData] = useState()

    const [username, setUsername] = useState()

    const [selectedType, setSelectedType] = useState();

    const [selectedDuration, setSelectedDuration] = useState();

    const [selectedDateType, setSelectedDateType] = useState();

    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState();

    const optionsType = [
        { value: {path: 'PainGraphUser', tickCountLine: 11, domainLine:[0, 10], circleName: "Pain Level VAS (0-10)", squareName: null }, label: 'Pain'},
        { value: {path: 'VASGraphUser', tickCountLine: 11, domainLine:[0, 10], circleName: "VAS (0-10)", squareName: null }, label: 'VAS'},
        { value: {path: 'FoodGraphUser', tickCountLine: 2, domainLine:[0, 1], circleName: null, squareName: "Food and beverage consumption" }, label: 'Food'},
        { value: {path: 'ExerciseGraphUser', tickCountLine: 11, domainLine:[0, 300], tickCountBar: 2, domainBar:[0, 1], circleName: "Exercise duration(mins)", squareName: "Exercise performed" }, label: 'Exercise'},
        { value: {path: 'MediGraphUser', tickCountLine: 11, domainLine:[0, 300], tickCountBar: 2, domainBar:[0, 1], circleName: "Medication Dose", squareName: "Taken Medication" }, label: 'Medications'},
    ]

    const setDate = (date, type) => {
        if (date > new Date()) {
            alert('Cannot chose future Date.')
        } else {
            if (type === 'end') {
                if (!startDate) {
                    alert('Please chose Start Date first.')
                } else if (date < startDate) {
                    alert('End date must be bigger then start date')
                } else {
                    setEndDate(date)
                }
            } else {
                setStartDate(date)
            }
        }
    }

    const getData = async (arr) => {
        var responseData = []
        for (var i=0;i<arr.length;i++) {
            var response = await axios.post(`${serverAddress}/graphs/${selectedType.path}`, {
                password: 'RheumaticMonitor123!',
                username: username,
                duration: selectedDateType ? {start: startDate, end: endDate} : selectedDuration,
                questionID: arr[i],
            })
            if (selectedType.path === 'MediGraphUser') {
                return response.data.data
            }
            responseData.push(response.data.data)
        }
        return responseData
    }

    const getGraphData = async () => {
        try {
            if (selectedDateType && (!startDate || !endDate)) {
                alert('Must have Start and End Date on custom')
            }
            var responseData = await getData( selectedType.path === 'FoodGraphUser' ? foodQuestionsID : [null])
            var newData = []
            responseData.forEach((graph) => {
                newData.push({
                    info: graph,
                    type: selectedType
                })
            })
            setData(null)
            setData([...newData])

        } catch (error) {
            console.log(error)
        }
    }

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
                {/* { selectedType && selectedType.path === 'FoodGraphUser' && <Select options={optionsExercise} onChange={e => setSelectedExercise(e.value)}/>}
                { selectedType && selectedType.path === 'MediGraphUser' && <Select options={optionsMedications} onChange={e => setSelectedMedications(e.value)}/>} */}
                <SwitchSelector 
                    options={[{label: "Fixed", value: false, selectedBackgroundColor: "#0097e6"}, {label: "Custom", value: true, selectedBackgroundColor: "#fbc531"}]} 
                    onChange={e => setSelectedDateType(e)}
                    />
                {selectedDateType ? 
                    <div>
                        <DatePicker className='dater' selected={startDate} onChange={(date) => setDate(date, 'start')} /> 
                        <DatePicker className='dater' selected={endDate} onChange={(date) => setDate(date, 'end')} /> 
                    </div> : 
                    <Select options={optionsDuration} isSearchable={true} onChange={e => setSelectedDuration(e.value)}/>
                }
                <Button onClick={getGraphData}>Click Me !</Button>
            </div>
            <div className='graphDiv'>
                {/* <div className='GridCol'>
                    {data && data.slice(0, 2).map((graph, index) => {return <Graph key={index} props={graph}></Graph>})}
                </div> */}
                <Container fluid>
                    { data && data.map((graph, index) => {return <Graph key={index} props={graph}></Graph>}) }
                </Container>
                {selectedType && <div>
                    <h1>
                        {selectedType.squareName && <><FontAwesomeIcon icon={faSquare}/> = {selectedType.squareName}</>}
                        {selectedType.circleName &&<><FontAwesomeIcon icon={faCircle}/> = {selectedType.circleName}</>}
                    </h1>
                </div>}
            </div>
        </div>
    )
}

// const styles = {
//     graphDiv: {
//         paddingLeft: 50,
//         paddingTop: 100
//     },
//     GridCol: {
//         display: flex,
//         flex-direction: row
//     }
// }
