import React, { useEffect, useState } from "react";
import "./css/style.css";

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
                                )
                              }
                            />
                          </td>
                          <td>{game.name}</td>
                          <td>{game.point}</td>
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
                      {winnerList.map((game, index) => (
                        <tr key={game.id}>
                          <td>{game.name}</td>
                          <td>{game.point}</td>
                          <td>
                            {index > 0 && (
                              <button
                                onClick={() => moveItem(index, -1)}
                                className="btn btn-sm btn-outline-primary"
                              >
                                Up
                              </button>
                            )}
                            {index < winnerList.length - 1 && (
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
