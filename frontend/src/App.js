import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Flights } from "./components/Flights";
import { Compra } from "./components/Compra";
import { Login } from "./components/Login";
import { Nav } from "./components/Nav";
import { Register } from "./components/Register";
import { useUser } from "./context/UserContext";

axios.defaults.baseURL = "http://localhost:4000/api";

function App() {
  const { user } = useUser();
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const Public = ({ children }) => {
    return !user.login ? children : <Navigate to="/flights" />;
  };

  const Private = ({ children }) => {
    return user.login ? children : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <Public>
              <Login />
            </Public>
          }
        />
        <Route
          path="/register"
          element={
            <Public>
              <Register />
            </Public>
          }
        />
        <Route
          path="/flights"
          element={
            <Private>
              <Flights />
            </Private>
          }
        />
        <Route
          path="/compra/:tipo/:id"
          element={
            <Private>
              <Compra />
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
