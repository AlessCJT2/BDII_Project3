import { useState, useEffect } from 'react';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    codigo_usuario: '',
    nombre: '',
    email: '',
    telefono: ''
  });

  const cargarUsuarios = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/usuarios');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      alert('Error al cargar usuarios');
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setForm({ codigo_usuario: '', nombre: '', email: '', telefono: '' });
        cargarUsuarios();
      } else {
        const err = await res.json();
        alert(err.message);
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  return (
    <div className="row">
      <div className="col-md-5">
        <div className="card">
          <div className="card-header bg-info text-white">
            <h5>Insertar Usuario</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Código (U2025001)"
                className="form-control mb-2"
                value={form.codigo_usuario}
                onChange={e => setForm({ ...form, codigo_usuario: e.target.value })}
                required
              />
              <input
                placeholder="Nombre"
                className="form-control mb-2"
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="form-control mb-2"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                placeholder="Teléfono"
                className="form-control mb-3"
                value={form.telefono}
                onChange={e => setForm({ ...form, telefono: e.target.value })}
              />
              <button type="submit" className="btn btn-info w-100 text-white">
                Guardar Usuario
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="col-md-7">
        <div className="card">
          <div className="card-header bg-warning text-dark">
            <h5>Lista de Usuarios</h5>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u._id}>
                    <td>{u.codigo_usuario}</td>
                    <td>{u.nombre}</td>
                    <td>{u.email}</td>
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