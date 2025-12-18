import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import osRoutes from "./routes/osRoutes";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // URL do seu Vite
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Rotas
app.use("/os", osRoutes);

// Teste de conexão
app.get("/ping", (req, res) => res.json({ message: "SISTEMA ONLINE - EDI OPERACIONAL" }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
