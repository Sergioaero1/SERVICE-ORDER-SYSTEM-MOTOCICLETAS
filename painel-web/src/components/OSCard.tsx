import { Link } from 'react-router-dom';
import { User, Clipboard, Wrench, CheckCircle, ChevronRight, Hash } from 'lucide-react';

type OSCardProps = {
  id: string;
  cliente: string;
  status: string;
  tecnico: string; // Este é o UID que vem do banco
  problema: string;
  placa: string;
};

// 🛠️ MAPEADOR DE TÉCNICOS (Adicione novos UIDs aqui conforme necessário)
const MAPA_TECNICOS: Record<string, string> = {
  "S6p7sjZr4RhsTQnpgE2HVTsaMmJ2": "Mestre Sergioaero",
  "UID_DE_OUTRO_TECNICO": "Mecânico Auxiliar",
};

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

  // Resolve o nome do técnico ou mostra um pedaço do ID se não encontrar no mapa
  const nomeExibicaoTecnico = MAPA_TECNICOS[tecnico] || `Técnico ID: ${String(tecnico).slice(0, 6)}...`;

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
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[10px] font-mono font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">
              <Hash size={10} /> {String(id || "000000").slice(-6).toUpperCase()}
            </span>
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${config.bg} ${config.color}`}>
              {config.icon}
              {config.label}
            </span>
          </div>

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

          {/* Rodapé do Card: AGORA COM NOME AMIGÁVEL */}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-50 text-[11px] text-gray-400 uppercase font-bold tracking-tight">
            <Wrench size={12} className="text-blue-500" />
            <span>Responsável: <span className="text-blue-600 font-black">{nomeExibicaoTecnico}</span></span>
          </div>
        </div>

        <div className="ml-4 p-2 rounded-full bg-gray-50 text-gray-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
          <ChevronRight size={24} />
        </div>
      </div>
    </Link>
  );
}



// import { Link } from 'react-router-dom';
// // Troque Tool por Wrench
// import { User, Clipboard, Wrench, CheckCircle, ChevronRight, Hash } from 'lucide-react';


// type OSCardProps = {
//   id: string;
//   cliente: string;
//   status: string;
//   tecnico: string;
//   problema: string;
//   placa: string;
// };

// // Mapeamento de estilos para facilitar a manutenção
// const statusConfig: Record<string, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
//   aberto: { 
//     label: "Aberto", 
//     color: "text-red-700", 
//     bg: "bg-red-50", 
//     border: "border-l-red-500",
//     icon: <Clipboard size={14} />
//   },
//   em_andamento: { 
//     label: "Em andamento", 
//     color: "text-amber-700", 
//     bg: "bg-amber-50", 
//     border: "border-l-amber-500",
//     icon: <Wrench size={14} /> 
//   },
//   concluido: { 
//     label: "Concluído", 
//     color: "text-green-700", 
//     bg: "bg-green-50", 
//     border: "border-l-green-500",
//     icon: <CheckCircle size={14} />
//   }
// };

// export default function OSCard({ id, cliente, status, tecnico, problema, placa }: OSCardProps) {
//   const config = statusConfig[status] || { 
//     label: status, 
//     color: "text-gray-700", 
//     bg: "bg-gray-50", 
//     border: "border-l-gray-400",
//     icon: <Clipboard size={14} />
//   };

//   return (
//     <Link to={`/os/${id}`} className="group block mb-1">
//       <div className={`
//         relative overflow-hidden
//         p-5 bg-white border border-gray-200 
//         ${config.border} border-l-4 rounded-r-xl shadow-sm 
//         transition-all duration-200 
//         group-hover:shadow-md group-hover:translate-x-1
//         flex justify-between items-center
//       `}>
        
//         <div className="space-y-3 flex-1">
//           {/* Header do Card: ID e Status */}
//           <div className="flex items-center gap-3">
//             <span className="flex items-center gap-1 text-[10px] font-mono font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">
//              <Hash size={10} /> 
//              {String(id || "000000").slice(-6).toUpperCase()}
//             </span>
//             <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${config.bg} ${config.color}`}>
//               {config.icon}
//               {config.label}
//             </span>
//           </div>

//           {/* Informações Principais */}
//           <div>
//             <h3 className="flex items-center gap-2 text-xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
//               <User size={20} className="text-gray-400" />
//               {cliente}
//             </h3>
            
//             <div className="flex flex-wrap items-center gap-4 mt-2">
//               <div className="bg-slate-900 text-white px-3 py-1 rounded border-b-2 border-blue-500 font-mono text-sm font-bold tracking-widest shadow-inner">
//                 {placa}
//               </div>
//               <p className="text-sm text-gray-500 line-clamp-1 italic max-w-sm">
//                 "{problema}"
//               </p>
//             </div>
//           </div>

//           {/* Rodapé do Card: Técnico */}
//           <div className="flex items-center gap-2 pt-1 border-t border-gray-50 text-[11px] text-gray-400 uppercase font-semibold">
//             <Wrench size={12} />
//             <span>Técnico Responsável: <span className="text-gray-600">{tecnico}</span></span>
//           </div>
//         </div>

//         {/* Indicador de Ação */}
//         <div className="ml-4 p-2 rounded-full bg-gray-50 text-gray-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
//           <ChevronRight size={24} />
//         </div>
//       </div>
//     </Link>
//   );
// }
