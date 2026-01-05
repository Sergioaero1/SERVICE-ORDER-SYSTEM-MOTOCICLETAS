import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../services/firebase"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const token = await userCredential.user.getIdToken()
      localStorage.setItem("token", token)
      navigate("/dashboard")
    } catch (err) {
      setError("Email ou senha inválidos")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Acesso ao Painel</h2>
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
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg mb-3 font-semibold hover:bg-blue-700 transition duration-150 shadow-md">
          Entrar
        </button>

        {/*jOGUEI ESSE BOTÃO ABAIXO - DE NOVO CADASTRO - NO PERFIL DE MUDANÇA DE LOGIN*/}
        {/* <p className="text-center text-sm text-gray-500 mt-4">
            Ainda não tem conta?{' '}
            <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-600 hover:underline font-medium"
            >
                Cadastre-se
            </button>
        </p> */}
      </form>
    </div>
  )
}
