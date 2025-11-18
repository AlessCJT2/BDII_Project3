import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Libros from './pages/Libros';
import Usuarios from './pages/Usuarios';
import Prestamos from './pages/Prestamos';

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">Biblioteca Digital</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/libros">Libros</Link>
            <Link className="nav-link" to="/usuarios">Usuarios</Link>
            <Link className="nav-link" to="/prestamos">Préstamos</Link>
          </div>
        </div>
      </nav>

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