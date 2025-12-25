import { useEffect, useState } from "react"
import { 
  LayoutDashboard, 
  ClipboardList, 
  CheckCircle, 
  Wrench, 
  AlertCircle, 
  Search
} from "lucide-react"
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOS = async (status?: string, placa?: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get("/os", {
        params: {
          status: status || undefined,
          veiculo_placa: placa || undefined,
        },
      })
      const data = Array.isArray(response.data) ? response.data : []
      setOrdens(data)
    } catch (err) {
      console.error("Erro ao buscar OSs:", err)
      setError("Falha na conexão com o servidor de dados.")
      setOrdens([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOS()
  }, [])

  const stats = {
    total: ordens?.length || 0,
    abertas: ordens?.filter(os => os.status === "aberto").length || 0,
    andamento: ordens?.filter(os => os.status === "em_andamento").length || 0,
    concluidas: ordens?.filter(os => os.status === "concluido").length || 0,
  }

  return (
    <div className="min-h-screen bg-gray-50"> 
      <Navbar />
      
      {/* CONTAINER CENTRALIZADO */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> 
        
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight">
              <LayoutDashboard className="text-blue-600" size={32} /> 
              Painel de Operações
            </h1>
            <p className="text-gray-500 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Gestão de Motocicletas | Mestre Sergioaero
            </p>
          </div>
          
          {/* LOGOMARCA DA EMPRESA INTEGRADA */}
          <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="bg-gray-50 p-1 rounded-xl">
              <img 
                src="/logoDaEmpresa.png" 
                alt="Logo Empresa" 
                className="h-16 w-auto object-contain rounded-lg"
              />
            </div>
            <div className="hidden sm:block leading-tight">
              <span className="block text-[10px] font-black text-yellow-600 uppercase tracking-widest">Unidade</span>
              <h2 className="text-lg font-black text-gray-800 tracking-tighter">
              <span className="text-gray-600">Motocicletas</span><span className="text-gray-600">Brasil</span>
              </h2>
            </div>
          </div>
        </header>

        {/* CARDS DE RESUMO */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          <StatCard title="Total" value={stats.total} icon={<ClipboardList size={22} />} color="blue" />
          <StatCard title="Abertas" value={stats.abertas} icon={<AlertCircle size={22} />} color="red" />
          <StatCard title="Em Execução" value={stats.andamento} icon={<Wrench size={22} />} color="yellow" />
          <StatCard title="Concluídas" value={stats.concluidas} icon={<CheckCircle size={22} />} color="green" />
        </div>

        {/* ÁREA DE FILTROS E LISTAGEM */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/30">
            <div className="flex items-center gap-2 mb-6 text-gray-400">
              <Search size={18} />
              <span className="text-sm font-bold uppercase tracking-wider">Filtros Avançados</span>
            </div>
            <FilterBar onFilter={fetchOS} />
          </div>

          <div className="p-6 md:p-8">
            <div className="grid gap-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                  <p className="font-bold text-xs text-gray-400 uppercase tracking-widest">Sincronizando sistemas...</p>
                </div>
              ) : error ? (
                <div className="text-center py-16 bg-red-50 rounded-2xl border border-red-100">
                  <AlertCircle className="mx-auto text-red-500 mb-3" size={40} />
                  <p className="text-red-700 font-bold">{error}</p>
                </div>
              ) : ordens.length > 0 ? (
                ordens.map((os) => (
                  <OSCard
                    key={os.id}
                    id={os.id}
                    cliente={os.cliente_nome}
                    status={os.status}
                    tecnico={os.tecnico_id}
                    problema={os.problema}
                    placa={os.veiculo_placa}
                  />
                ))
              ) : (
                <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
                  <ClipboardList className="mx-auto text-gray-200 mb-4" size={64} />
                  <p className="text-gray-500 font-bold">Nenhuma ordem no radar.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: 'blue' | 'red' | 'yellow' | 'green' }) {
  const themes = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    red: "bg-red-50 text-red-700 border-red-100",
    yellow: "bg-amber-50 text-amber-700 border-amber-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
  }
  return (
    <div className={`p-5 rounded-2xl border ${themes[color]} shadow-sm transition-all`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-white/80 shadow-sm">{icon}</div>
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-none">{title}</p>
      <p className="text-3xl font-black mt-2 tabular-nums">{value}</p>
    </div>
  )
}
