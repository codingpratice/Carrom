import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './css/style.css';

const ListAndCreateGames = () => {
    const [games, setGames] = useState([]);
    const [lastDoc, setLastDoc] = useState('');
    const [hasMore, setHasMore] = useState(true);

    const pageSize = 10; 

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        const response = await fetch(`https://us-central1-carrom-game-99289.cloudfunctions.net/app/games?limit=${pageSize}&startAfter=${lastDoc}`);
        const data = await response.json();
        if (data.length > 0) {
            setGames([...games, ...data]);
            setLastDoc(data[data.length - 1].id);
        }
        if (data.length < pageSize) {
            setHasMore(false);
        }
    };

    const loadMoreGames = () => {
        if (hasMore) {
            fetchGames();
        }
    };

    return (
        <div className="container">
        <div className="row">
            <div className="col-12">
                <div className="shadowbox">
                    <div className="shadowbox-head">
                        <div className="row">
                            <div className="col-6">
                                <h2 className="title">Created Game List</h2>
                            </div>
                            <div className="col-6">
                                <div className="text-end">
                                    <ul className="list-inline">
                                        <li className="list-inline-item">
                                            <Link to="/home/newgame" className="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Create Game"><i className="fa-solid fa-square-plus"></i></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shadowbox-body">
                        <div className="col-12">
                            <div className="row"></div>
        <div className="container">
            <table className="table table-striped dt-responsive nowrap" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Game ID</th>
                        <th>Strike Cost</th>
                        <th>No. Of Winners</th>
                        <th>Co-ordinates</th>
                        <th>Time Left</th>
                        <th>Total Prize</th>
                        <th className="text-center">Edit</th>
                        <th className="text-center">Delete</th>
                        <th className="text-center">Close Game</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game, index) => (
                        <tr key={game.id}>
                            <td>{index + 1}</td>
                            <td>{game.id}</td>
                            <td>{game['strike-cost']}</td>
                            <td>{game['number-winners']}</td>
                            <td>X={game['cor_x']}, Y={game['cor_y']}</td>
                            <td>{game.durationLeft}</td>
                            <td>{game['total-prize']}</td>
                            <td className="text-center">
                                <a href="#" className="text-primary">
                                    <FontAwesomeIcon icon={faPen} />
                                </a>
                            </td>
                            <td className="text-center">
                                <a href="#" className="text-danger">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </a>
                            </td>
                            <td className="text-center">
                                <a href="#" className="text-secondary">
                                    <FontAwesomeIcon icon={faTimesCircle} />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {hasMore && <button onClick={loadMoreGames}>Load more</button>}
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    );
};

export default ListAndCreateGames;
