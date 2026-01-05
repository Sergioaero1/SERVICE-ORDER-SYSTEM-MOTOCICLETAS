import { useState } from "react"
import { updateEmail, updatePassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../services/firebase"
import Navbar from "../components/NavBar"
import { useNavigate } from "react-router-dom"  


export default function Profile() {
  const [oldPassword, setOldPassword] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()


  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user = auth.currentUser
      if (!user || !user.email) throw new Error("Usuário não autenticado")

      await signInWithEmailAndPassword(auth, user.email, oldPassword)
      if (newEmail) await updateEmail(user, newEmail)
      if (newPassword) await updatePassword(user, newPassword)

      setMessage("Dados atualizados com sucesso!")
    } catch (err: any) {
      setMessage(`Erro: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8 max-w-md mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Atualizar Perfil</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input type="password" placeholder="Senha atual" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              <input type="email" placeholder="Novo Email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              <input type="password" placeholder="Nova Senha" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold shadow-md">
                  Salvar alterações
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Ainda não tem conta?{' '}
               <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-600 hover:underline font-medium"
              >
                Cadastre-se
               </button>
              </p>
              
            </form>
            {message && (
                <p className={`mt-4 text-sm p-3 rounded-lg ${message.startsWith("Erro") ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {message}
                </p>
            )}
        </div>
      </div>
    </div>
  )
}
