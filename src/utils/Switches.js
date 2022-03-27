import React from "react";
import {Route,Routes } from "react-router-dom";
import Login from "../components/Login";
import ExcelPage from "../pages/ExcelPage";
import Graphs from "../pages/Graphs";


export default function Switches(){
    return(
        <Routes>
            <Route path={"*"} element={<Login></Login>}></Route>
            <Route path={"/home"} element={<div><h1>Home Page</h1></div>}/>
            <Route path={"/excels"} element={<ExcelPage/>}/>
            <Route path={"/graphs"} element={<Graphs/>}/>

        </Routes>
    )
}