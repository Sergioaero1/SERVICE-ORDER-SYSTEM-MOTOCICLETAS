import { useEffect, useState, useRef } from 'react'; // Adicionado useRef
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print'; // Import de impressão
import api from '../services/api';
import Navbar from '../components/NavBar';
import StatusDropdown from '../components/StatusDropDown';
import { OSPrintTemplate } from '../components/OSPrintTemplate'; // Import do Template

type StatusBackend = "aberto" | "em_andamento" | "concluido";

interface OSDetailsType {
  id: number;
  cliente_nome: string;
  veiculo_placa: string;
  problema: string;
  status: StatusBackend;
  tecnico_id: string;
  data_criacao: string;
}

export default function OSDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const componentRef = useRef<HTMLDivElement>(null); // Referência para o PDF

  const [os, setOs] = useState<OSDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editCliente, setEditCliente] = useState('');
  const [editPlaca, setEditPlaca] = useState('');
  const [editProblema, setEditProblema] = useState('');

  // Configuração da função de impressão
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `OS_${os?.id}_${os?.veiculo_placa}`,
  });

  useEffect(() => {
    const fetchOsDetails = async () => {
      try {
        const response = await api.get(`/os/${id}`);
        const data = response.data[0] || response.data; 
        setOs(data);
        setEditCliente(data.cliente_nome);
        setEditPlaca(data.veiculo_placa);
        setEditProblema(data.problema);
      } catch (err) {
        console.error("Erro ao buscar detalhes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOsDetails();
  }, [id]);

  const handleSaveChanges = async () => {
    try {
      await api.put(`/os/${id}`, {
        cliente_nome: editCliente,
        veiculo_placa: editPlaca.toUpperCase(),
        problema: editProblema,
      });
      alert("Alterações salvas com sucesso!");
    } catch (error) {
      alert("Erro ao salvar alterações.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja deletar esta OS?")) {
      try {
        await api.delete(`/os/${id}`);
        alert("OS deletada!");
        navigate("/dashboard");
      } catch (err) {
        alert("Erro ao deletar.");
      }
    }
  };

  if (loading) return <div className="p-4 text-center">Carregando dados...</div>;
  if (!os) return <div className="p-4 text-center">OS não encontrada.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4 max-w-3xl mx-auto">
        {/* CABEÇALHO DE AÇÕES */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline font-medium">
            &larr; Voltar
          </button>
          
          <div className="flex gap-2">
            {/* Botão de Impressão Profissional */}
            <button 
              onClick={() => handlePrint()} 
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition shadow-md font-medium flex items-center gap-2"
            >
              🖨️ Imprimir PDF
            </button>
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              Excluir OS
            </button>
          </div>
        </div>
        
        {/* CARD DE EDIÇÃO (O QUE O TÉCNICO VÊ NO SITE) */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Editar Ordem # {os.id}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600">Cliente:</label>
              <input type="text" value={editCliente} onChange={e => setEditCliente(e.target.value)} 
                     className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">Placa:</label>
              <input type="text" value={editPlaca} onChange={e => setEditPlaca(e.target.value.toUpperCase())} 
                     className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-600">Problema:</label>
              <textarea value={editProblema} onChange={e => setEditProblema(e.target.value)} 
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" rows={3} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-4">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700">Status:</span>
              <StatusDropdown currentStatus={os.status} onChange={(s: any) => setOs({...os, status: s})} osId={String(os.id)} />
            </div>
            <button onClick={handleSaveChanges} className="w-full sm:w-auto bg-blue-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-md">
              Salvar Alterações
            </button>
          </div>
        </div>

        {/* 🖨️ TEMPLATE DE IMPRESSÃO (INVISÍVEL NA TELA, SÓ SAI NO PDF) */}
        <div className="hidden">
           <OSPrintTemplate ref={componentRef} os={os} />
        </div>
      </div>
    </div>
  );
}
