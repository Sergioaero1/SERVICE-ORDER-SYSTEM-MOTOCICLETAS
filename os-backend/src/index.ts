import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import osRoutes from "./routes/osRoutes";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://192.168.1.4:5173" , // URL do seu Vite / Com "http://192.168.1.4:5173" fica mais seguro mas smartphone não acessa / com "*" para computer + smartphone via wi-fi
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
