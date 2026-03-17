import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserForm from "../components/UserForm";
import UsersTable from "../components/UsersTable";

import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    data_nascimento: "",
    pais: "",
    genero: "",
  });

  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [editingID, setEditingID] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!editingID) return;

    const url = `http://localhost:5000/users/${editingID}`;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário");
      }

      await response.json();

      setMessage("Usuário editado com sucesso!");
      setEditingID(null);

      setTimeout(() => {
        setMessage("");
      }, 3000);

      setFormData({
        nome: "",
        email: "",
        senha: "",
        data_nascimento: "",
        pais: "",
        genero: "",
      });

      await fetchUsers();
    } catch (error) {
      console.error("Erro ao atualizar usuário", error);
    }
  }

  async function fetchUsers() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        return false;
      }

      const data = await response.json();
      setUsers(data);

      return true;
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
      return false;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    async function loadUsers() {
      const isAuthorized = await fetchUsers();

      if (isAuthorized === false) {
        navigate("/");
      }
    }

    loadUsers();
  }, [navigate]);

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchUsers();

      setMessage("Usuário deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar usuário", error);
    }
  }

  function handleUpdate(user) {
    setFormData({
      nome: user.nome,
      email: user.email,
      senha: "",
      data_nascimento: user.data_nascimento,
      pais: user.pais,
      genero: user.genero,
    });

    setEditingID(user.id);
  }

  function handleCancelEdit() {
    setEditingID(null);

    setFormData({
      nome: "",
      email: "",
      senha: "",
      data_nascimento: "",
      pais: "",
      genero: "",
    });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="dashboard-container">
      <button className="exit-button" onClick={handleLogout}>Sair</button>

      <h1>Dashboard de usuários</h1>

      {message && <p>{message}</p>}

      <UserForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingID={editingID}
        handleCancelEdit={handleCancelEdit}
      />

      <UsersTable
        users={users}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
}
