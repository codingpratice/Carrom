import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [navigate, token]);

  return token ? element : null;
}

export default ProtectedRoute;
