import React, { useEffect, useState } from "react";
import axios from "axios";
import MoveList from "../../Components/MovieList/MovieList";
import { BASE_URL, API_KEY } from "../../Components/Config/Config";
import Carousel from "../../Components/Carousel/Carousel";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";

const HomePage = () => {
    const [pageParam, setPageParam] = useSearchParams('page');
    const [page, setPage] = useState(pageParam.get('page') || 1);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios(`${BASE_URL}discover/movie?language=ru-RU&api_key=${API_KEY}&page=${page}`)
            .then(({ data }) => setMovies(data.results))
    }, [page]);

    const handleChangePage = (argPage) => {
        setPage(argPage);
        setPageParam({ page: argPage });
    };

    return (
        <>
            <Carousel movies={movies} />
            <div className={'container'}>
                <MoveList movies={movies} />
                <Pagination onClick={handleChangePage} />
            </div>
        </>
    );
};

export default HomePage;