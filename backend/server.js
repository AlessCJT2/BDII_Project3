import prestamoRoutes from './routes/prestamo.js';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

const libroRoutes = require('./routes/libros');
const usuarioRoutes = require('./routes/usuarios');

const app = express();

// Middlewares
app.use(cors()); // Permite React en localhost:5173
app.use(express.json());

conectarDB();

app.use('/api/libros', libroRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/prestamos', prestamoRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API Biblioteca Digital - Backend ON' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});