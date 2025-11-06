import { useState } from 'react';
import UsuarioForm from '../components/UsuarioForm';
import UsuarioTable from '../components/UsuarioTable';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, codigo_usuario: 'U2025001', nombre: 'Ana López', email: 'ana@universidad.edu', telefono: '555-1234' },
    { id: 2, codigo_usuario: 'U2025002', nombre: 'Carlos Pérez', email: 'carlos@universidad.edu', telefono: '555-5678' }
  ]);

  const addUsuario = (nuevo) => {
    setUsuarios([...usuarios, { ...nuevo, id: Date.now() }]);
  };

  const deleteUsuario = (id) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  return (
    <div className="row">
      <div className="col-lg-5 mb-4">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0"><i className="fas fa-plus me-2"></i>Insertar Usuario</h5>
          </div>
          <div className="card-body">
            <UsuarioForm onAdd={addUsuario} />
          </div>
        </div>
      </div>
      <div className="col-lg-7">
        <div className="card shadow-sm">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0"><i className="fas fa-list me-2"></i>Lista de Usuarios</h5>
          </div>
          <div className="card-body p-0">
            <UsuarioTable usuarios={usuarios} onDelete={deleteUsuario} />
          </div>
        </div>
      </div>
    </div>
  );
}   