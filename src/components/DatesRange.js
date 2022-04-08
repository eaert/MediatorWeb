import React from 'react'
import DatePicker from "react-datepicker";
import Select from "react-select";

import { useDispatch, useSelector } from 'react-redux';
import { setStart, setEnd, setDuration } from '../actions/actions';

import { optionsDuration } from '../constants'


export default function DatesRange(params) {

    const dispatch = useDispatch()
    const startDate = useSelector(state => state.start)
    const endDate = useSelector(state => state.end)

    return (
        <div>
            {params.isCustom ? 
                <div>
                    <DatePicker className='dater' selected={startDate} onChange={(date) => dispatch(setStart(date))} /> 
                    <DatePicker className='dater' selected={endDate} onChange={(date) => dispatch(setEnd(date))} /> 
                </div> :
                <Select options={optionsDuration} isSearchable={true} onChange={e => dispatch(setDuration(e.value))}/>
            }
        </div>
    )
}