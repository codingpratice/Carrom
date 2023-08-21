import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/style.css';
import createIcon from './images/create-icon.png';
import kycIcon from './images/kyc-icon.png';
import winnerIcon from './images/winner-icon.png';
import userListIcon from './images/user-list-icon.png';

function HomePage() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center mt-5">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <Link to="/home/games" className="btn-dash">
                                        <img src={createIcon} /><br />
                                        <span>Create<br />Game</span>
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="/home/kyc" className="btn-dash">
                                        <img src={kycIcon} /><br />
                                        <span>KYC<br />Details</span>
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="/home/winnerselection" className="btn-dash">
                                        <img src={winnerIcon} /><br />
                                        <span>Winners<br />Selection</span>
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="/home/userlist" className="btn-dash">
                                        <img src={userListIcon} /><br />
                                        <span>Users<br />List</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;