import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointLeft, faSave, faBan } from '@fortawesome/free-solid-svg-icons';


const NewGame = () => {
    const [gameId, setGameId] = useState("");
    const [duration, setDuration] = useState("");
    const [strikeCost, setStrikeCost] = useState("");
    const [winners, setWinners] = useState("");
    const [totalPrize, setTotalPrize] = useState("");

    const [message, setMessage] = useState("");
    const [isMessageVisible, setIsMessageVisible] = useState(false);

    const saveGame = async () => {
        try {
            // Make API call to save the game
            const response = await fetch('https://us-central1-carrom-game-99289.cloudfunctions.net/app/addGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer k45ds-12dhdk-skdc6y' // if the key is used as an authorization token
                },
                body: JSON.stringify({
                    "key": "k45ds-12dhdk-skdc6y",
                    "max-players": parseInt(gameId),
                    "number-winners": parseInt(winners),
                    "strike-cost": parseInt(strikeCost),
                    "total-prize": parseInt(totalPrize),
                    "duration": parseInt(duration)
                })
            });
            if (response.ok) {
                setMessage("Game successfully added.");
            } else {
                setMessage("An error occurred.");
            }
            setIsMessageVisible(true);
        } catch (error) {
            setMessage("An error occurred.");
            setIsMessageVisible(true);
            console.error(error);
        }
    };

    useEffect(() => {
        if (isMessageVisible) {
            const timer = setTimeout(() => {
                setIsMessageVisible(false);
            }, 5000); // hide after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [isMessageVisible]);


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="shadowbox">
                        <div className="shadowbox-head">
                            <div className="row">
                                <div className="col-6">
                                    <h2 className="title">Create Game</h2>
                                </div>
                                <div className="col-6">
                                    <div className="text-end">
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <Link to="/home/games" className="btn btn-back btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back to Grid"><FontAwesomeIcon icon={faHandPointLeft} size="lg" /></Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <button className="btn btn-save btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Save" onClick={saveGame}><FontAwesomeIcon icon={faSave} size="lg" /></button>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href="#" className="btn btn-cancel btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Cancel"><FontAwesomeIcon icon={faBan} size="lg" /></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isMessageVisible &&
                            <div className="alert alert-info" role="alert">
                                {message}
                            </div>
                        }
                        <div className="shadowbox-body">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="game-id" placeholder="" value={gameId} onChange={(e) => setGameId(e.target.value)} />
                                            <label htmlFor="game-id">Maximum Players</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="duration" placeholder="" value={duration} onChange={(e) => setDuration(e.target.value)} />
                                            <label htmlFor="duration">Duration of Game <span style={{ fontSize: '11px' }}>(in minutes)</span></label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="strike-cost" placeholder="" value={strikeCost} onChange={(e) => setStrikeCost(e.target.value)} />
                                            <label htmlFor="strike-cost">Strike Cost <span style={{ fontSize: '11px' }}>(cost of each strike)</span></label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="winners" placeholder="" value={winners} onChange={(e) => setWinners(e.target.value)} />
                                            <label htmlFor="game-id">Number of Winners</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="total-prize" placeholder="" value={totalPrize} onChange={(e) => setTotalPrize(e.target.value)} />
                                            <label htmlFor="game-id">Total Prize</label>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <p><em><strong>Note:</strong> individual Prize money will be calculated based on the number of winners and the total prize. The winners will be awarded some money proportionally based on a formula.</em></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewGame;
