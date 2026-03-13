import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        data_nascimento: "",
        pais: "",
        genero: ""
    })

    const navigate = useNavigate()

    const [message, setMessage] = useState("")
    const [users, setUsers] = useState([])
    const [editingID, setEditingID] = useState(null)

    function handleChange(event) {
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()

        if(!editingID) return

        const method = "PUT"
        const url = `http://localhost:5000/users/${editingID}`

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            setMessage("Usuário editado com sucesso!")

            setEditingID(null)

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

            const token = localStorage.getItem("token")

            const response = await fetch("http://localhost:5000/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }}
            )

            if(response.status === 401){
                localStorage.removeItem("token")
                return false
            }

            const data = await response.json()
            setUsers(data)
            return true

        } catch (error) {
            console.error("Erro ao buscar usuários", error)
            return false
        }
    }

    useEffect(() => {

        const token = localStorage.getItem("token")

        if(!token){
            navigate("/")
            return
        }

        async function loadUsers() {
            const isAuthorized = await fetchUsers()
            if(isAuthorized === false)
                navigate("/")
        }

        loadUsers()

        }, [navigate])

        async function handleDelete(id) {
            try {
                await fetch(`http://localhost:5000/users/${id}`, {
                    method: "DELETE"
                })

                await fetchUsers()

                setMessage("Usuário deletado com sucesso!")

            }catch(error) {
                console.error("Erro ao deletar usuário", error)
            }
        }

        async function handleUpdate(user) {
            setFormData({
                nome: user.nome,
                email: user.email,
                senha: "",
                data_nascimento: user.data_nascimento,
                pais: user.pais,
                genero: user.genero
            })

            setEditingID(user.id)
        }

        async function handleCancelEdit(){
            setEditingID(null)
            
            setFormData({
                nome: "",
                email: "",
                senha: "",
                data_nascimento: "",
                pais: "",
                genero: ""
            })
        }

        function handleLogout(){
            localStorage.removeItem("token")
            navigate("/")
        }

    return (
        <div>

            <button onClick={handleLogout}>Sair</button>
            <h1>Dashboard de usuários</h1>
            {message && <p>{message}</p>}

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

                <button type="submit" disabled={!editingID}>
                    Salvar alterações
                </button>

                {editingID && (
                    <button type="button" onClick={handleCancelEdit}>
                        Cancelar edição
                        </button>
                )}
            </form>

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
                                    <button onClick={() => handleUpdate(user)}>Editar</button>
                                    <button onClick={() => handleDelete(user.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}
