import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { BASE_URL, API_KEY, PAGE_URL } from '../Config/Config';
import './Search.css';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        setShowAll(false);
    };

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        axios(`${BASE_URL}search/movie?language=ru-RU&api_key=${API_KEY}&query=${searchTerm}`)
            .then(({ data }) => setSearchResults(data.results))
    }, [searchTerm]);

    const visibleResults = showAll ? searchResults : searchResults.slice(0, 5);

    const handleLinkClick = () => {
        setSearchTerm('');
    };

    return (
        <div className="search-container">
            <h3>Найти фильм</h3>
            <input
                type="text"
                placeholder="Поиск фильмов"
                value={searchTerm}
                onChange={handleChange}
            />
            <div className="search-results">
                {visibleResults.map((result) => (
                    <Link
                        to={`/movies/${result.id}`}
                        key={result.id}
                        className="search-result"
                        onClick={handleLinkClick}
                    >
                        <img
                            src={result.poster_path ? `${PAGE_URL}${result.poster_path}` : 'https://via.placeholder.com/150'}
                            alt={result.title}
                        />
                        <p>{result.title}</p>
                    </Link>
                ))}
                {searchResults.length > 5 && !showAll && (
                    <button className={"btn-main"} onClick={() => setShowAll(true)}>Показать все</button>
                )}
                {showAll && (
                    <button className={"btn-main"} onClick={() => setShowAll(false)}>Закрыть</button>
                )}
            </div>
        </div>
    );
};

export default Search;
