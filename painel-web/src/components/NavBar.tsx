import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-lg flex justify-between items-center sticky top-0 z-10">
      <h1 className="font-bold text-xl text-blue-400">MotocicletasBrasil OS</h1>
      <div className="space-x-6 flex items-center">
        <Link to="/dashboard" className="hover:text-blue-400 transition duration-150">Dashboard</Link>
        <Link to="/nova-os" className="hover:text-blue-400 transition duration-150">Nova OS</Link>
        <Link to="/profile" className="hover:text-blue-400 transition duration-150">Perfil</Link>
        <button onClick={handleLogout} className="hover:text-blue-400 transition duration-150">Sair</button>
      </div>
    </nav>
  )
}
