import { useState, useEffect } from 'react';

export default function Prestamos() {
  const [usuarios, setUsuarios] = useState([]);
  const [libros, setLibros] = useState([]);
  const [prestamos, setPrestamos] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [isbn, setIsbn] = useState('');
  const [loading, setLoading] = useState(false);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [resU, resL] = await Promise.all([
        fetch('http://localhost:5000/api/usuarios'),
        fetch('http://localhost:5000/api/libros')
      ]);
      if (!resU.ok || !resL.ok) throw new Error('Error en respuesta');
      const usuariosData = await resU.json();
      const librosData = await resL.json();
      setUsuarios(usuariosData);
      setLibros(librosData);

      // Préstamos embebidos
      const todos = usuariosData.flatMap(u => 
        (u.prestamos_actuales || []).map(p => ({
          ...p,
          codigo_usuario: u.codigo_usuario,
          nombre_usuario: u.nombre
        }))
      );
      setPrestamos(todos);
    } catch (error) {
      console.error('Error cargarDatos:', error);
      alert('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const prestar = async () => {
    if (!codigo || !isbn) return alert('Selecciona usuario y libro');
    try {
      const res = await fetch('http://localhost:5000/api/usuarios/prestar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo_usuario: codigo, isbn })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Libro prestado');
        cargarDatos();
      } else {
        alert(data.message || 'Error al prestar');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  const devolver = async (codigo_usuario, isbn) => {
    try {
      const res = await fetch('http://localhost:5000/api/usuarios/devolver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo_usuario, isbn })
      });
      if (res.ok) {
        alert('Libro devuelto');
        cargarDatos();
      } else {
        alert('Error al devolver');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  return (
    <div className="row">
      <div className="col-md-5">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h5>Registrar Préstamo</h5>
          </div>
          <div className="card-body">
            <button onClick={cargarDatos} className="btn btn-outline-secondary w-100 mb-3">Recargar Datos</button>
            <select className="form-control mb-3" value={codigo} onChange={e => setCodigo(e.target.value)}>
              <option value="">Usuario</option>
              {usuarios.map(u => <option key={u._id} value={u.codigo_usuario}>{u.nombre}</option>)}
            </select>
            <select className="form-control mb-3" value={isbn} onChange={e => setIsbn(e.target.value)}>
              <option value="">Libro</option>
              {libros.map(l => <option key={l._id} value={l.isbn}>{l.titulo}</option>)}
            </select>
            <button onClick={prestar} className="btn btn-success w-100">Prestar</button>
          </div>
        </div>
      </div>
      <div className="col-md-7">
        <div className="card">
          <div className="card-header bg-warning">
            <h5>Préstamos</h5>
          </div>
          <div className="card-body">
            <table className="table">
              <thead><tr><th>Usuario</th><th>Libro</th><th>Fecha</th><th>Acción</th></tr></thead>
              <tbody>
                {prestamos.map((p, i) => (
                  <tr key={i}>
                    <td>{p.nombre_usuario}</td>
                    <td>{p.titulo}</td>
                    <td>{new Date(p.fecha_prestamo).toLocaleDateString()}</td>
                    <td><button onClick={() => devolver(p.codigo_usuario, p.libro_isbn)} className="btn btn-danger btn-sm">Devolver</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}