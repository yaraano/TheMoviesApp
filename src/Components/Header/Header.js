import React from 'react';
import { Link } from 'react-router-dom';
import Search from "../Search/Search";


const Header = () => {
    return (
        <header className="header">
            <nav>
                <Link className="homeBtn" to="/">
                    Главное
                </Link>
            </nav>
            <Search />
        </header>
    );
};

export default Header;