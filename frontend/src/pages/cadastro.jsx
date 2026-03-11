import { useState, useEffect } from "react"

export default function Cadastro() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        data_nascimento: "",
        pais: "",
        genero: ""
        
    })

    const [message, setMessage] = useState("")
    const [users, setUsers] = useState([])

    function handleChange(event) {
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            setMessage("Usuário criado com sucesso!")

            setTimeout(() => {
                setMessage("")
            }, 3000)

            console.log(data)

            setFormData({
                nome: "",
                email: "",
                senha: "",
                data_nascimento: "",
                pais: "",
                genero: ""
            })

            await fetchUsers()

        } catch(error) {
            console.error("Erro ao cadastrar usuário", error)
        }
    }

    async function fetchUsers() {
        try {
            const response = await fetch("http://localhost:5000/users")
            const data = await response.json()

            setUsers(data)
        } catch (error) {
            console.error("Erro ao buscar usuários", error)
        }
    }

    useEffect(() => {
            fetchUsers()
        }, [])

    return (
        <div>
            <h1>Cadastro de usuário</h1>
            {message && <p>{message}</p>}

            <h2>Usuários cadastrados</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.nome} - {user.email} - {user.genero}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleChange}
                />

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

                <input
                    type="date"
                    name="data_nascimento"
                    value={formData.data_nascimento}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="pais"
                    placeholder="País"
                    value={formData.pais}
                    onChange={handleChange}
                />

                <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                >
                    <option value="">Selecione o gênero</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                </select>

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}
