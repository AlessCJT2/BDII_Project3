export default function PrestamoTable({ prestamos, onDevolver }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover mb-0">
        <thead className="table-warning">
          <tr>
            <th>Usuario</th>
            <th>ISBN</th>
            <th>Préstamo</th>
            <th>Devolución</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map(p => (
            <tr key={p.id}>
              <td>{p.codigo_usuario}</td>
              <td>{p.isbn}</td>
              <td>{p.fecha_prestamo}</td>
              <td>{p.fecha_devolucion || '-'}</td>
              <td>
                <span className={`badge ${p.estado === 'Prestado' ? 'bg-danger' : 'bg-success'}`}>
                  {p.estado}
                </span>
              </td>
              <td>
                {p.estado === 'Prestado' && (
                  <button onClick={() => onDevolver(p.id)} className="btn btn-success btn-sm">
                    <i className="fas fa-undo"></i> Devolver
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {prestamos.length === 0 && (
        <div className="text-center p-4 text-muted">
          <i className="fas fa-box-open fa-2x mb-2"></i>
          <p>No hay préstamos registrados</p>
        </div>
      )}
    </div>
  );
}