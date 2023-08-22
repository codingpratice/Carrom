import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
// import { useHistory } from "react-router-dom";
=======
>>>>>>> 1dc4c000aebab7fadf01908f45a4c55d17ef2e1f
import { useNavigate } from "react-router-dom";

import {
  faPen,
  faArrowRight,
  faTrashAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./css/style.css";

export function Winners() {
  const [gameList, setGameList] = useState([]);
  const [lastDoc, setLastDoc] = useState("");
  const [hasMore, setHasMore] = useState(true);

<<<<<<< HEAD
  //   const history = useHistory();
=======
>>>>>>> 1dc4c000aebab7fadf01908f45a4c55d17ef2e1f
  const navigate = useNavigate();

  const pageSize = 10;

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const response = await fetch(
      `https://us-central1-carrom-game-99289.cloudfunctions.net/Winners/list?limit=${pageSize}&startAfter=${lastDoc}`
    );
    const data = await response.json();
    if (data.length > 0) {
      setGameList([...gameList, ...data]);
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

<<<<<<< HEAD
  //   function handleClick(id){
  //     console.log("hi", id);
  //     // history.push("/winnerselection", { id });
  //     // navigate('/', { id });
  //     // `/info/${characterDetail.id}
  //     navigate( `/home/winners/${id}`);
  //   }
=======
    function handleClick(id){
      // console.log("hi", id);
      navigate( `/home/winners/${id}`);
    }
>>>>>>> 1dc4c000aebab7fadf01908f45a4c55d17ef2e1f

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="shadowbox">
            <div className="shadowbox-head">
              <div className="row">
                <div className="col-6">
                  <h2 className="title">Finish Game List</h2>
                </div>
              </div>
            </div>
            <div className="shadowbox-body">
              <div className="col-12">
                <div className="row"></div>
                <div className="container">
                  <table
                    className="table table-striped dt-responsive nowrap"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Game ID</th>
                        <th>Strike Cost</th>
                        <th>No. Of Winners</th>
                        <th>Total Prize</th>
                        <th className="text-center">Show</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gameList.map((game, index) => (
                        <tr key={game.id}>
                          <td>{index + 1}</td>
                          <td>{game.id}</td>
                          <td>{game["strike-cost"]}</td>
                          <td>{game["number-winners"]}</td>
                          <td>{game["total-prize"]}</td>
<<<<<<< HEAD
                          {/* <td><button onClick={() => handleClick(game.id)}>Go</button></td> */}

                          <td className="text-center">
                            <Link
                              to="/home/winners"
=======
                          <td className="text-center">
                            <Link onClick={() => handleClick(game.id)}
                              to={`/home/winners/${game.id}`}
>>>>>>> 1dc4c000aebab7fadf01908f45a4c55d17ef2e1f
                              className="btn btn-back btn-sm"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                            >
                              <FontAwesomeIcon icon={faArrowRight} size="lg" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {hasMore && (
                    <button onClick={loadMoreGames}>Load more</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
