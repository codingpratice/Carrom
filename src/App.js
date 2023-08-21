import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import NewGame from "./NewGame";
import ListAndCreateGames from "./ListAndCreateGames";
import { UserList } from "./UserList";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import { KycListGame } from "./KycList";
import { NewUser } from "./createUser";
import { WinnerList } from "./winnerList";
import { Winners } from "./Winner";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/home/*"
          element={<ProtectedRoute element={<AuthenticatedApp />} />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

function AuthenticatedApp() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="games" element={<ListAndCreateGames />} />
        <Route path="newgame" element={<NewGame />} />
        <Route path="kyc" element={<KycListGame />} />
        <Route path="userlist" element={<UserList />} />
        <Route path="createUsers" element={<NewUser />} />
        <Route path="winnerselection" element={<Winners/>} />
        <Route path="winners" element={<WinnerList/>} />
      </Routes>
    </div>
  );
}

export default App;
