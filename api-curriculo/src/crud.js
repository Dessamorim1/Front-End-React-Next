const express = require('express');
const db = require('./db');

// Gera as 5 rotas do CRUD (listar, buscar, criar, atualizar, excluir) para uma tabela.
// "campos" é a lista de colunas que podem ser enviadas no corpo da requisição.
function crudRouter({ tabela, nome, campos, obrigatorios = [] }) {
  const router = express.Router();

  // GET /  -> lista todos
  router.get('/', async (req, res) => {
    const { rows } = await db.query(`SELECT * FROM ${tabela} ORDER BY id`);
    res.json(rows);
  });

  // GET /:id  -> busca um
  router.get('/:id', async (req, res) => {
    const { rows } = await db.query(`SELECT * FROM ${tabela} WHERE id = $1`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ erro: `${nome} não encontrado(a)` });
    res.json(rows[0]);
  });

  // POST /  -> cria
  router.post('/', async (req, res) => {
    const body = req.body || {};
    const faltando = obrigatorios.filter((c) => body[c] === undefined || body[c] === '');
    if (faltando.length) {
      return res.status(400).json({ erro: `Campos obrigatórios: ${faltando.join(', ')}` });
    }

    const colunas = campos.filter((c) => body[c] !== undefined);
    const valores = colunas.map((c) => body[c]);
    const marcadores = colunas.map((_, i) => `$${i + 1}`);

    const { rows } = await db.query(
      `INSERT INTO ${tabela} (${colunas.join(', ')}) VALUES (${marcadores.join(', ')}) RETURNING *`,
      valores
    );
    res.status(201).json(rows[0]);
  });

  // PUT /:id  -> atualiza apenas os campos enviados
  router.put('/:id', async (req, res) => {
    const body = req.body || {};
    const colunas = campos.filter((c) => body[c] !== undefined);
    if (!colunas.length) {
      return res.status(400).json({ erro: `Envie ao menos um campo: ${campos.join(', ')}` });
    }

    const atribuicoes = colunas.map((c, i) => `${c} = $${i + 1}`);
    const valores = colunas.map((c) => body[c]);

    const { rows } = await db.query(
      `UPDATE ${tabela} SET ${atribuicoes.join(', ')} WHERE id = $${colunas.length + 1} RETURNING *`,
      [...valores, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ erro: `${nome} não encontrado(a)` });
    res.json(rows[0]);
  });

  // DELETE /:id  -> exclui
  router.delete('/:id', async (req, res) => {
    const { rows } = await db.query(`DELETE FROM ${tabela} WHERE id = $1 RETURNING *`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ erro: `${nome} não encontrado(a)` });
    res.json({ mensagem: `${nome} excluído(a) com sucesso`, registro: rows[0] });
  });

  return router;
}

module.exports = crudRouter;
