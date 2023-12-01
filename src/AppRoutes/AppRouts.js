import React from "react";
import {Route, Routes} from "react-router-dom";
import Header from "../Components/Header/Header";
import HomePage from "../Pages/HomePages";

const AppRouts =()=>{
    return(
        <>
            <Header/>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/movies/:id'} element={<HomePage/>}/>
            </Routes>
        </>
    )
}
export default AppRouts