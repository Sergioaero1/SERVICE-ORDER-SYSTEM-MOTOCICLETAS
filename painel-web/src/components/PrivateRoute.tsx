import { Navigate } from "react-router-dom"

type PrivateRouteProps = {
  children: React.ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const token = localStorage.getItem("token")

  // Se não houver token, redireciona para o Login
  return token ? children : <Navigate to="/" replace />
}
