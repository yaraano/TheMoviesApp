import React from 'react';
import { Link } from 'react-router-dom';
import Search from "../Search/Search";
import './Header.css'
import img from './Assets/img.png'

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-box">
                    <nav>
                        <Link className="homeBtn" to="/">
                            <img src={img} alt=""/>
                        </Link>
                    </nav>
                    <Search />
                </div>
            </div>
        </header>
    );
};

export default Header;