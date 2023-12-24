import React from "react";
import { Link } from "react-router-dom";
import { PAGE_URL } from "../Config/Config";
import img from "./Assets/img.jpg"
import "./MovieList.css";

const MovieList = ({ movies }) => {
    return (
        <div className="row">
            {movies.map((movie) => (
                <div className="col-3" key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>
                        <img
                            className="movie-img"
                            src={movie.poster_path ? `${PAGE_URL}${movie.poster_path}` : img}
                            alt=""
                        />
                    </Link>
                    <div className="movie-box">
                        <Link className="box-title" to={`/movies/${movie.id}`}>
                            <h3>{movie.title}</h3>
                        </Link>
                        <p>{movie.release_date}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieList;
