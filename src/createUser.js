import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft, faSave, faBan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const NewUser = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isKYCApproved, setKYCApproved] = useState(null);
  const [message, setMessage] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [cardType, setCardType] = useState("");

  const saveUser = async () => {
    try {
      const response = await axios.post(
        "https://us-central1-carrom-game-99289.cloudfunctions.net/createnewUser/withPhoneNo",
        {
          documenttype: cardType,
          kyc: isKYCApproved,
          address: address,
          username: userName,
          emailid: email,
          pincode: pinCode,
          phoneno: contactNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data);

      if (response.status === 200 && data.success) {
        setMessage("User successfully added.");
      } else {
        setMessage(data.error || "An error occurred.");
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
      }, 2000);
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
                  <h2 className="title">Create Users</h2>
                </div>
                <div className="col-6">
                  <div className="text-end">
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <Link
                          to="/home/userlist"
                          className="btn btn-back btn-sm"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Back to Grid"
                        >
                          <FontAwesomeIcon icon={faHandPointLeft} size="lg" />
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <button
                          className="btn btn-save btn-sm"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Save"
                          onClick={saveUser}
                        >
                          <FontAwesomeIcon icon={faSave} size="lg" />
                        </button>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="#"
                          className="btn btn-cancel btn-sm"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Cancel"
                        >
                          <FontAwesomeIcon icon={faBan} size="lg" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {isMessageVisible && (
              <div className="alert alert-info" role="alert">
                {message}
              </div>
            )}
            <div className="shadowbox-body">
              <div className="col-12">
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="user-name"
                        placeholder=""
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <label htmlFor="user-name">User Name</label>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="email">Email ID</label>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder=""
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <label htmlFor="address">Address</label>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="pinCode"
                        placeholder=""
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                      />
                      <label htmlFor="pinCode">Pin Code</label>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="form-floating mb-3">
                      <select
                        className="form-select"
                        id="card-type"
                        value={cardType}
                        onChange={(e) => setCardType(e.target.value)}
                      >
                        <option value="">Select Card Type</option>
                        <option value="Pan">Pan Card</option>
                        <option value="Aadhar">Aadhar Card</option>
                        <option value="Driving License">Driving License</option>
                      </select>
                      <label htmlFor="card-type">Document type Type</label>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="contact-no"
                        placeholder=""
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                      />
                      <label htmlFor="contact-no">Contact No.</label>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="form-floating mb-3">
                      <p>Is KYC Approved?</p>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="kyc-yes"
                          value="Yes"
                          checked={isKYCApproved === "Yes"}
                          onChange={(e) => setKYCApproved(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="kyc-yes">
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="kyc-no"
                          value="No"
                          checked={isKYCApproved === "No"}
                          onChange={(e) => setKYCApproved(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="kyc-no">
                          No
                        </label>
                      </div>
                    </div>
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
