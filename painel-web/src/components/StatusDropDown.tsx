import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { ChevronDown, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export interface StatusDropdownProps {
  currentStatus: string;
  osId: string;
  onChange: (newStatus: string) => void;
}

const statusOptions = [
  { value: 'aberto', label: 'Aberto', color: 'text-red-600', icon: <AlertCircle size={14} /> },
  { value: 'em_andamento', label: 'Em andamento', color: 'text-amber-600', icon: <Clock size={14} /> },
  { value: 'concluido', label: 'Concluído', color: 'text-green-600', icon: <CheckCircle2 size={14} /> },
];

const StatusDropdown: React.FC<StatusDropdownProps> = ({ currentStatus, osId, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsOpen(false);
    if (newStatus === currentStatus) return;

    // 🛡️ TÁTICA: Usando o endpoint de PUT geral que confirmamos estar funcionando
    await toast.promise(
      api.put(`/os/${osId}`, { status: newStatus }), 
      {
        loading: 'Sincronizando...',
        success: () => {
          onChange(newStatus);
          return `Status: ${newStatus.replace('_', ' ')}`;
        },
        error: 'Erro ao conectar com o servidor.',
      }
    );
  };

  const activeStatus = statusOptions.find(opt => opt.value === currentStatus) || statusOptions[0];

  return (
    <div className="relative inline-block w-full sm:w-60">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white hover:border-blue-300 transition-all font-black ${activeStatus.color} shadow-sm uppercase italic text-[11px] tracking-widest`}
      >
        <div className="flex items-center gap-2">
          {activeStatus.icon}
          {activeStatus.label}
        </div>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          
          {/* 🛡️ AJUSTE DE UI: "bottom-full mb-2" faz o menu abrir para CIMA se estiver no fim da página */}
          <div className="absolute bottom-full mb-2 left-0 w-full rounded-2xl bg-white shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in slide-in-from-bottom-2 duration-200 origin-bottom">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleStatusChange(option.value)}
                className={`flex items-center gap-3 w-full px-5 py-4 text-xs font-black transition-colors hover:bg-gray-50 border-b border-gray-50 last:border-0 ${option.color} uppercase italic`}
              >
                {option.icon}
                {option.label}
                {currentStatus === option.value && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-current animate-ping" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StatusDropdown;


// import api from "../services/api"

// // Tipos de status que o backend aceita
// type StatusBackend = "aberto" | "em_andamento" | "concluido"

// type StatusDropdownProps = {
//   currentStatus: StatusBackend
//   onChange: (newStatus: StatusBackend) => void
//   osId: string
// }

// function formatStatusForDisplay(status: StatusBackend): string {
//   switch (status) {
//     case "aberto":
//       return "Aberto";
//     case "em_andamento":
//       return "Em Andamento";
//     case "concluido":
//       return "Concluído";
//     default:
//       return status;
//   }
// }

// // 🎨 Função para obter cores profissionais baseadas no status
// function getStatusClasses(status: StatusBackend): string {
//   switch (status) {
//     case "aberto":
//       return "bg-red-100 text-red-800 border-red-400";
//     case "em_andamento":
//       return "bg-yellow-100 text-yellow-800 border-yellow-400";
//     case "concluido":
//       return "bg-green-100 text-green-800 border-green-400";
//     default:
//       return "bg-gray-100 text-gray-800 border-gray-400";
//   }
// }

// export default function StatusDropdown({ currentStatus, onChange, osId }: StatusDropdownProps) {
//   const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newStatus = e.target.value as StatusBackend;
//     try {
//       // Faz o PUT no backend para atualizar apenas o status
//       await api.put(`/os/${osId}`, { status: newStatus })
//       onChange(newStatus)
//       alert(`Status da OS #${osId} alterado para ${formatStatusForDisplay(newStatus)}`)
//     } catch (error) {
//       console.error("Erro ao atualizar status:", error)
//       alert("Erro ao atualizar o status no servidor.")
//     }
//   }

//   const dynamicClasses = `px-3 py-1 border rounded-lg text-sm font-bold shadow-sm focus:outline-none transition duration-150 ${getStatusClasses(currentStatus)}`;

//   return (
//     <select
//       value={currentStatus}
//       onChange={handleChange}
//       className={dynamicClasses}
//     >
//       <option value="aberto">Aberto</option>
//       <option value="em_andamento">Em Andamento</option>
//       <option value="concluido">Concluído</option>
//     </select>
//   )
// }
