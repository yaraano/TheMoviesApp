import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY, BASE_URL, PAGE_URL } from "../../Components/Config/Config";
import "./MoviePages.css";

const MoviePages = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState([]);

    useEffect(() => {
        axios(`${BASE_URL}movie/${id}?language=ru-RU&api_key=${API_KEY}`)
            .then(({ data }) => {
                setMovie(data);
            });
    }, [id]);

    useEffect(() => {
        axios(`${BASE_URL}movie/${id}/credits?api_key=${API_KEY}`)
            .then(({ data }) => setCast(data.cast));
    }, [id]);

    useEffect(() => {
        axios(`${BASE_URL}movie/${id}/videos?api_key=${API_KEY}`)
            .then(({ data }) => setTrailer(data.results.slice(0, 1))); // Ограничиваемся первым трейлером
    }, [id]);

    return (
        <div className={"container"}>
            {movie ? (
                <div className={"movie-details"}>
                    <div className="poster">
                        <img src={`${PAGE_URL}${movie.poster_path}`} alt="" />
                    </div>
                    <div className="details">
                        <div className="info-section">
                            <h1 className="title">{movie.title}</h1>
                            <p className="original-title">{movie.original_title}</p>
                            <p className="release-date">{movie.release_date}</p>
                            <p className="overview">{movie.overview}</p>
                        </div>
                        <div className="rating-section">
                            <p className="rating">{movie.vote_average}</p>
                            <p className="popularity">{movie.popularity} оценки</p>
                            <h3 className="actors">В главных ролях:</h3>
                            <ul>
                                {cast.map((actor) => (
                                    <li key={actor.id}>
                                        <h3>{actor.name}</h3>
                                        <p>{actor.character}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div className={"trailer-container"}>
                <h2>Трейлер</h2>
                {trailer.length > 0 ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${trailer[0].key}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <p>No trailers available.</p>
                )}
            </div>
        </div>
    );
};

export default MoviePages;
