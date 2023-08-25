import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import './Winner.css';
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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();
  useEffect(() => {
    fetchGames();
  }, [currentPage]);
  const fetchGames = async () => {
    const response = await fetch(
      `https://us-central1-carrom-game-99289.cloudfunctions.net/Winners/list`
    );
    const data = await response.json();
    setGameList(data);
  };
  function handleClick(id) {
    navigate(`/home/winners/${id}`);
  }
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedGames = gameList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(gameList.length / pageSize);
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
                      {displayedGames.map((game, index) => (
                        <tr key={game.id}>
                          <td>{startIndex + index + 1}</td>
                          <td>{game.id}</td>
                          <td>{game["strike-cost"]}</td>
                          <td>{game["number-winners"]}</td>
                          <td>{game["total-prize"]}</td>
                          <td className="text-center">
                            <Link
                              onClick={() => handleClick(game.id)}
                              to={`/home/winners/${game.id}`}
                              className="btn btn-back btn-sm"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                            >
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                size="lg"
                              />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pagination">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }).map((_, pageIndex) => (
                      <button
                        key={pageIndex}
                        onClick={() => setCurrentPage(pageIndex + 1)}
                        className={`pagination-button ${
                          currentPage === pageIndex + 1 ? "active" : ""
                        }`}
                      >
                        {pageIndex + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages)
                        )
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}