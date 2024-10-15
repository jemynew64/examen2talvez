import { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import PropTypes from "prop-types"; // Importa PropTypes para validaciones

const UserList = ({ userRole }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError("Error al eliminar usuario", err);
    }
  };

  const handleUserEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${id}`);
      setEditingUser(response.data);
    } catch (err) {
      setError("Error al obtener usuario", err);
    }
  };

  const handleEditSubmit = async (updatedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/${editingUser.id}`,
        updatedUser
      );
      setUsers(
        users.map((u) => (u.id === response.data.id ? response.data : u))
      );
      setEditingUser(null);
    } catch (err) {
      setError("Error al actualizar usuario", err);
    }
  };

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      {/* Si el usuario es admin, muestra el formulario para añadir usuarios */}
      {userRole === "admin" && (
        <UserForm
          onUserAdded={(newUser) => setUsers([...users, newUser])}
          userToEdit={editingUser}
          onEditSubmit={handleEditSubmit}
        />
      )}
      <table className="min-w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Apellido</th>
            <th className="border border-gray-300 p-2">Email</th>
            {/* Solo muestra la columna "Acciones" si es admin */}
            {userRole === "admin" && (
              <th className="border border-gray-300 p-2">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.lastname}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              {/* Solo muestra los botones de "Editar" y "Eliminar" si es admin */}
              {userRole === "admin" && (
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded mr-2"
                    onClick={() => handleDelete(user.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                    onClick={() => handleUserEdit(user.id)}
                  >
                    Editar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Define las validaciones de PropTypes
UserList.propTypes = {
  userRole: PropTypes.string.isRequired, // userRole es requerido y debe ser un string
};

export default UserList;
