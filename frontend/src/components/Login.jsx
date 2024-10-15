import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserRole, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Petición al servidor para verificar las credenciales
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        // Ahora 'response.data.user' contiene la información del usuario
        const role = response.data.user.isAdmin ? "admin" : "user"; // Asegúrate que isAdmin sea booleano

        setUserRole(role);
        setIsLoggedIn(true);
        setError(null);
        setSuccessMessage("Inicio de sesión exitoso, redirigiendo...");

        // Redirigir a la página correspondiente según el rol
        setTimeout(() => {
          navigate(role === "admin" ? "/admin" : "/user");
        }, 1500);
      } else {
        setError("Credenciales incorrectas");
        setIsLoggedIn(false);
        setSuccessMessage(null);
      }
    } catch (err) {
      console.error(err); // Para depuración
      setError("Error en el servidor");
      setIsLoggedIn(false);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Iniciar Sesión
            </h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-center mb-4">
                {successMessage}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define las validaciones de PropTypes
Login.propTypes = {
  setUserRole: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;
