import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import toast from 'react-hot-toast'; // 🛡️ Import das notificações profissionais
import { 
  ArrowLeft, 
  Printer, 
  Trash2, 
  Save, 
  Wrench,
  User,
  Hash
} from 'lucide-react';
import api from '../services/api';
import Navbar from '../components/NavBar';
import StatusDropdown from '../components/StatusDropDown';
import { OSPrintTemplate } from '../components/OSPrintTemplate';

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
  const componentRef = useRef<HTMLDivElement>(null);

  const [os, setOs] = useState<OSDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editCliente, setEditCliente] = useState('');
  const [editPlaca, setEditPlaca] = useState('');
  const [editProblema, setEditProblema] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // 🖨️ Função de Impressão Estável
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `OS_${os?.veiculo_placa || 'Moto'}_${os?.id}`,
  });

  useEffect(() => {
    const fetchOsDetails = async () => {
      try {
        const response = await api.get(`/os/${id}`);
        const data = Array.isArray(response.data) ? response.data[0] : response.data; 
        if (data) {
          setOs(data);
          setEditCliente(data.cliente_nome);
          setEditPlaca(data.veiculo_placa);
          setEditProblema(data.problema);
        }
      } catch (err) {
        console.error("Erro ao buscar detalhes:", err);
        toast.error("Erro ao localizar OS no banco de dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchOsDetails();
  }, [id]);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    const loadingToast = toast.loading("Sincronizando ficha técnica...");
    try {
      await api.put(`/os/${id}`, {
        cliente_nome: editCliente,
        veiculo_placa: editPlaca.toUpperCase(),
        problema: editProblema,
      });
      toast.success("Ficha técnica atualizada, Capitão!", { id: loadingToast });
    } catch (error) {
      toast.error("Falha ao salvar alterações.", { id: loadingToast });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Deseja excluir permanentemente esta OS? Esta ação é irreversível.")) {
      try {
        await api.delete(`/os/${id}`);
        toast.success("Ordem de serviço removida.");
        navigate("/dashboard");
      } catch (err) {
        toast.error("Erro ao deletar registro.");
      }
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-blue-600 animate-pulse tracking-widest uppercase italic">Sincronizando Datapad...</div>;
  if (!os) return <div className="p-20 text-center font-bold text-red-500 uppercase tracking-widest">Alvo não encontrado no radar.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* BARRA DE AÇÕES SUPERIOR */}
        <div className="flex justify-between items-center mb-8 gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-all group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            Voltar
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => handlePrint()} 
              className="flex items-center gap-2 bg-slate-800 text-white px-6 py-2.5 rounded-xl hover:bg-black transition shadow-lg font-bold text-sm tracking-tight"
            >
              <Printer size={18} /> IMPRIMIR O.S.
            </button>
            <button onClick={handleDelete} className="bg-red-50 text-red-600 p-2.5 rounded-xl hover:bg-red-100 transition shadow-sm border border-red-100">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        
        {/* CARD PRINCIPAL */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="bg-slate-800 p-6 text-white flex justify-between items-center">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none">OS #{os.id}</h2>
            <div className="text-right font-mono font-bold text-sm opacity-60 uppercase tracking-widest">
              {new Date(os.data_criacao).toLocaleDateString('pt-BR')}
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cliente */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 flex items-center gap-1 tracking-[0.2em]">
                  <User size={12} /> Cliente
                </label>
                <input type="text" value={editCliente} onChange={e => setEditCliente(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold transition-all" />
              </div>

              {/* Placa */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 flex items-center gap-1 tracking-[0.2em]">
                  <Hash size={12} /> Placa
                </label>
                <input type="text" value={editPlaca} onChange={e => setEditPlaca(e.target.value.toUpperCase())} className="w-full px-4 py-3 bg-slate-900 text-white border border-slate-700 rounded-2xl font-mono font-bold text-lg tracking-widest uppercase italic shadow-inner outline-none focus:ring-4 focus:ring-blue-500/20 transition-all" />
              </div>

              {/* Diagnóstico */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 flex items-center gap-1 tracking-[0.2em]">
                  <Wrench size={12} /> Diagnóstico Técnico
                </label>
                <textarea value={editProblema} onChange={e => setEditProblema(e.target.value)} className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none font-medium min-h-32 resize-none transition-all" />
              </div>
            </div>

            {/* Rodapé de Status e Salvamento */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-100">
              <div className="w-full sm:w-auto">
                <p className="text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Estágio do Serviço</p>
                <StatusDropdown currentStatus={os.status} onChange={(s: any) => setOs({...os, status: s})} osId={String(os.id)} />
              </div>
              <button 
                onClick={handleSaveChanges} 
                disabled={isSaving}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 active:scale-95 disabled:opacity-50"
              >
                <Save size={20} /> 
                {isSaving ? "PROCESSANDO..." : "ATUALIZAR DADOS"}
              </button>
            </div>
          </div>
        </div>

        {/* Template invisível para impressão */}
        <div style={{ display: 'none' }}>
           <div ref={componentRef}>
              <OSPrintTemplate os={os} />
           </div>
        </div>
      </main>
    </div>
  );
}



// import { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useReactToPrint } from 'react-to-print';
// import { 
//   ArrowLeft, 
//   Printer, 
//   Trash2, 
//   Save, 
//   Wrench,
//   User,
//   Hash
// } from 'lucide-react';
// import api from '../services/api';
// import Navbar from '../components/NavBar';
// import StatusDropdown from '../components/StatusDropDown';
// import { OSPrintTemplate } from '../components/OSPrintTemplate';

// type StatusBackend = "aberto" | "em_andamento" | "concluido";

// interface OSDetailsType {
//   id: number;
//   cliente_nome: string;
//   veiculo_placa: string;
//   problema: string;
//   status: StatusBackend;
//   tecnico_id: string;
//   data_criacao: string;
// }

// export default function OSDetails() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const componentRef = useRef<HTMLDivElement>(null);

//   const [os, setOs] = useState<OSDetailsType | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editCliente, setEditCliente] = useState('');
//   const [editPlaca, setEditPlaca] = useState('');
//   const [editProblema, setEditProblema] = useState('');
//   const [isSaving, setIsSaving] = useState(false);

//   // 🖨️ Função de Impressão (Nativa e Estável)
//   const handlePrint = useReactToPrint({
//     contentRef: componentRef,
//     documentTitle: `OS_${os?.veiculo_placa || 'Moto'}_${os?.id}`,
//   });

//   useEffect(() => {
//     const fetchOsDetails = async () => {
//       try {
//         const response = await api.get(`/os/${id}`);
//         const data = Array.isArray(response.data) ? response.data[0] : response.data; 
//         if (data) {
//           setOs(data);
//           setEditCliente(data.cliente_nome);
//           setEditPlaca(data.veiculo_placa);
//           setEditProblema(data.problema);
//         }
//       } catch (err) {
//         console.error("Erro ao buscar detalhes:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOsDetails();
//   }, [id]);

//   const handleSaveChanges = async () => {
//     setIsSaving(true);
//     try {
//       await api.put(`/os/${id}`, {
//         cliente_nome: editCliente,
//         veiculo_placa: editPlaca.toUpperCase(),
//         problema: editProblema,
//       });
//       alert("Ficha técnica atualizada!");
//     } catch (error) {
//       alert("Erro ao salvar.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm("Deseja excluir permanentemente esta OS?")) {
//       try {
//         await api.delete(`/os/${id}`);
//         navigate("/dashboard");
//       } catch (err) {
//         alert("Erro ao excluir.");
//       }
//     }
//   };

//   if (loading) return <div className="p-20 text-center font-bold text-blue-600 animate-pulse">CARREGANDO...</div>;
//   if (!os) return <div className="p-20 text-center font-bold text-red-500">ORDEM NÃO ENCONTRADA.</div>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main className="max-w-4xl mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-8 gap-4">
//           <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-all">
//             <ArrowLeft size={20} /> Voltar
//           </button>
//           <div className="flex gap-2">
//             <button 
//               onClick={() => handlePrint()} 
//               className="flex items-center gap-2 bg-slate-800 text-white px-6 py-2.5 rounded-xl hover:bg-black transition shadow-lg font-bold"
//             >
//               <Printer size={18} /> IMPRIMIR O.S.
//             </button>
//             <button onClick={handleDelete} className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl hover:bg-red-100 transition font-bold">
//               <Trash2 size={18} />
//             </button>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="bg-slate-800 p-6 text-white flex justify-between items-center">
//             <h2 className="text-2xl font-black italic tracking-tighter uppercase">OS #{os.id}</h2>
//             <div className="text-right font-mono font-bold text-sm opacity-80 uppercase">
//               {new Date(os.data_criacao).toLocaleDateString('pt-BR')}
//             </div>
//           </div>

//           <div className="p-8 space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-1">
//                 <label className="text-[10px] font-black uppercase text-gray-400 ml-1 flex items-center gap-1">
//                   <User size={12} /> Cliente
//                 </label>
//                 <input type="text" value={editCliente} onChange={e => setEditCliente(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-[10px] font-black uppercase text-gray-400 ml-1 flex items-center gap-1">
//                   <Hash size={12} /> Placa
//                 </label>
//                 <input type="text" value={editPlaca} onChange={e => setEditPlaca(e.target.value.toUpperCase())} className="w-full px-4 py-3 bg-slate-900 text-white border border-slate-700 rounded-2xl font-mono font-bold text-lg tracking-widest uppercase italic" />
//               </div>
//               <div className="md:col-span-2 space-y-1">
//                 <label className="text-[10px] font-black uppercase text-gray-400 ml-1 flex items-center gap-1">
//                   <Wrench size={12} /> Diagnóstico Técnico
//                 </label>
//                 <textarea value={editProblema} onChange={e => setEditProblema(e.target.value)} className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium min-h-32 resize-none" />
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-gray-100">
//               <div className="w-full sm:w-auto">
//                 <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Status do Serviço</p>
//                 <StatusDropdown currentStatus={os.status} onChange={(s: any) => setOs({...os, status: s})} osId={String(os.id)} />
//               </div>
//               <button 
//                 onClick={handleSaveChanges} 
//                 disabled={isSaving}
//                 className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-700 transition shadow-lg shadow-emerald-100"
//               >
//                 <Save size={20} /> {isSaving ? "SALVANDO..." : "SALVAR ALTERAÇÕES"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Template invisível para o motor de impressão */}
//         <div style={{ display: 'none' }}>
//            <div ref={componentRef}>
//               <OSPrintTemplate os={os} />
//            </div>
//         </div>
//       </main>
//     </div>
//   );
// }
