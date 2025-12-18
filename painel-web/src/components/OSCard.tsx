import { Link } from 'react-router-dom';

type OSCardProps = {
  id: string;
  cliente: string;
  status: string;
  tecnico: string;
  problema: string;
  placa: string;
};

function formatStatus(status: string): string {
  switch (status) {
    case "aberto": return "Aberto";
    case "em_andamento": return "Em andamento";
    case "concluido": return "Concluído";
    default: return status;
  }
}

function getStatusClasses(status: string): string {
  switch (status) {
    case "aberto": return "bg-red-200 text-red-800";
    case "em_andamento": return "bg-yellow-200 text-yellow-800";
    case "concluido": return "bg-green-200 text-green-800";
    default: return "bg-gray-200 text-gray-800";
  }
}

export default function OSCard({ id, cliente, status, tecnico, problema, placa }: OSCardProps) {
  return (
    <Link to={`/os/${id}`} className="block">
      <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-150 cursor-pointer flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-400 font-mono">OS #{id}</p>
          <p className="text-lg font-bold text-gray-800 mt-1">{cliente}</p>
          <p className="text-md text-blue-600 font-semibold uppercase">Placa: {placa}</p>
          
          <p className="text-gray-600 mt-2 line-clamp-2 max-w-md">
            <span className="font-medium text-gray-700">Problema:</span> {problema}
          </p>
          <p className="text-xs text-gray-400 mt-2 italic">Técnico ID: {tecnico}</p>
        </div>
        
        <span className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap shadow-sm ${getStatusClasses(status)}`}>
          {formatStatus(status)}
        </span>
      </div>
    </Link>
  );
}
