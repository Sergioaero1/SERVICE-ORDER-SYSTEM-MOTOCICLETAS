import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../services/firebase"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const token = await userCredential.user.getIdToken()
      localStorage.setItem("token", token)
      navigate("/dashboard")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastro de Técnico</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
        />
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg mb-4 font-semibold hover:bg-blue-700 transition duration-150">
          Cadastrar
        </button>
        <p className="text-center text-sm text-gray-500">
            Já tem conta?{' '}
            <button type="button" onClick={() => navigate("/")} className="text-blue-600 hover:underline font-medium">
                Fazer Login
            </button>
        </p>
      </form>
    </div>
  )
}
