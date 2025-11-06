import { useState } from 'react';
import PrestamoForm from '../components/PrestamoForm';
import PrestamoTable from '../components/PrestamoTable';

export default function Prestamos() {
  const [prestamos, setPrestamos] = useState([
    { id: 1, codigo_usuario: 'U2025001', isbn: '978-3-16-148410-0', fecha_prestamo: '2025-11-01', fecha_devolucion: null, estado: 'Prestado' },
    { id: 2, codigo_usuario: 'U2025002', isbn: '978-0-13-468599-1', fecha_prestamo: '2025-10-30', fecha_devolucion: '2025-11-02', estado: 'Devuelto' }
  ]);

  const addPrestamo = (nuevo) => {
    setPrestamos([...prestamos, { ...nuevo, id: Date.now(), estado: 'Prestado' }]);
  };

  const devolverPrestamo = (id) => {
    setPrestamos(prestamos.map(p => 
      p.id === id 
        ? { ...p, fecha_devolucion: new Date().toISOString().split('T')[0], estado: 'Devuelto' } 
        : p
    ));
  };

  return (
    <div className="row">
      <div className="col-lg-5 mb-4">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0"><i className="fas fa-plus me-2"></i>Registrar Préstamo</h5>
          </div>
          <div className="card-body">
            <PrestamoForm onAdd={addPrestamo} />
          </div>
        </div>
      </div>
      <div className="col-lg-7">
        <div className="card shadow-sm">
          <div className="card-header bg-warning text-dark">
            <h5 className="mb-0"><i className="fas fa-list-alt me-2"></i>Historial de Préstamos</h5>
          </div>
          <div className="card-body p-0">
            <PrestamoTable prestamos={prestamos} onDevolver={devolverPrestamo} />
          </div>
        </div>
      </div>
    </div>
  );
}