import { useState } from 'react';

export default function UsuarioForm({ onAdd }) {
  const [form, setForm] = useState({
    codigo_usuario: '', nombre: '', email: '', telefono: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ codigo_usuario: '', nombre: '', email: '', telefono: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input name="codigo_usuario" value={form.codigo_usuario} onChange={handleChange} placeholder="Código" className="form-control" required />
      </div>
      <div className="mb-3">
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="form-control" required />
      </div>
      <div className="mb-3">
        <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="form-control" required />
      </div>
      <div className="mb-3">
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        <i className="fas fa-save me-2"></i>Guardar Usuario
      </button>
    </form>
  );
}