import { useState } from 'react';

export default function PrestamoForm({ onAdd }) {
  const [form, setForm] = useState({
    codigo_usuario: '',
    isbn: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, fecha_prestamo: new Date().toISOString().split('T')[0] });
    setForm({ codigo_usuario: '', isbn: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input 
          name="codigo_usuario" 
          value={form.codigo_usuario} 
          onChange={handleChange} 
          placeholder="Código de usuario (ej: U2025001)" 
          className="form-control" 
          required 
        />
      </div>
      <div className="mb-3">
        <input 
          name="isbn" 
          value={form.isbn} 
          onChange={handleChange} 
          placeholder="ISBN del libro" 
          className="form-control" 
          required 
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        <i className="fas fa-paper-plane me-2"></i>Prestar Libro
      </button>
    </form>
  );
}