import { useState } from "react"
import Navbar from "../components/NavBar"
import api from "../services/api"
import { useNavigate } from "react-router-dom"
import { getAuth } from "firebase/auth"

export default function NewOS() {
  const [cliente, setCliente] = useState("")
  const [descricao, setDescricao] = useState("")
  const [placa, setPlaca] = useState("")
  const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user) {
        alert("Você precisa estar logado para criar uma OS")
        return
      }

      // 🎯 Garantimos que os dados batem com o que o DB espera
      await api.post("/os", {
        cliente_nome: cliente,
        veiculo_placa: placa.toUpperCase(), // Tarefa F: Sempre maiúsculo
        problema: descricao,
        status: "aberto", // 🎯 Define o status inicial automático
        tecnico_id: user.uid,
      })
      
      alert("OS criada com sucesso!")
      navigate("/dashboard")
    } catch (error) {
      console.error("Erro ao criar OS:", error)
      alert("Erro ao criar OS. Verifique se o servidor backend está ligado.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8 max-w-xl mx-auto">
        <form className="bg-white p-8 rounded-xl shadow-xl space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Nova Ordem de Serviço</h2>
          <input
            type="text"
            placeholder="Nome do cliente"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
          <input
            type="text"
            placeholder="Placa do veículo"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg uppercase"
            value={placa}
            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
          />
          <textarea
            placeholder="Descrição do serviço"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
          />
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-md">
            Criar OS
          </button>
        </form>
      </div>
    </div>
  )
}
