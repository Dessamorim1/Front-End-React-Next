-- Recria todas as tabelas (CUIDADO: apaga os dados existentes)
DROP TABLE IF EXISTS pessoa_habilidades, projetos, experiencias, formacoes, habilidades, pessoas CASCADE;

-- Pessoa dona do currículo
CREATE TABLE pessoas (
  id        SERIAL PRIMARY KEY,
  nome      VARCHAR(120) NOT NULL,
  titulo    VARCHAR(120),
  email     VARCHAR(120) UNIQUE,
  telefone  VARCHAR(30),
  cidade    VARCHAR(80),
  resumo    TEXT,
  github    VARCHAR(200),
  linkedin  VARCHAR(200),
  criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Experiências acadêmicas (1 pessoa : N formações)
CREATE TABLE formacoes (
  id          SERIAL PRIMARY KEY,
  pessoa_id   INT NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  instituicao VARCHAR(150) NOT NULL,
  curso       VARCHAR(150) NOT NULL,
  nivel       VARCHAR(50),
  data_inicio DATE,
  data_fim    DATE,
  descricao   TEXT
);

-- Experiências profissionais (1 pessoa : N experiências)
CREATE TABLE experiencias (
  id          SERIAL PRIMARY KEY,
  pessoa_id   INT NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  empresa     VARCHAR(150) NOT NULL,
  cargo       VARCHAR(120) NOT NULL,
  data_inicio DATE,
  data_fim    DATE,
  atual       BOOLEAN NOT NULL DEFAULT FALSE,
  descricao   TEXT
);

-- Projetos (1 pessoa : N projetos)
CREATE TABLE projetos (
  id               SERIAL PRIMARY KEY,
  pessoa_id        INT NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  nome             VARCHAR(150) NOT NULL,
  descricao        TEXT,
  tecnologias      VARCHAR(255),
  link_repositorio VARCHAR(255),
  link_deploy      VARCHAR(255)
);

-- Habilidades (catálogo compartilhado entre as pessoas)
CREATE TABLE habilidades (
  id        SERIAL PRIMARY KEY,
  nome      VARCHAR(80) NOT NULL UNIQUE,
  categoria VARCHAR(50)
);

-- Tabela associativa (N pessoas : N habilidades)
CREATE TABLE pessoa_habilidades (
  pessoa_id     INT NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  habilidade_id INT NOT NULL REFERENCES habilidades(id) ON DELETE CASCADE,
  nivel         VARCHAR(20) NOT NULL DEFAULT 'Básico',
  PRIMARY KEY (pessoa_id, habilidade_id)
);
