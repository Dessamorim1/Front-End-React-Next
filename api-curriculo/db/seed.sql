-- Dados iniciais: currículo de DUAS pessoas
-- Rode depois do schema.sql (npm run db:setup faz os dois)

-- ===================== PESSOAS =====================
INSERT INTO pessoas (nome, titulo, email, telefone, cidade, resumo, github, linkedin) VALUES
('Andressa Amorim', 'Desenvolvedora Full Stack', NULL, NULL, 'Recife - PE',
 'Desenvolvedora Full Stack apaixonada por criar aplicações modernas, escaláveis e funcionais, unindo backend robusto e interfaces intuitivas. Experiência com Python, FastAPI, SQL e Next.js, com foco em performance, organização e experiência do usuário.',
 'https://github.com/Dessamorim1', NULL),
('Lucas Ferreira Santos', 'Desenvolvedor Back-End', 'lucas.santos@example.com', '(81) 99999-0000', 'Olinda - PE',
 'Desenvolvedor back-end focado em APIs REST com Node.js e bancos relacionais. Gosta de automação, testes e boas práticas de arquitetura.',
 'https://github.com/lucasfsantos', 'https://www.linkedin.com/in/lucasfsantos');

-- ===================== FORMAÇÕES =====================
INSERT INTO formacoes (pessoa_id, instituicao, curso, nivel, data_inicio, data_fim, descricao) VALUES
((SELECT id FROM pessoas WHERE nome = 'Andressa Amorim'),
 'Universidade Católica de Pernambuco (UNICAP)', 'Análise e Desenvolvimento de Sistemas', 'Tecnólogo',
 '2025-02-01', NULL, 'Disciplinas de programação front-end com React/Next.js, back-end com Node.js e banco de dados.'),
((SELECT id FROM pessoas WHERE nome = 'Lucas Ferreira Santos'),
 'Universidade Federal de Pernambuco (UFPE)', 'Ciência da Computação', 'Bacharelado',
 '2019-03-01', '2023-12-15', 'TCC sobre desempenho de APIs REST com PostgreSQL.'),
((SELECT id FROM pessoas WHERE nome = 'Lucas Ferreira Santos'),
 'Alura', 'Formação Node.js', 'Curso livre',
 '2022-01-10', '2022-06-30', 'Express, autenticação JWT, testes automatizados e Docker.');

-- ===================== EXPERIÊNCIAS =====================
INSERT INTO experiencias (pessoa_id, empresa, cargo, data_inicio, data_fim, atual, descricao) VALUES
((SELECT id FROM pessoas WHERE nome = 'Andressa Amorim'),
 'SAFE Suporte à Vida', 'Jovem Aprendiz Administrativo', '2024-01-01', '2025-01-31', FALSE,
 'Organização de processos, controle de informações e suporte operacional. Início do desenvolvimento de soluções tecnológicas internas.'),
((SELECT id FROM pessoas WHERE nome = 'Andressa Amorim'),
 'SAFE Suporte à Vida', 'Estagiária de TI', '2025-02-01', '2026-01-31', FALSE,
 'Suporte e desenvolvimento de soluções internas, automação de processos e integração de sistemas com Python, Flask e SAP Business One.'),
((SELECT id FROM pessoas WHERE nome = 'Andressa Amorim'),
 'FASA - Universidade Católica de Pernambuco', 'Estagiária Desenvolvedora Full Stack', '2026-02-01', NULL, TRUE,
 'Desenvolvimento de aplicações full stack, APIs REST, sistemas web e automações utilizando FastAPI e Angular.'),
((SELECT id FROM pessoas WHERE nome = 'Lucas Ferreira Santos'),
 'TechNordeste Sistemas', 'Desenvolvedor Back-End Júnior', '2024-01-15', NULL, TRUE,
 'Manutenção e criação de APIs REST em Node.js/Express com PostgreSQL, integração com serviços de pagamento.'),
((SELECT id FROM pessoas WHERE nome = 'Lucas Ferreira Santos'),
 'Porto Digital', 'Estagiário de Desenvolvimento', '2022-07-01', '2023-12-20', FALSE,
 'Desenvolvimento de scripts de automação e apoio à equipe de back-end.');

-- ===================== PROJETOS =====================
INSERT INTO projetos (pessoa_id, nome, descricao, tecnologias, link_repositorio, link_deploy) VALUES
((SELECT id FROM pessoas WHERE nome = 'Andressa Amorim'),
 'Portfólio / Currículo', 'Site de currículo com páginas Sobre, Experiência e Projetos (consumindo a API do GitHub).',
 'Next.js, React, CSS', 'https://github.com/Dessamorim1/Front-End-React-Next/tree/main/curriculo',
 'https://portifolio-inky-omega-75.vercel.app/'),
((SELECT id FROM pessoas WHERE nome = 'Andressa Amorim'),
 'Profile Site', 'Componente de perfil com foto, nome e bio.',
 'Next.js, React', 'https://github.com/Dessamorim1/Front-End-React-Next/tree/main/profile-site', NULL),
((SELECT id FROM pessoas WHERE nome = 'Andressa Amorim'),
 'Jogo de Dados', 'Jogo de dados para web e mobile.',
 'Next.js, React Native, Bootstrap', 'https://github.com/Dessamorim1/Front-End-React-Next/tree/main/jogo-dados', NULL),
((SELECT id FROM pessoas WHERE nome = 'Andressa Amorim'),
 'API de Currículos', 'API REST com CRUD de currículos, formações, experiências, projetos e habilidades.',
 'Node.js, Express, PostgreSQL, NeonDB, Vercel', 'https://github.com/Dessamorim1/Front-End-React-Next/tree/main/api-curriculo', NULL),
((SELECT id FROM pessoas WHERE nome = 'Lucas Ferreira Santos'),
 'Gerenciador de Tarefas', 'API de tarefas com autenticação JWT e testes automatizados.',
 'Node.js, Express, PostgreSQL, Jest', 'https://github.com/lucasfsantos/gerenciador-tarefas', NULL),
((SELECT id FROM pessoas WHERE nome = 'Lucas Ferreira Santos'),
 'Bot de Cotações', 'Bot que consulta cotações de moedas e envia alertas no Telegram.',
 'Python, Docker', 'https://github.com/lucasfsantos/bot-cotacoes', NULL);

-- ===================== HABILIDADES =====================
INSERT INTO habilidades (nome, categoria) VALUES
('Python', 'Linguagem'),
('JavaScript', 'Linguagem'),
('SQL', 'Banco de dados'),
('PostgreSQL', 'Banco de dados'),
('MySQL', 'Banco de dados'),
('FastAPI', 'Framework'),
('Flask', 'Framework'),
('Next.js', 'Framework'),
('React', 'Framework'),
('Node.js', 'Plataforma'),
('Express', 'Framework'),
('Docker', 'Ferramenta'),
('SAP Business One', 'Ferramenta'),
('Git', 'Ferramenta');

-- ===================== PESSOA x HABILIDADES (N:N) =====================
INSERT INTO pessoa_habilidades (pessoa_id, habilidade_id, nivel)
SELECT p.id, h.id, v.nivel
FROM (VALUES
  ('Andressa Amorim', 'Python', 'Avançado'),
  ('Andressa Amorim', 'FastAPI', 'Avançado'),
  ('Andressa Amorim', 'Flask', 'Intermediário'),
  ('Andressa Amorim', 'SQL', 'Avançado'),
  ('Andressa Amorim', 'MySQL', 'Intermediário'),
  ('Andressa Amorim', 'JavaScript', 'Intermediário'),
  ('Andressa Amorim', 'Next.js', 'Intermediário'),
  ('Andressa Amorim', 'React', 'Intermediário'),
  ('Andressa Amorim', 'Docker', 'Básico'),
  ('Andressa Amorim', 'SAP Business One', 'Intermediário'),
  ('Andressa Amorim', 'Git', 'Intermediário'),
  ('Lucas Ferreira Santos', 'JavaScript', 'Avançado'),
  ('Lucas Ferreira Santos', 'Node.js', 'Avançado'),
  ('Lucas Ferreira Santos', 'Express', 'Avançado'),
  ('Lucas Ferreira Santos', 'PostgreSQL', 'Avançado'),
  ('Lucas Ferreira Santos', 'SQL', 'Avançado'),
  ('Lucas Ferreira Santos', 'Python', 'Intermediário'),
  ('Lucas Ferreira Santos', 'Docker', 'Intermediário'),
  ('Lucas Ferreira Santos', 'Git', 'Avançado')
) AS v(pessoa, habilidade, nivel)
JOIN pessoas p ON p.nome = v.pessoa
JOIN habilidades h ON h.nome = v.habilidade;
