const db = require('../db');
const crudRouter = require('../crud');

const router = crudRouter({
  tabela: 'habilidades',
  nome: 'Habilidade',
  campos: ['nome', 'categoria'],
  obrigatorios: ['nome'],
});

// GET /habilidades/:id/pessoas  -> pessoas que possuem essa habilidade (lado inverso do N:N)
router.get('/:id/pessoas', async (req, res) => {
  const { rows } = await db.query(
    `SELECT p.id, p.nome, p.titulo, ph.nivel
     FROM pessoa_habilidades ph
     JOIN pessoas p ON p.id = ph.pessoa_id
     WHERE ph.habilidade_id = $1
     ORDER BY p.nome`,
    [req.params.id]
  );
  res.json(rows);
});

module.exports = router;
