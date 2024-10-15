// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Definir las rutas de la API
router.get("/users", userController.getAllUsers); // Obtener todos los usuarios
router.post("/users", userController.createUser); // Crear un nuevo usuario
router.get("/users/:id", userController.getUserById); // Obtener un usuario por ID
router.put("/users/:id", userController.updateUser); // Actualizar un usuario
router.delete("/users/:id", userController.deleteUser); // Eliminar un usuario

// Ruta para el login
router.post("/login", userController.login); // Login

module.exports = router;
