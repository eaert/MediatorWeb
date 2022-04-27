import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { serverAddress } from '../constants';

import { setParticipant } from '../actions/actions';
import '../css/Login.css'

export default function Login() {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const [isParticipant, setIsParticipant] = useState(false)

    async function submit(){
        try{
            var response;
            if (isParticipant) {
                response = await axios.post(serverAddress+`/auth/webLogin`, getValues())
            } else {
                response = await axios.post(serverAddress+`/auth/DoctorLogin`, getValues())
            }
            sessionStorage.setItem("isLogin",JSON.stringify(response.data.valid))
            if (response.data.valid) {
                const PartUser = getValues().Username
                if (isParticipant) dispatch(setParticipant(PartUser))
                navigate(`/home`)
            } else {
                alert('Username or password is incorrect')
            }
        }
        catch (error){
            console.log(error)
        }
    }

    return (
        <div className="Login">
        <Form onSubmit={handleSubmit(submit)}>
            <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control name="Username" {...register("Username",{required:true})} type="text" placeholder="Enter username"  />
            {errors?.Username?.type==='required' && <p>Please enter username</p>}
            </Form.Group>
            <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
                {...register("Password",{required: true})} type="password" placeholder="Enter password"
            />
            {errors?.password?.type==='required' && <p className={"errors"}>Please enter password</p>}
            </Form.Group>
            <Form.Check
                inline
                label="Is Participant?"
                name="group1"
                type="checkbox"
                id={`inline-checkbox-1`}
                onChange={e => setIsParticipant(e.target.checked)}
            />
            <Button block size="lg" type="submit">Login</Button>
        </Form>
        <p>Having issues ? Please contact your superviser</p>
        
        </div>
    );
}