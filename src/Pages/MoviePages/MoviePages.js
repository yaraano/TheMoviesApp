import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY, BASE_URL, PAGE_URL } from "../../Components/Config/Config";
import "./MoviePages.css";
import MovieList from "../../Components/MovieList/MovieList";
import img from "./Assets/img.jpg"
const MoviePages = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [cast, setCast] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const [actors, setActors] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        axios(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=ru-RU`)
            .then(({ data }) => {
                setMovie(data);
            });

        axios(`${BASE_URL}movie/${id}/recommendations?api_key=${API_KEY}&language=ru-RU&page=1`)
            .then(({ data }) => {
                setSimilarMovies(data.results);
            });
    }, [id]);

    const visibleActors = actors.slice(0, 12);

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
            .then(({ data }) => setTrailers(data.results.slice(0, 1)));
    }, [id]);

    useEffect(() => {
        setActors(cast);
    }, [cast]);

    return (
        <div className={"container"}>
            {movie ? (
                <div className={"movie-details"}>
                    <div className="poster">
                        <img
                            src={movie.poster_path ? `${PAGE_URL}${movie.poster_path}` : `${img}`}
                            alt=""
                        />
                        <div className={"trailer-container"}>
                            <h2>Трейлеры</h2>
                            {trailers.length > 0 ? (
                                trailers.map((trailer) => (
                                    <iframe
                                        key={trailer.id}
                                        src={`https://www.youtube.com/embed/${trailer.key}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ height: "260px" }}
                                    ></iframe>
                                ))
                            ) : (
                                <p>No trailers available.</p>
                            )}
                        </div>
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
                            <div className="actors-container">
                                <div className="row">
                                    {visibleActors.map((actor) => (
                                        <div className={'col-3'} key={actor.id}>
                                            <div className="actorBox">
                                                <img
                                                    className={'actorImg'}
                                                    src={actor.profile_path ? `${PAGE_URL}${actor.profile_path}` : `${img}`}
                                                    alt=""
                                                />
                                                <h5>{actor.name}</h5>
                                                <p>{actor.character}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div>
                {similarMovies.length > 0 && (
                    <section className="similar-movies">
                        <h2>Рекомендации</h2>
                        <MovieList movies={similarMovies} />
                    </section>
                )}
            </div>
        </div>
    );
};

export default MoviePages;