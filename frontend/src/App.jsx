import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Libros from './pages/Libros';
import Usuarios from './pages/Usuarios';
import Prestamos from './pages/Prestamos'; // ← NUEVO MÓDULO

export default function App() {
  return (
    <Router>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <i className="fas fa-book me-2"></i>Biblioteca Digital
          </Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/libros">
              <i className="fas fa-book me-2"></i>Libros
            </Link>
            <Link className="nav-link" to="/usuarios">
              <i className="fas fa-users me-2"></i>Usuarios
            </Link>
            <Link className="nav-link" to="/prestamos">
              <i className="fas fa-handshake me-2"></i>Préstamos
            </Link>
          </div>
        </div>
      </nav>

      {/* CONTENIDO */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Libros />} />
          <Route path="/libros" element={<Libros />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/prestamos" element={<Prestamos />} />
        </Routes>
      </div>
    </Router>
  );
}