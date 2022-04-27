import React from 'react'
import DatePicker from "react-datepicker";
import Select from "react-select";

import { useDispatch, useSelector } from 'react-redux';
import { setStart, setEnd, setDuration } from '../actions/actions';

import { optionsDuration } from '../constants'


export default function DatesRange(params) {

    const dispatch = useDispatch()

    const startDate = useSelector(state => state.dates.start)
    const endDate = useSelector(state => state.dates.end)

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
                    dispatch(setEnd(date))
                }
            } else {
                dispatch(setStart(date))
                console.log(startDate)
            }
        }
    }

    return (
        <div>
            {params.isCustom ? 
                <div>
                    <div style={{display: 'flex'}}>
                        <p style={styles.text}>Start</p>
                        <DatePicker className='dater' selected={startDate} onChange={(date) => setDate(date, 'start')} />
                    </div>
                    <div style={{display: 'flex'}}>
                        <p style={styles.text}>End</p>
                        <DatePicker className='dater' selected={endDate} onChange={(date) => setDate(date, 'end')} />
                    </div>
                </div> :
                <Select options={optionsDuration} isSearchable={true} onChange={e => dispatch(setDuration(e.value))}/>
            }
        </div>
    )
}

const styles = {
    text: {
        fontWeight: 'bold',
        fontSize: '20px',
        paddingLeft: '20%'
    }
}
