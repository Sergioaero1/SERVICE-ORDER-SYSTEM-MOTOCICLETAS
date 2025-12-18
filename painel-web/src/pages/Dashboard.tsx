import { useEffect, useState } from "react"
import OSCard from "../components/OSCard"
import FilterBar from "../components/FilterBar"
import Navbar from "../components/NavBar"
import api from "../services/api"

type OS = {
  id: string
  cliente_nome: string
  problema: string
  veiculo_placa: string
  status: string
  tecnico_id: string
}

export default function Dashboard() {
  const [ordens, setOrdens] = useState<OS[]>([])

  const fetchOS = async (status?: string, placa?: string) => {
    try {
      const response = await api.get("/os", {
        params: {
          status: status || undefined,
          veiculo_placa: placa || undefined,
        },
      })
      setOrdens(response.data)
    } catch (error) {
      console.error("Erro ao buscar OSs:", error)
    }
  }

  useEffect(() => {
    fetchOS()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100"> 
      <Navbar />
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Ordens de Serviço</h1>

        <FilterBar onFilter={fetchOS} />

        <div className="grid gap-4 mt-6">
          {ordens.map((os) => (
            <OSCard
              key={os.id}
              id={os.id}
              cliente={os.cliente_nome}
              status={os.status}
              tecnico={os.tecnico_id}
              problema={os.problema}
              placa={os.veiculo_placa}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
