import { Request, Response, NextFunction } from "express";
import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../config/chavePrivada.json";

// Inicializa o Firebase apenas se não houver apps inicializados
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token ausente ou mal formatado" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // ✅ Usando 'as any' para evitar o erro de tipagem do TypeScript no Request
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return res.status(403).json({ error: "Token inválido" });
  }
}
