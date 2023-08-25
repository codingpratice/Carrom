import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const UserModal = ({ showModal, editingUser, fetchUsers, closeEditModal }) => {
  const [userName, setUserName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (editingUser) {
      setUserName(editingUser.username);
      setContactNumber(editingUser.phoneno);
      setAddress(editingUser.address);
      setEmail(editingUser.emailid);
    }
  }, [editingUser]);

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post(
        "https://us-central1-carrom-game-99289.cloudfunctions.net/updateDetails/udetails",
        {
          username: userName,
          phoneno: contactNumber,
          address: address,
          emailid: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("username", userName);

      const data = response.data;
      console.log("data", data);
      fetchUsers();
      closeEditModal();
      
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  if (!editingUser) return null;

  return (
    <div>
      <div className={`modal-backdrop fade ${showModal ? "show" : ""}`}></div>

      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        onClick={closeEditModal}
      >
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeEditModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="user-name">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="user-name"
                  placeholder=""
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder=""
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contact-no">Contact No.</label>
                <input
                  type="text"
                  className="form-control"
                  id="contact-no"
                  placeholder=""
                  value={contactNumber}
                  disabled
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeEditModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveChanges}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
