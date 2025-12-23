import { Link } from 'react-router-dom';
// Troque Tool por Wrench
import { User, Clipboard, Wrench, CheckCircle, ChevronRight, Hash } from 'lucide-react';


type OSCardProps = {
  id: string;
  cliente: string;
  status: string;
  tecnico: string;
  problema: string;
  placa: string;
};

// Mapeamento de estilos para facilitar a manutenção
const statusConfig: Record<string, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  aberto: { 
    label: "Aberto", 
    color: "text-red-700", 
    bg: "bg-red-50", 
    border: "border-l-red-500",
    icon: <Clipboard size={14} />
  },
  em_andamento: { 
    label: "Em andamento", 
    color: "text-amber-700", 
    bg: "bg-amber-50", 
    border: "border-l-amber-500",
    icon: <Wrench size={14} /> 
  },
  concluido: { 
    label: "Concluído", 
    color: "text-green-700", 
    bg: "bg-green-50", 
    border: "border-l-green-500",
    icon: <CheckCircle size={14} />
  }
};

export default function OSCard({ id, cliente, status, tecnico, problema, placa }: OSCardProps) {
  const config = statusConfig[status] || { 
    label: status, 
    color: "text-gray-700", 
    bg: "bg-gray-50", 
    border: "border-l-gray-400",
    icon: <Clipboard size={14} />
  };

  return (
    <Link to={`/os/${id}`} className="group block mb-1">
      <div className={`
        relative overflow-hidden
        p-5 bg-white border border-gray-200 
        ${config.border} border-l-4 rounded-r-xl shadow-sm 
        transition-all duration-200 
        group-hover:shadow-md group-hover:translate-x-1
        flex justify-between items-center
      `}>
        
        <div className="space-y-3 flex-1">
          {/* Header do Card: ID e Status */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[10px] font-mono font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">
             <Hash size={10} /> 
             {String(id || "000000").slice(-6).toUpperCase()}
            </span>
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${config.bg} ${config.color}`}>
              {config.icon}
              {config.label}
            </span>
          </div>

          {/* Informações Principais */}
          <div>
            <h3 className="flex items-center gap-2 text-xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
              <User size={20} className="text-gray-400" />
              {cliente}
            </h3>
            
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <div className="bg-slate-900 text-white px-3 py-1 rounded border-b-2 border-blue-500 font-mono text-sm font-bold tracking-widest shadow-inner">
                {placa}
              </div>
              <p className="text-sm text-gray-500 line-clamp-1 italic max-w-sm">
                "{problema}"
              </p>
            </div>
          </div>

          {/* Rodapé do Card: Técnico */}
          <div className="flex items-center gap-2 pt-1 border-t border-gray-50 text-[11px] text-gray-400 uppercase font-semibold">
            <Wrench size={12} />
            <span>Técnico Responsável: <span className="text-gray-600">{tecnico}</span></span>
          </div>
        </div>

        {/* Indicador de Ação */}
        <div className="ml-4 p-2 rounded-full bg-gray-50 text-gray-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
          <ChevronRight size={24} />
        </div>
      </div>
    </Link>
  );
}



// import { Link } from 'react-router-dom';

// type OSCardProps = {
//   id: string;
//   cliente: string;
//   status: string;
//   tecnico: string;
//   problema: string;
//   placa: string;
// };

// function formatStatus(status: string): string {
//   switch (status) {
//     case "aberto": return "Aberto";
//     case "em_andamento": return "Em andamento";
//     case "concluido": return "Concluído";
//     default: return status;
//   }
// }

// function getStatusClasses(status: string): string {
//   switch (status) {
//     case "aberto": return "bg-red-200 text-red-800";
//     case "em_andamento": return "bg-yellow-200 text-yellow-800";
//     case "concluido": return "bg-green-200 text-green-800";
//     default: return "bg-gray-200 text-gray-800";
//   }
// }

// // Substitua o retorno do seu OSCard por esta estrutura para maior clareza visual
// export default function OSCard({ id, cliente, status, tecnico, problema, placa }: OSCardProps) {
//   const statusColors: Record<string, string> = {
//     aberto: "border-l-red-500",
//     em_andamento: "border-l-yellow-500",
//     concluido: "border-l-green-500",
//   };

//   return (
//     <Link to={`/os/${id}`} className="group block">
//       <div className={`p-5 border border-gray-200 border-l-4 ${statusColors[status] || 'border-l-gray-400'} rounded-r-xl bg-white shadow-sm group-hover:shadow-md transition-all duration-200 flex justify-between items-center`}>
//         <div className="space-y-1">
//           <div className="flex items-center gap-2">
//             <span className="text-[10px] font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-500 uppercase tracking-wider">OS {id.slice(-5)}</span>
//             <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${getStatusClasses(status)}`}>
//               {formatStatus(status)}
//             </span>
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 leading-tight">{cliente}</h3>
//           <div className="flex items-center gap-3 mt-1">
//             <span className="font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 text-sm font-bold">
//               {placa}
//             </span>
//             <span className="text-sm text-gray-500 truncate max-w-[200px]">{problema}</span>
//           </div>
//         </div>
//         <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
//           <ChevronRightIcon className="w-6 h-6" /> {/* Necessário importar do Lucide ou similar */}
//         </div>
//       </div>
//     </Link>
//   );
// }

// =====================================================================================================================================

// export default function OSCard({ id, cliente, status, tecnico, problema, placa }: OSCardProps) {
//   return (
//     <Link to={`/os/${id}`} className="block">
//       <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-150 cursor-pointer flex justify-between items-start">
//         <div>
//           <p className="text-xs text-gray-400 font-mono">OS #{id}</p>
//           <p className="text-lg font-bold text-gray-800 mt-1">{cliente}</p>
//           <p className="text-md text-blue-600 font-semibold uppercase">Placa: {placa}</p>
          
//           <p className="text-gray-600 mt-2 line-clamp-2 max-w-md">
//             <span className="font-medium text-gray-700">Problema:</span> {problema}
//           </p>
//           <p className="text-xs text-gray-400 mt-2 italic">Técnico ID: {tecnico}</p>
//         </div>
        
//         <span className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap shadow-sm ${getStatusClasses(status)}`}>
//           {formatStatus(status)}
//         </span>
//       </div>
//     </Link>
//   );
// }
