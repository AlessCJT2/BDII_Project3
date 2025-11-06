import { useState } from 'react';
import LibroForm from '../components/LibroForm';
import LibroTable from '../components/LibroTable';

export default function Libros() {
  const [libros, setLibros] = useState([
    { id: 1, isbn: '978-3-16-148410-0', titulo: 'Clean Code', autor: 'Robert C. Martin' },
    { id: 2, isbn: '978-0-13-468599-1', titulo: 'Effective Java', autor: 'Joshua Bloch' }
  ]);

  const addLibro = (nuevo) => {
    setLibros([...libros, { ...nuevo, id: Date.now() }]);
  };

  const deleteLibro = (id) => {
    setLibros(libros.filter(l => l.id !== id));
  };

  return (
    <div className="row">
      <div className="col-md-5">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h5><i className="fas fa-plus"></i> Insertar Libro</h5>
          </div>
          <div className="card-body">
            <LibroForm onAdd={addLibro} />
          </div>
        </div>
      </div>
      <div className="col-md-7">
        <div className="card">
          <div className="card-header bg-success text-white">
            <h5><i className="fas fa-list"></i> Lista de Libros</h5>
          </div>
          <div className="card-body">
            <LibroTable libros={libros} onDelete={deleteLibro} />
          </div>
        </div>
      </div>
    </div>
  );
}