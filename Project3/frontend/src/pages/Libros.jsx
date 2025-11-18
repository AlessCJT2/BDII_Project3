import { useState, useEffect } from 'react';

export default function Libros() {
  const [libros, setLibros] = useState([]);
  const [form, setForm] = useState({
    isbn: '',
    titulo: '',
    autor: '',
    categoria: '',
    anio_publicacion: '',
    cantidad_total: ''
  });

  const cargarLibros = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/libros');
      if (!res.ok) throw new Error('Error en respuesta');
      const data = await res.json();
      setLibros(data);
    } catch (error) {
      alert('Error al cargar libros');
      console.error(error);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/libros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setForm({
          isbn: '',
          titulo: '',
          autor: '',
          categoria: '',
          anio_publicacion: '',
          cantidad_total: ''
        });
        cargarLibros();
      } else {
        const err = await res.json();
        alert(err.message || 'Error al guardar');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar?')) return;
    try {
      await fetch(`http://localhost:5000/api/libros/${id}`, { method: 'DELETE' });
      cargarLibros();
    } catch (error) {
      alert('Error al eliminar');
    }
  };

  return (
    <div className="row">
      <div className="col-md-5">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h5>Insertar Libro</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <input
                placeholder="ISBN"
                className="form-control mb-2"
                value={form.isbn}
                onChange={e => setForm({ ...form, isbn: e.target.value })}
                required
              />
              <input
                placeholder="Título"
                className="form-control mb-2"
                value={form.titulo}
                onChange={e => setForm({ ...form, titulo: e.target.value })}
                required
              />
              <input
                placeholder="Autor"
                className="form-control mb-2"
                value={form.autor}
                onChange={e => setForm({ ...form, autor: e.target.value })}
                required
              />
              <input
                placeholder="Categoría"
                className="form-control mb-2"
                value={form.categoria}
                onChange={e => setForm({ ...form, categoria: e.target.value })}
              />
              <input
                type="number"
                placeholder="Año"
                className="form-control mb-2"
                value={form.anio_publicacion}
                onChange={e => setForm({ ...form, anio_publicacion: e.target.value })}
              />
              <input
                type="number"
                placeholder="Cantidad"
                className="form-control mb-3"
                value={form.cantidad_total}
                onChange={e => setForm({ ...form, cantidad_total: e.target.value })}
              />
              <button type="submit" className="btn btn-success w-100">
                Guardar Libro
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="col-md-7">
        <div className="card">
          <div className="card-header bg-success text-white d-flex justify-content-between">
            <h5>Lista de Libros</h5>
            <button onClick={cargarLibros} className="btn btn-light btn-sm">
              Recargar
            </button>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th>ISBN</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {libros.length === 0 ? (
                  <tr><td colSpan="4" className="text-center">No hay libros</td></tr>
                ) : (
                  libros.map(l => (
                    <tr key={l._id}>
                      <td>{l.isbn}</td>
                      <td>{l.titulo}</td>
                      <td>{l.autor}</td>
                      <td>
                        <button onClick={() => eliminar(l._id)} className="btn btn-danger btn-sm">
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}