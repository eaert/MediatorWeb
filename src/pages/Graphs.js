import React, { useState } from 'react'
import { serverAddress, optionsDuration, foodQuestionsID } from '../constants'
import { InputGroup, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import Select from "react-select";
import 'bootstrap/dist/css/bootstrap.min.css';
import Graph from '../components/Graph';
import '../css/Classes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCircle } from '@fortawesome/fontawesome-free-solid'
import axios from 'axios'

export default function Graphs() {
    const [data, setData] = useState()

    const [username, setUsername] = useState()

    const [selectedType, setSelectedType] = useState();

    const [selectedDuration, setSelectedDuration] = useState();

    // const [selectedExercise, setSelectedExercise] = useState();

    // const [selectedMedications, setSelectedMedications] = useState();

    const optionsType = [
        { value: {path: 'PainGraphUser', tickCountLine: 11, domainLine:[0, 10], circleName: "Pain Level VAS (0-10)", squareName: null }, label: 'Pain'},
        { value: {path: 'VASGraphUser', tickCountLine: 11, domainLine:[0, 10], circleName: "VAS (0-10)", squareName: null }, label: 'VAS'},
        { value: {path: 'FoodGraphUser', tickCountLine: 2, domainLine:[0, 1], circleName: null, squareName: "Food and beverage consumption" }, label: 'Food'},
        { value: {path: 'ExerciseGraphUser', tickCountLine: 11, domainLine:[0, 300], tickCountBar: 2, domainBar:[0, 1], circleName: "Exercise duration(mins)", squareName: "Exercise performed" }, label: 'Exercise'},
        { value: {path: 'MediGraphUser', tickCountLine: 11, domainLine:[0, 300], tickCountBar: 2, domainBar:[0, 1], circleName: "Medication Dose", squareName: "Taken Medication" }, label: 'Medications'},
    ]

    const getData = async (arr) => {
        var responseData = []
        for (var i=0;i<arr.length;i++) {
            var response = await axios.post(`${serverAddress}/graphs/${selectedType.path}`, {
                password: 'RheumaticMonitor123!',
                username: username,
                duration: selectedDuration,
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
                <Select options={optionsDuration} isSearchable={true} onChange={e => setSelectedDuration(e.value)}/>
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
