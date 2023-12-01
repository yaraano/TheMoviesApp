import React, {useEffect, useState} from "react";
import axios from "axios";
import MoveList from "../Components/MovieList";
import {BASE_URL, API_KEY} from "../Components/Config/Config";
import Carousel from "../Components/Carousel/Carousel";



const HomePage=()=>{

    const [movies, setMovies]=useState([])

    useEffect(() => {
        axios(`${BASE_URL}discover/movie?language=ru-RU&api_key=${API_KEY}`)
            .then(({data})=>setMovies(data.results))
    }, []);


    return(
        <>
            <Carousel movies={movies}/>
            <div className={'container'}>

                <MoveList movies={movies}/>
            </div></>
    )
}
export default HomePage