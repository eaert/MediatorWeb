import React from 'react'
import Select from "react-select";

import { optionsZone } from '../constants'

import { useDispatch, useSelector } from 'react-redux';
import { setType, setFood } from '../actions/actions';

export default function Selectors(params) {

    const dispatch = useDispatch()
    
    const selectedType = useSelector(state => state.selectors.type)

    const optionsType = [
        { value: {path: 'PainGraphUser', tickCountLine: 11, domainLine:[0, 10], circleName: "Pain Level VAS (0-10)", squareName: null }, label: 'Pain'},
        { value: {path: 'VASGraphUser', tickCountLine: 11, domainLine:[0, 10], circleName: "VAS (0-10)", squareName: null }, label: 'VAS'},
        { value: {path: 'FoodGraphUser', tickCountLine: 2, domainLine:[0, 1], circleName: null, squareName: "Food and beverage consumption" }, label: 'Food'},
        { value: {path: 'ExerciseGraphUser', tickCountLine: 11, domainLine:[0, 300], tickCountBar: 2, domainBar:[0, 1], circleName: "Exercise duration(mins)", squareName: "Exercise performed" }, label: 'Exercise'},
        { value: {path: 'MediGraphUser', tickCountLine: 11, domainLine:[0, 300], tickCountBar: 2, domainBar:[0, 1], circleName: "Medication Dose", squareName: "Taken Medication" }, label: 'Medications'},
    ]

    return (
        <div>
            <Select options={optionsType} isSearchable={true} onChange={e => dispatch(setType(e.value))}/>
            { params.united && selectedType && selectedType.path === 'FoodGraphUser' && <Select options={optionsZone} onChange={e => dispatch(setFood(e.value))}/>}
            {/* { params.united && selectedType && selectedType.path === 'MediGraphUser' && <Select options={optionsMedications} onChange={e => setSelectedMedications(e.value)}/>} */}
        </div>
    )
}
