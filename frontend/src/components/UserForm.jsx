export default function UserForm({
  formData,
  handleChange,
  handleSubmit,
  editingID,
  handleCancelEdit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input className="form-input"
        type="text"
        name="nome"
        placeholder="Nome"
        value={formData.nome}
        onChange={handleChange}
      />

      <input className="form-input"
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
      />

      <input className="form-input"
        type="password"
        name="senha"
        placeholder="Senha"
        value={formData.senha}
        onChange={handleChange}
      />

      <input className="form-input"
        type="date"
        name="data_nascimento"
        value={formData.data_nascimento}
        onChange={handleChange}
      />

      <input className="form-input"
        type="text"
        name="pais"
        placeholder="País"
        value={formData.pais}
        onChange={handleChange}
      />

      <select className="select-input" name="genero" value={formData.genero} onChange={handleChange}>
        <option value="">Selecione o gênero</option>
        <option value="Masculino">Masculino</option>
        <option value="Feminino">Feminino</option>
        <option value="Outro">Outro</option>
      </select>

      <button className="button-dashboard" type="submit" disabled={!editingID}>
        Salvar alterações
      </button>

      {editingID && (
        <button className="button-dashboard" type="button" onClick={handleCancelEdit}>
          Cancelar edição
        </button>
      )}
    </form>
  );
}
