import { useState } from "react"

type FilterBarProps = {
  onFilter: (status?: string, veiculo_placa?: string) => void
}

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [status, setStatus] = useState("")
  const [placa, setPlaca] = useState("")

  const aplicarFiltro = () => {
    onFilter(status || undefined, placa || undefined)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <select
        className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Todos os status</option>
        <option value="aberto">Aberto</option>
        <option value="em_andamento">Em andamento</option>
        <option value="concluido">Concluído</option>
      </select>

      <input
        type="text"
        placeholder="Filtrar por placa"
        className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto focus:ring-blue-500 focus:border-blue-500"
        value={placa}
        onChange={(e) => setPlaca(e.target.value.toUpperCase())}
      />

      <button
        onClick={aplicarFiltro}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-150 shadow-md font-medium"
      >
        Aplicar Filtros
      </button>
    </div>
  )
}
