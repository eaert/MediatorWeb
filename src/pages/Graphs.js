import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { foodQuestionsID, optionsType, GraphTypesSplit } from '../constants';
import { InputGroup, FormControl, Button, Container, Form } from 'react-bootstrap';
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCircle } from '@fortawesome/fontawesome-free-solid';
import Graph from '../components/Graph';
import SwitchSelector from 'react-switch-selector';

// css imports
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import '../css/Classes.css';
import DatesRange from '../components/DatesRange';
import { createGrapData } from '../utils/GetData';



export default function Graphs() {

    const participant = useSelector(state => state.participant)
    const graphDuration = useSelector(state => state.selectors.duration)
    const graphDates = {
        start: useSelector(state => state.dates.start),
        end: useSelector(state => state.dates.end)
    }

    const [data, setData] = useState()

    const [username, setUsername] = useState()

    const [graphType, setGraphType] = useState({One: null, Two: null})

    const [secondryType, setSecondryType] = useState(false)

    const [selectedDateType, setSelectedDateType] = useState();

    const getGraphData = async () => {
        try {
            if (!username && !participant.user) {
                alert('Must enter a Username.')
                return
            }
            if (!graphType.One) {
                alert('Must pick First graph type.')
                return
            }
            if (secondryType) {
                if (!GraphTypesSplit.Line.includes(graphType.One.path)) {
                    alert('In Intervine Graphs, First Graph must be of Line type.')
                    return
                }
                if (!GraphTypesSplit.Bar.includes(graphType.Two.path)) {
                    alert('In Intervine Graphs, Second Graph must be of Bar type.')
                    return
                }
            }
            var newData = []
            var arr = (graphType.One && graphType.One.path === 'FoodGraphUser') || (graphType.Two && graphType.Two.path === 'FoodGraphUser') ? foodQuestionsID : [0]
            for (let i=0; i<arr.length; i++) {
                var options = {
                    password: 'RheumaticMonitor123!',
                    username: participant.user ? participant.user : username,
                    duration: selectedDateType ? graphDates : graphDuration,
                    questionID: arr[i],
                }
                var graph = await createGrapData(graphType.One, graphType.Two, secondryType, options)
                newData.push(...graph)
            }
            setData(null)
            if (newData.length === 0) alert('No Data to Graph.') 
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
                        value={participant.user ? participant.user : null}
                        disabled={participant.user ? true : false}
                        />  
                </InputGroup>
                <div style={styles.padding}>
                    <Select key={'First'} options={optionsType} isSearchable={true} onChange={e => setGraphType({...graphType, One: {...e.value}})}/>
                    <Form.Check
                        inline
                        label="Secondry Graph (Bars)"
                        name="group1"
                        type="checkbox"
                        id={`inline-checkbox-1`}
                        onChange={e => setSecondryType(e.target.checked)}
                    />
                    <Select key={'Secondry'} style={{width:'100%', paddingLeft: '10px'}} options={optionsType} isSearchable={true} isDisabled={!secondryType} onChange={e => setGraphType({...graphType, Two: {...e.value}})}/>
                </div>
                <SwitchSelector 
                    options={[{label: "Fixed", value: false, selectedBackgroundColor: "#0097e6"}, {label: "Set Date", value: true, selectedBackgroundColor: "#fbc531"}]} 
                    onChange={e => setSelectedDateType(e)}
                    />
                <DatesRange style={styles.padding} {...{isCustom: selectedDateType}}/>
                <Button onClick={getGraphData}>Click Me !</Button>
            </div>
            <div className='graphDiv'>
                <Container fluid>
                    { data && data.map((graph, index) => {return <div>
                            <Graph key={index} {...graph}></Graph>
                            <div>
                                <h1>
                                    {graph.type.squareName && <><FontAwesomeIcon key={index} icon={faSquare}/> = {graph.type.squareName}</>}
                                    {graph.type.circleName &&<><FontAwesomeIcon key={index+4} icon={faCircle}/> = {graph.type.circleName}</>}
                                </h1>
                            </div>
                        </div>}) }
                </Container>
            </div>
        </div>
    )
}

const styles = {
    padding: {paddingTop: '10px', paddingBottom: '10px'}
}
