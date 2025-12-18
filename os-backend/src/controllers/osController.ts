import { Request, Response } from "express";
import db from "../config/db";

// Criar OS
export async function criarOS(req: Request, res: Response) {
  try {
    const { cliente_nome, veiculo_placa, problema, status, tecnico_id: tecnicoFromBody } = req.body;
    const tecnico_id = (req as any).user?.uid || tecnicoFromBody;

    if (!cliente_nome || !veiculo_placa || !problema) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    const statusValido = ["aberto", "em_andamento", "concluido"].includes(status) ? status : "aberto";

    await db.query("INSERT INTO ordens_servico SET ?", {
      cliente_nome,
      veiculo_placa: veiculo_placa.toUpperCase(), // Força maiúscula
      problema,
      status: statusValido,
      tecnico_id,
    });

    res.status(201).send("OS criada com sucesso");
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar OS", details: error });
  }
}

// Listar OS
export async function listarOS(req: Request, res: Response) {
  try {
    const { status, veiculo_placa } = req.query;
    let query = "SELECT * FROM ordens_servico WHERE 1=1";
    const params: any[] = [];

    if (status) { query += " AND status = ?"; params.push(status); }
    if (veiculo_placa) { query += " AND veiculo_placa = ?"; params.push(veiculo_placa); }

    const [rows] = await db.query<any[]>(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar OS" });
  }
}

// Buscar por ID
export async function buscarOS(req: Request, res: Response) {
  try {
    const [rows] = await db.query<any[]>("SELECT * FROM ordens_servico WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "OS não encontrada" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar OS" });
  }
}

// Atualizar (Status e Dados - Tarefa G)
export async function atualizarOS(req: Request, res: Response) {
  try {
    const { status, cliente_nome, veiculo_placa, problema } = req.body;
    const updateFields: any = {};
    const params: any[] = [];

    if (status) {
      if (!["aberto", "em_andamento", "concluido"].includes(status)) return res.status(400).send("Status inválido");
      updateFields.status = status;
    }
    if (cliente_nome) updateFields.cliente_nome = cliente_nome;
    if (veiculo_placa) updateFields.veiculo_placa = veiculo_placa.toUpperCase();
    if (problema) updateFields.problema = problema;

    if (Object.keys(updateFields).length === 0) return res.status(400).send("Nada para atualizar");

    const setClause = Object.keys(updateFields).map(key => `${key} = ?`).join(', ');
    params.push(...Object.values(updateFields), req.params.id);

    await db.query(`UPDATE ordens_servico SET ${setClause} WHERE id = ?`, params);
    res.send("OS atualizada com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao atualizar OS");
  }
}

// Deletar OS (Tarefa C)
export async function deletarOS(req: Request, res: Response) {
  try {
    const [result]: any = await db.query("DELETE FROM ordens_servico WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).send("OS não encontrada");
    res.send("OS deletada com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao deletar OS");
  }
}
