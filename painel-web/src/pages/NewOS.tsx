import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuth } from "firebase/auth"
import toast from 'react-hot-toast' // 🛡️ Importação do Toast
import { 
  User, 
  Hash, 
  Wrench, 
  PlusCircle, 
  ArrowLeft,
  Loader2,
  CheckCircle2
} from "lucide-react"
import Navbar from "../components/NavBar"
import api from "../services/api"

export default function NewOS() {
  const [cliente, setCliente] = useState("")
  const [descricao, setDescricao] = useState("")
  const [placa, setPlaca] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 🚀 Feedback de carregamento imediato
    const loadingToast = toast.loading("Registrando ordem no sistema...")

    try {
      const auth = getAuth()
      const user = auth.currentUser
      
      if (!user) {
        toast.error("Sessão expirada. Acesse novamente.", { id: loadingToast })
        navigate("/")
        return
      }

      await api.post("/os", {
        cliente_nome: cliente,
        veiculo_placa: placa.toUpperCase(),
        problema: descricao,
        status: "aberto",
        tecnico_id: user.uid,
      })
      
      // ✅ Sucesso: Sem alert(), apenas toast elegante
      toast.success("Ordem de Serviço criada!", { id: loadingToast })
      
      // Pequeno delay para o usuário ver o sucesso antes de navegar
      setTimeout(() => navigate("/dashboard"), 1000)
      
    } catch (error) {
      console.error("Erro ao criar OS:", error)
      toast.error("Falha ao conectar com o servidor.", { id: loadingToast })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6 group font-bold"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="bg-blue-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <PlusCircle size={28} />
              <h2 className="text-2xl font-black tracking-tight uppercase italic">Nova Ordem</h2>
            </div>
            <p className="text-blue-100 font-medium opacity-80 text-sm">Entrada de veículo no Centro de Engenharia</p>
          </div>

          <form className="p-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest flex items-center gap-2">
                <User size={14} className="text-blue-500" /> Nome do Cliente
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Sergio Aero"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-800"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest flex items-center gap-2">
                <Hash size={14} className="text-blue-500" /> Placa do Veículo
              </label>
              <input
                type="text"
                required
                placeholder="ABC1D23"
                className="w-full px-5 py-4 bg-slate-900 border border-slate-700 rounded-2xl text-white font-mono font-black text-xl tracking-[0.2em] focus:ring-4 focus:ring-blue-500/20 outline-none uppercase italic"
                value={placa}
                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest flex items-center gap-2">
                <Wrench size={14} className="text-blue-500" /> Diagnóstico do Problema
              </label>
              <textarea
                required
                placeholder="Descreva detalhadamente..."
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium resize-none min-h-32"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`
                w-full py-4 rounded-2xl font-black text-lg shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95
                ${isSubmitting 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"}
              `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Sincronizando...
                </>
              ) : (
                <>
                  <CheckCircle2 size={24} />
                  CRIAR ORDEM DE SERVIÇO
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
