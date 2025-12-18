import api from "../services/api"

// Tipos de status que o backend aceita
type StatusBackend = "aberto" | "em_andamento" | "concluido"

type StatusDropdownProps = {
  currentStatus: StatusBackend
  onChange: (newStatus: StatusBackend) => void
  osId: string
}

function formatStatusForDisplay(status: StatusBackend): string {
  switch (status) {
    case "aberto":
      return "Aberto";
    case "em_andamento":
      return "Em Andamento";
    case "concluido":
      return "Concluído";
    default:
      return status;
  }
}

// 🎨 Função para obter cores profissionais baseadas no status
function getStatusClasses(status: StatusBackend): string {
  switch (status) {
    case "aberto":
      return "bg-red-100 text-red-800 border-red-400";
    case "em_andamento":
      return "bg-yellow-100 text-yellow-800 border-yellow-400";
    case "concluido":
      return "bg-green-100 text-green-800 border-green-400";
    default:
      return "bg-gray-100 text-gray-800 border-gray-400";
  }
}

export default function StatusDropdown({ currentStatus, onChange, osId }: StatusDropdownProps) {
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as StatusBackend;
    try {
      // Faz o PUT no backend para atualizar apenas o status
      await api.put(`/os/${osId}`, { status: newStatus })
      onChange(newStatus)
      alert(`Status da OS #${osId} alterado para ${formatStatusForDisplay(newStatus)}`)
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
      alert("Erro ao atualizar o status no servidor.")
    }
  }

  const dynamicClasses = `px-3 py-1 border rounded-lg text-sm font-bold shadow-sm focus:outline-none transition duration-150 ${getStatusClasses(currentStatus)}`;

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className={dynamicClasses}
    >
      <option value="aberto">Aberto</option>
      <option value="em_andamento">Em Andamento</option>
      <option value="concluido">Concluído</option>
    </select>
  )
}
