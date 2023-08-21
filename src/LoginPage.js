import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://us-central1-carrom-game-99289.cloudfunctions.net/authApi', { username, password });

      if (response.data.token) { // replace 'token' with the actual property name in the response
        localStorage.setItem('authToken', response.data.token);
        navigate('/home');
      } else {
        setError('Username or password is incorrect');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3 mt-5">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center">Login</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
                  <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="d-grid gap-2">
                  <input type="submit" value={loading ? "Loading..." : "Log in"} className="btn btn-primary" disabled={loading} />
                </div>
              </form>
              {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
