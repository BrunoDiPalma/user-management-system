import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'

import Cadastro from './pages/cadastro'
import Login from './pages/login'
import Dashboard from './pages/dashboard'

function App() {

  return (

    <BrowserRouter>

    <Routes>
      <Route path="/" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>

    </BrowserRouter>
  )
}

export default App
