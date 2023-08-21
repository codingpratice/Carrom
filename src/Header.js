import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';

function Header() {
    return (
        <div className="container-fluid header">
            <div className="row">
                <div className="col-6">
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                </div>
                <div className="col-6">
                    <div className="text-end">
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <Link to="/home" className="top-icon">
                                    <i className="fa-solid fa-house-chimney fa-xl"></i> Home
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/login" className="top-icon">
                                    <i className="fa-solid fa-arrow-right-from-bracket fa-xl"></i> Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
