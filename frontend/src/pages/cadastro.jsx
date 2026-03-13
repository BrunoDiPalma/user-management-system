import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro(){

    const navigate = useNavigate()

    const [erro, setErro] = useState("")
    
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        data_nascimento: "",
        pais: "",
        genero: ""
    })

    function mostrarErro(mensagem){
        setErro(mensagem)

        setTimeout(() => {
            setErro("")
        }, 3000)
    }

    function handleChange(event){
        const { name , value } = event.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()

        if (Object.values(formData).some(value => !value)) {
            mostrarErro("Preencha todos os campos!")
    return
}

        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
        })

        const data = await response.json()

        if(response.ok){
            console.log("Usuário cadastrado:", data)
            navigate("/login")
        } else {
            mostrarErro(data.error || "Erro ao cadastrar usuário")
        }

        console.log(data)

        } catch (error) {
            console.error("Erro ao cadastrar usuário", error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>

        <div>
            <h1>Crie sua conta</h1>

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
            placeholder="Digite sua data de nascimento"
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

            <select name="genero"
            value= {formData.genero}
            onChange={handleChange}>

                <option value="">Selecione o seu gênero</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
            </select>

            {erro && <p>{erro}</p>}

            <button type ="submit">
            Criar cadastro
        </button>

            <button type="button" onClick={() => navigate("/login")}>
            Já tenho conta
        </button>
        </div>
        </form>
    )
}