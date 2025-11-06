import { useState } from 'react';

export default function LibroForm({ onAdd }) {
  const [form, setForm] = useState({
    isbn: '', titulo: '', autor: '', categoria: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ isbn: '', titulo: '', autor: '', categoria: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input name="isbn" value={form.isbn} onChange={handleChange} placeholder="ISBN" className="form-control" required />
      </div>
      <div className="mb-3">
        <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" className="form-control" required />
      </div>
      <div className="mb-3">
        <input name="autor" value={form.autor} onChange={handleChange} placeholder="Autor" className="form-control" required />
      </div>
      <div className="mb-3">
        <input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoría" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        <i className="fas fa-save"></i> Guardar
      </button>
    </form>
  );
}