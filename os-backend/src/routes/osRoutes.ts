import { Router } from 'express';
import { criarOS, listarOS, buscarOS, atualizarOS, deletarOS } from '../controllers/osController';
import { verifyToken } from '../middleweare/auth';

const router = Router();

router.post('/', verifyToken, criarOS);
router.get('/', verifyToken, listarOS);
router.get('/:id', verifyToken, buscarOS);
router.put('/:id', verifyToken, atualizarOS);
router.delete('/:id', verifyToken, deletarOS);

export default router;
