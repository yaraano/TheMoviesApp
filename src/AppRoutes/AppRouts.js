import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Components/Header/Header";
import HomePage from "../Pages/HomePages/HomePages";
import MoviePages from "../Pages/MoviePages/MoviePages";

const AppRoutes = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path={'/'} element={<HomePage />} />
                <Route path={'/movies/:id'} element={<MoviePages />} />
            </Routes>
        </>
    );
};

export default AppRoutes;