const express = require('express');
const cors = require('cors');
const crudRouter = require('./crud');
const pessoasRouter = require('./routes/pessoas');
const habilidadesRouter = require('./routes/habilidades');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    api: 'API de Currículos',
    rotas: {
      pessoas: '/pessoas',
      curriculoCompleto: '/pessoas/:id/curriculo',
      formacoes: '/formacoes',
      experiencias: '/experiencias',
      projetos: '/projetos',
      habilidades: '/habilidades',
      habilidadesDaPessoa: '/pessoas/:id/habilidades',
      pessoasComHabilidade: '/habilidades/:id/pessoas',
    },
  });
});

app.use('/pessoas', pessoasRouter);
app.use('/habilidades', habilidadesRouter);

app.use('/formacoes', crudRouter({
  tabela: 'formacoes',
  nome: 'Formação',
  campos: ['pessoa_id', 'instituicao', 'curso', 'nivel', 'data_inicio', 'data_fim', 'descricao'],
  obrigatorios: ['pessoa_id', 'instituicao', 'curso'],
}));

app.use('/experiencias', crudRouter({
  tabela: 'experiencias',
  nome: 'Experiência',
  campos: ['pessoa_id', 'empresa', 'cargo', 'data_inicio', 'data_fim', 'atual', 'descricao'],
  obrigatorios: ['pessoa_id', 'empresa', 'cargo'],
}));

app.use('/projetos', crudRouter({
  tabela: 'projetos',
  nome: 'Projeto',
  campos: ['pessoa_id', 'nome', 'descricao', 'tecnologias', 'link_repositorio', 'link_deploy'],
  obrigatorios: ['pessoa_id', 'nome'],
}));

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Traduz os erros mais comuns do PostgreSQL em respostas amigáveis
const ERROS_POSTGRES = {
  23503: [400, 'Registro relacionado não existe (verifique pessoa_id / habilidade_id)'],
  23505: [409, 'Registro duplicado'],
  23502: [400, 'Campo obrigatório não informado'],
  '22P02': [400, 'Valor inválido (verifique se o id é um número)'],
  22007: [400, 'Data inválida (use o formato AAAA-MM-DD)'],
  22008: [400, 'Data inválida (use o formato AAAA-MM-DD)'],
};

app.use((err, req, res, next) => {
  if (ERROS_POSTGRES[err.code]) {
    const [status, erro] = ERROS_POSTGRES[err.code];
    return res.status(status).json({ erro, detalhe: err.detail || err.message });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido no corpo da requisição' });
  }
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

module.exports = app;
