import React from "react";
import {Link} from "react-router-dom";
import {PAGE_URL} from "./Config/Config";

const MovieList = ({movies}) => {
    return (
        <div className={'row'}>
            {
                movies.map(movies =>
                    <div className={'col-3'} key={movies.id}>
                        <Link to={`/moves/${movies.id}`}> <img className={'move-img'}
                                                               src={`${PAGE_URL}${movies.poster_path}`} alt=""/></Link>
                        <div className={'movie-box'}>
                            <Link className={'box-title'} to={`/moves/${movies.id}`}><h3>{movies.title}</h3></Link>
                            <p>{movies.release_date}</p>
                        </div>
                    </div>
                )
            }

        </div>
    )
}
export default MovieList