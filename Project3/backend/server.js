import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import libroRoutes from './routes/libroRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

conectarDB();

app.use('/api/libros', libroRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('API FUNCIONANDO CORRECTAMENTE');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SERVIDOR CORRIENDO EN http://localhost:${PORT}`);
});