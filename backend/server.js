"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importa el paquete cors
const userRoutes = require("./routes/userRoutes");
const app = express();
const port = 3000;

// Middleware para habilitar CORS
app.use(cors()); // Habilita CORS para todas las rutas

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(bodyParser.json());

// Rutas para la API
app.use("/api", userRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
