export default function UsersTable({ users, handleUpdate, handleDelete }) {
  return (
    <>
      <div>
        <h2>Usuários cadastrados</h2>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Gênero</th>
              <th>País</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.genero}</td>
                <td>{user.pais}</td>

                <td>
                  <button className="table-button" onClick={() => handleUpdate(user)}>Editar</button>

                  <button className="table-button" onClick={() => handleDelete(user.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
