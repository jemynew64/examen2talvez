import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const UserForm = ({ onUserAdded, userToEdit, onEditSubmit }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setLastname(userToEdit.lastname);
      setEmail(userToEdit.email);
      setPassword(""); // No se muestra la contraseña por razones de seguridad
    } else {
      setName("");
      setLastname("");
      setEmail("");
      setPassword("");
    }
  }, [userToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, lastname, email, password };

    if (userToEdit) {
      await onEditSubmit(userData);
    } else {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const newUser = await response.json();
        onUserAdded(newUser);
      } else {
        console.error("Error al añadir usuario");
      }
    }

    // Reseteamos el formulario
    setName("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-xl font-semibold mb-4">
        {userToEdit ? "Editar Usuario" : "Agregar Usuario"}
      </h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border border-gray-300 rounded w-full p-2 mb-4"
      />
      <input
        type="text"
        placeholder="Apellido"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
        className="border border-gray-300 rounded w-full p-2 mb-4"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-gray-300 rounded w-full p-2 mb-4"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={!userToEdit} // No es necesario en la edición
        className="border border-gray-300 rounded w-full p-2 mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {userToEdit ? "Actualizar Usuario" : "Agregar Usuario"}
      </button>
    </form>
  );
};

// Define las validaciones de PropTypes
UserForm.propTypes = {
  onUserAdded: PropTypes.func.isRequired,
  userToEdit: PropTypes.shape({
    name: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
  }),
  onEditSubmit: PropTypes.func.isRequired,
};

// Valor por defecto para userToEdit
UserForm.defaultProps = {
  userToEdit: null,
};

export default UserForm;
