import React, { useEffect, useState } from "react";
import "./css/style.css";
<<<<<<< HEAD

export const WinnerList = () => {
  // For demonstration, I'm creating a sample list. You can replace this with your actual data.
  const games = [
    { id: 1, name: "John", point: 100 },
    { id: 2, name: "Jane", point: 80 },
    { id: 3, name: "Doe", point: 60 },
  ];

  const [checkedItems, setCheckedItems] = useState([]);
  const [winnerList, setWinnerList] = useState([]);

  useEffect(() => {
    const filteredGames = games.filter((game) => checkedItems.includes(game.id));
    setWinnerList(filteredGames);
  }, [checkedItems]);

  const moveItem = (index, direction) => {
    if (index >= 0 && index < winnerList.length) {
      const newWinnerList = [...winnerList];
      const temp = newWinnerList[index];
      newWinnerList[index] = newWinnerList[index + direction];
      newWinnerList[index + direction] = temp;
      setWinnerList(newWinnerList);
    }
  };
=======
import {useParams} from 'react-router-dom';

export const WinnerList = () => {
  // For demonstration, I'm creating a sample list. You can replace this with your actual data.
  // const games = [
  //   { id: 1, name: "John", point: 100 },
  //   { id: 2, name: "Jane", point: 80 },
  //   { id: 3, name: "Doe", point: 60 },
  // ];

  const [checkedItems, setCheckedItems] = useState([]);
  const [winnerList, setWinnerList] = useState([]);
  const [games, setGames] = useState([]);

  const params = useParams();
  // console.log(params.id);

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
  
>>>>>>> 1dc4c000aebab7fadf01908f45a4c55d17ef2e1f

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
<<<<<<< HEAD
                      {games.map((game, index) => (
                        <tr key={game.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={checkedItems.includes(game.id)}
                              onChange={() =>
                                setCheckedItems((prevCheckedItems) =>
                                  prevCheckedItems.includes(game.id)
                                    ? prevCheckedItems.filter((item) => item !== game.id)
                                    : [...prevCheckedItems, game.id]
=======
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
>>>>>>> 1dc4c000aebab7fadf01908f45a4c55d17ef2e1f
                                )
                              }
                            />
                          </td>
<<<<<<< HEAD
                          <td>{game.name}</td>
                          <td>{game.point}</td>
=======
                          <td>{key}</td>
                          <td>{games[key]}</td>
>>>>>>> 1dc4c000aebab7fadf01908f45a4c55d17ef2e1f
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
<<<<<<< HEAD
                      {winnerList.map((game, index) => (
                        <tr key={game.id}>
                          <td>{game.name}</td>
                          <td>{game.point}</td>
=======
                      {Object.keys(winnerList).map((key, index) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{winnerList[key]}</td>
>>>>>>> 1dc4c000aebab7fadf01908f45a4c55d17ef2e1f
                          <td>
                            {index > 0 && (
                              <button
                                onClick={() => moveItem(index, -1)}
                                className="btn btn-sm btn-outline-primary"
                              >
                                Up
                              </button>
<<<<<<< HEAD
                            )}
                            {index < winnerList.length - 1 && (
=======
                            )} {" "}
                            {index < Object.keys(winnerList).length - 1 && (
>>>>>>> 1dc4c000aebab7fadf01908f45a4c55d17ef2e1f
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
