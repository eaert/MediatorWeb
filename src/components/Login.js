import React, { useState } from "react";
import {Form, Modal} from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { serverAddress } from '../constants';

import '../css/Login.css'

export default function Login() {
    let navigate = useNavigate()
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const [showErrorModal, updateShowErrorModal] = useState(false)

    async function submit(){
        try{
            let response = await axios.post(serverAddress+`/auth/DoctorLogin`,getValues())
            sessionStorage.setItem("isLogin",JSON.stringify(response.data.valid))
            if (response.data.valid) {
                navigate(`/home`)
            }
        }
        catch (error){
            console.log(error)
        }
    }

    return (
        <div className="Login">
        <Modal show={showErrorModal} centered onHide={_=>updateShowErrorModal(false)}>
            <Modal.Header closeButton/>
            <Modal.Body>
                Username or password is incorrect
            </Modal.Body>
        </Modal>
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
            <Button block size="lg" type="submit">Login</Button>
        </Form>
        <p>Having issues ? Please contact your superviser</p>
        
        </div>
    );
}