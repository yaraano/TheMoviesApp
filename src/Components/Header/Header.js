import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className={'header'}>
            <div className={'header-container'}>
                <nav>
                    <Link className={'homeBtn'} to={'/'}>Главное</Link>
                    <Link className={'searchBtn'} to={'/search'}>Найти фильм</Link>
                </nav>
            </div>
        </header>
    )
}
export default Header