import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { serverAddress, foodQuestionsID } from '../constants'
import { InputGroup, FormControl, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCircle } from '@fortawesome/fontawesome-free-solid'
import Graph from '../components/Graph';
import axios from 'axios'
import SwitchSelector from 'react-switch-selector';

// css imports
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import '../css/Classes.css'
import Selectors from '../components/Selectors';
import DatesRange from '../components/DatesRange';

export default function Graphs() {

    const graphType = useSelector(state => state.selectors.type)
    const graphDuration = useSelector(state => state.selectors.duration)
    const graphDates = {
        start: useSelector(state => state.dates.start),
        end: useSelector(state => state.dates.end)
    }

    const [data, setData] = useState()

    const [username, setUsername] = useState()

    const [selectedDateType, setSelectedDateType] = useState();

    const getData = async (arr) => {
        var responseData = []
        for (var i=0;i<arr.length;i++) {
            var response = await axios.post(`${serverAddress}/graphs/${graphType.path}`, {
                password: 'RheumaticMonitor123!',
                username: username,
                duration: selectedDateType ? graphDates : graphDuration,
                questionID: arr[i],
            })
            if (graphType.path === 'MediGraphUser') {
                return response.data.data
            }
            responseData.push(response.data.data)
        }
        return responseData
    }

    const getGraphData = async () => {
        try {
            var responseData = await getData( graphType.path === 'FoodGraphUser' ? foodQuestionsID : [null])
            var newData = []
            responseData.forEach((graph) => {
                newData.push({
                    info: graph,
                    type: graphType
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
                <Selectors />
                <SwitchSelector 
                    options={[{label: "Fixed", value: false, selectedBackgroundColor: "#0097e6"}, {label: "Custom", value: true, selectedBackgroundColor: "#fbc531"}]} 
                    onChange={e => setSelectedDateType(e)}
                    />
                <DatesRange {...{isCustom: selectedDateType}}/>
                <Button onClick={getGraphData}>Click Me !</Button>
            </div>
            <div className='graphDiv'>
                {/* <div className='GridCol'>
                    {data && data.slice(0, 2).map((graph, index) => {return <Graph key={index} props={graph}></Graph>})}
                </div> */}
                <Container fluid>
                    { data && data.map((graph, index) => {return <Graph key={index} {...graph}></Graph>}) }
                </Container>
                {graphType && <div>
                    <h1>
                        {graphType.squareName && <><FontAwesomeIcon icon={faSquare}/> = {graphType.squareName}</>}
                        {graphType.circleName &&<><FontAwesomeIcon icon={faCircle}/> = {graphType.circleName}</>}
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
