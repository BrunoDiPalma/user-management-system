import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const navigate = useNavigate();
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErro("");
  }

  async function handleLogin(event) {
    try {
      event.preventDefault();

      setLoading(true);

      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setErro(data.error || "E-mail ou senha incorretos!");
      }

      console.log(data);
    } catch (error) {
      console.error("Erro ao realizar login", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Digita seu e-mail e senha para iniciar sessão</h2>

      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="senha"
        placeholder="Senha"
        value={formData.senha}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Entrando" : "Entrar"}
      </button>

      {erro && <p>{erro}</p>}
    </form>
  );
}
