export default function UsuarioTable({ usuarios, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover mb-0">
        <thead className="table-dark">
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.codigo_usuario}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => onDelete(u.id)} className="btn btn-danger btn-sm">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {usuarios.length === 0 && (
        <div className="text-center p-4 text-muted">
          <i className="fas fa-inbox fa-2x mb-2"></i>
          <p>No hay usuarios registrados</p>
        </div>
      )}
    </div>
  );
}