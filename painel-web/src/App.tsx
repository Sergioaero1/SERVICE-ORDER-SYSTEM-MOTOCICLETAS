import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import NewOS from "./pages/NewOS"
import Profile from "./pages/Profile"
import OSDetails from "./pages/OSDetails"
import PrivateRoute from "./components/PrivateRoute"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rotas Protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/os/:id"
          element={
            <PrivateRoute>
              <OSDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/nova-os"
          element={
            <PrivateRoute>
              <NewOS />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}
