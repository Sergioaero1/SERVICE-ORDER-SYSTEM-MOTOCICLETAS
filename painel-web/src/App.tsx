import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast' // 🛡️ Import das notificações
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
      {/* 🛡️ Configuração Global das Notificações */}
      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '12px',
            fontWeight: 'bold',
          },
        }}
      />

      <Routes>
        {/* Rota Raiz: Redireciona para o login ou Dashboard */}
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

        {/* 🛡️ ROTA CORRIGIDA: Sincronizada com Dashboard e Navbar */}
        <Route
          path="/newos"
          element={
            <PrivateRoute>
              <NewOS />
            </PrivateRoute>
          }
        />

        {/* Rota de Legado: Caso o usuário tente acessar o link antigo com hífen */}
        <Route path="/nova-os" element={<Navigate to="/newos" replace />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Rota de Fallback: Caso a página não exista */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}



// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Login from "./pages/Login"
// import Register from "./pages/Register"
// import Dashboard from "./pages/Dashboard"
// import NewOS from "./pages/NewOS"
// import Profile from "./pages/Profile"
// import OSDetails from "./pages/OSDetails"
// import PrivateRoute from "./components/PrivateRoute"

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
        
//         {/* Rotas Protegidas */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/os/:id"
//           element={
//             <PrivateRoute>
//               <OSDetails />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/nova-os"
//           element={
//             <PrivateRoute>
//               <NewOS />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute>
//               <Profile />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   )
// }
