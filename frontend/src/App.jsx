import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList"; // Usamos el mismo componente para todos

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login setUserRole={setUserRole} setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate
                to={userRole === "admin" ? "/admin" : "/user"}
                replace
              />
            )
          }
        />

        {/* Ruta para usuarios regulares */}
        <Route
          path="/user"
          element={
            isLoggedIn && userRole === "user" ? (
              <div>
                <h1>Bienvenido Usuario Regular</h1>
                <UserList userRole={userRole} /> {/* Pasa userRole */}
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Ruta para admin */}
        <Route
          path="/admin"
          element={
            isLoggedIn && userRole === "admin" ? (
              <div>
                <h1>Dashboard de Administrador</h1>
                <UserList userRole={userRole} /> {/* Pasa userRole */}
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
