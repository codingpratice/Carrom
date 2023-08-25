import React, { useEffect, useState } from "react";
import "./css/style.css";
import {useParams} from 'react-router-dom';

export const WinnerList = () => {
 
  const [checkedItems, setCheckedItems] = useState([]);
  const [winnerList, setWinnerList] = useState([]);
  const [games, setGames] = useState([]);

  const params = useParams();
  

  useEffect(() => {
    fetchWinner();
  }, []);

  function fetchWinner() {
    fetch(`https://us-central1-carrom-game-99289.cloudfunctions.net/players/scorelist?gameId=${params.id}`).then((result) => {
      result.json().then((resp) => {
        // console.log("resp", resp);
        setGames(resp)
      })
    })
  }

  useEffect(() => {
    const filteredGames = Object.keys(winnerList).map((key, index) => {
      checkedItems.includes(key)
    });
    setWinnerList(filteredGames);
  }, [checkedItems])

  useEffect(() => {
    const filteredGames = Object.entries(games).filter(([key, value]) =>
      checkedItems.includes(key)
    );  
    const filteredGamesObject = Object.fromEntries(filteredGames);
    setWinnerList(filteredGamesObject);
  }, [checkedItems]);
 

  const moveItem = (index, direction) => {
    if (index >= 0 && index < Object.keys(winnerList).length) {
      const newWinnerList = { ...winnerList };
      const keys = Object.keys(newWinnerList);
      const tempKey = keys[index];
      keys[index] = keys[index + direction];
      keys[index + direction] = tempKey;
  
      const updatedWinnerList = keys.reduce((newList, key) => {
        newList[key] = newWinnerList[key];
        return newList;
      }, {});
  
      setWinnerList(updatedWinnerList);
    }
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="shadowbox">
            <div className="shadowbox-head">
              <div className="row">
                <div className="col-6">
                  <h2 className="title">Users List</h2>
                </div>
              </div>
            </div>
            <div className="shadowbox-body">
              <div className="col-12">
                <div className="row"></div>
                <div className="container">
                  <table className="table table-striped dt-responsive nowrap" style={{ width: "90%" }}>
                    <thead>
                      <tr>
                        <th></th>
                        <th>User Name</th>
                        <th>Point</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(games).map((key, index) => (
                        <tr key={key}>
                          <td>
                            <input
                              type="checkbox"
                              checked={checkedItems.includes(key)}
                              onChange={() =>
                                setCheckedItems((prevCheckedItems) =>
                                  prevCheckedItems.includes(key)
                                    ? prevCheckedItems.filter((item) => item !== key)
                                    : [...prevCheckedItems, key]
                                )
                              }
                            />
                          </td>
                          <td>{key}</td>
                          <td>{games[key]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="shadowbox">
            <div className="shadowbox-head">
              <div className="row">
                <div className="col-6">
                  <h2 className="title">Winner List</h2>
                </div>
              </div>
            </div>
            <div className="shadowbox-body">
              <div className="col-12">
                <div className="row"></div>
                <div className="container">
                  <table className="table table-striped dt-responsive nowrap" style={{ width: "90%" }}>
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Point</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(winnerList).map((key, index) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{winnerList[key]}</td>
                          <td>
                            {index > 0 && (
                              <button
                                onClick={() => moveItem(index, -1)}
                                className="btn btn-sm btn-outline-primary"
                              >
                                Up
                              </button>
                            )} {" "}
                            {index < Object.keys(winnerList).length - 1 && (
                              <button
                                onClick={() => moveItem(index, 1)}
                                className="btn btn-sm btn-outline-primary"
                              >
                                Down
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
