import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./css/style.css";
import axios from "axios";
import UserModal from "./Modl";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const pageSize = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    console.log(userId,"userid")
    // try {
    //   await axios.delete(`YOUR_API_ENDPOINT_TO_DELETE_USER/${userId}`);
    //   setUsers(users.filter(user => user.phoneno !== userId));
    // } catch (error) {
    //   console.error("Error deleting user:", error);
    // }
  };
  

  const openEditModal = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setShowModal(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-carrom-game-99289.cloudfunctions.net/getUsersList/UsersList?limit=${pageSize}&startAfter=${users.length}`
      );
      const data = response.data;
      if (data.length > 0) {
        setUsers([...users, ...data]);
      }
      if (data.length < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const loadMoreUsers = () => {
    if (hasMore) {
      fetchUsers();
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
                  <h2 className="title">Users List</h2>
                </div>
                <div className="col-6">
                  <div className="text-end">
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <Link
                          to="/home/createUsers"
                          className="btn btn-primary btn-sm"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Create user"
                        >
                          <i className="fa-solid fa-square-plus"></i>
                        </Link>
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
                  <table
                    className="table table-striped dt-responsive nowrap"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Address</th>
                        <th>File Upload</th>
                        <th>Phone no.</th>
                        <th>Email ID</th>
                        <th className="text-center">Edit</th>
                        <th className="text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.username}</td>
                          <td>{user.address}</td>
                          <td>no</td>
                          <td>{user.phoneno}</td>
                          <td>{user.emailid}</td>
                          <td className="text-center">
                            <a
                              href="#"
                              className="text-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                openEditModal(user);
                              }}
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </a>
                          </td>
                          <td className="text-center">
                            <a
                              href="#"
                              className="text-danger"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteUser(user.phoneno);
                              }}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {hasMore && (
                    <button onClick={loadMoreUsers}>Load more</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserModal
        showModal={showModal}
        editingUser={editingUser}
        closeEditModal={closeEditModal}
        fetchUsers={fetchUsers}
      />
    </div>
  );
};
