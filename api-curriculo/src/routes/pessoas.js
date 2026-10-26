const db = require('../db');
const crudRouter = require('../crud');

// CRUD básico de pessoas
const router = crudRouter({
  tabela: 'pessoas',
  nome: 'Pessoa',
  campos: ['nome', 'titulo', 'email', 'telefone', 'cidade', 'resumo', 'github', 'linkedin'],
  obrigatorios: ['nome'],
});

async function pessoaExiste(id) {
  const { rows } = await db.query('SELECT 1 FROM pessoas WHERE id = $1', [id]);
  return rows.length > 0;
}

const SQL_HABILIDADES_DA_PESSOA = `
  SELECT h.id, h.nome, h.categoria, ph.nivel
  FROM pessoa_habilidades ph
  JOIN habilidades h ON h.id = ph.habilidade_id
  WHERE ph.pessoa_id = $1
  ORDER BY h.nome`;

// ---------- Relacionamentos 1:N (pessoa -> formações / experiências / projetos) ----------

// GET /pessoas/:id/curriculo  -> currículo completo da pessoa
router.get('/:id/curriculo', async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM pessoas WHERE id = $1', [id]);
  if (!rows.length) return res.status(404).json({ erro: 'Pessoa não encontrada' });

  const [formacoes, experiencias, projetos, habilidades] = await Promise.all([
    db.query('SELECT * FROM formacoes WHERE pessoa_id = $1 ORDER BY data_inicio DESC', [id]),
    db.query('SELECT * FROM experiencias WHERE pessoa_id = $1 ORDER BY data_inicio DESC', [id]),
    db.query('SELECT * FROM projetos WHERE pessoa_id = $1 ORDER BY id', [id]),
    db.query(SQL_HABILIDADES_DA_PESSOA, [id]),
  ]);

  res.json({
    ...rows[0],
    formacoes: formacoes.rows,
    experiencias: experiencias.rows,
    projetos: projetos.rows,
    habilidades: habilidades.rows,
  });
});

// GET /pessoas/:id/formacoes | /experiencias | /projetos
for (const tabela of ['formacoes', 'experiencias', 'projetos']) {
  router.get(`/:id/${tabela}`, async (req, res) => {
    if (!(await pessoaExiste(req.params.id))) {
      return res.status(404).json({ erro: 'Pessoa não encontrada' });
    }
    const { rows } = await db.query(`SELECT * FROM ${tabela} WHERE pessoa_id = $1 ORDER BY id`, [req.params.id]);
    res.json(rows);
  });
}

// ---------- Relacionamento N:N (pessoa <-> habilidades) ----------

// GET /pessoas/:id/habilidades  -> habilidades da pessoa com o nível
router.get('/:id/habilidades', async (req, res) => {
  if (!(await pessoaExiste(req.params.id))) {
    return res.status(404).json({ erro: 'Pessoa não encontrada' });
  }
  const { rows } = await db.query(SQL_HABILIDADES_DA_PESSOA, [req.params.id]);
  res.json(rows);
});

// POST /pessoas/:id/habilidades  -> vincula uma habilidade { habilidade_id, nivel }
router.post('/:id/habilidades', async (req, res) => {
  const { habilidade_id, nivel } = req.body || {};
  if (!habilidade_id) return res.status(400).json({ erro: 'Campo obrigatório: habilidade_id' });

  const { rows } = await db.query(
    `INSERT INTO pessoa_habilidades (pessoa_id, habilidade_id, nivel)
     VALUES ($1, $2, $3) RETURNING *`,
    [req.params.id, habilidade_id, nivel || 'Básico']
  );
  res.status(201).json(rows[0]);
});

// PUT /pessoas/:id/habilidades/:habilidadeId  -> altera o nível { nivel }
router.put('/:id/habilidades/:habilidadeId', async (req, res) => {
  const { nivel } = req.body || {};
  if (!nivel) return res.status(400).json({ erro: 'Campo obrigatório: nivel' });

  const { rows } = await db.query(
    `UPDATE pessoa_habilidades SET nivel = $1
     WHERE pessoa_id = $2 AND habilidade_id = $3 RETURNING *`,
    [nivel, req.params.id, req.params.habilidadeId]
  );
  if (!rows.length) return res.status(404).json({ erro: 'Vínculo não encontrado' });
  res.json(rows[0]);
});

// DELETE /pessoas/:id/habilidades/:habilidadeId  -> remove o vínculo
router.delete('/:id/habilidades/:habilidadeId', async (req, res) => {
  const { rows } = await db.query(
    `DELETE FROM pessoa_habilidades
     WHERE pessoa_id = $1 AND habilidade_id = $2 RETURNING *`,
    [req.params.id, req.params.habilidadeId]
  );
  if (!rows.length) return res.status(404).json({ erro: 'Vínculo não encontrado' });
  res.json({ mensagem: 'Habilidade desvinculada com sucesso', registro: rows[0] });
});

module.exports = router;
