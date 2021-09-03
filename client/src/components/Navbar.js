import React, {useContext} from 'react';
import {NavLink,useHistory} from 'react-router-dom'
import AuthContext from "../context/AuthContext";

const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logautHeandler = (e) => {
        e.preventDefault()
        auth.logOut()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue darken-3">
                <a href="/" className="brand-logo">Сокращение ссылок</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to={'/create'}>Создать</NavLink></li>
                    <li><NavLink to={'/links'}>Ссылки</NavLink></li>
                    <li><a href="/" onClick={logautHeandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;