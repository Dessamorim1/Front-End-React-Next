# API de Currículos — Express + PostgreSQL (NeonDB)

API REST com CRUD completo para montar um app de currículo. Banco PostgreSQL hospedado no NeonDB e deploy na Vercel.

## Modelo de dados

```
pessoas ──1:N── formacoes        (experiências acadêmicas)
        ──1:N── experiencias     (experiências profissionais)
        ──1:N── projetos
        ──N:N── habilidades      (via tabela pessoa_habilidades, com o "nivel")
```

Ao excluir uma pessoa, as formações, experiências, projetos e vínculos dela são excluídos juntos (`ON DELETE CASCADE`).

O banco já vem com o currículo de **duas pessoas** (`db/seed.sql`).

## Rotas

| Recurso | Rotas |
|---|---|
| Pessoas | `GET/POST /pessoas` · `GET/PUT/DELETE /pessoas/:id` |
| Formações | `GET/POST /formacoes` · `GET/PUT/DELETE /formacoes/:id` |
| Experiências | `GET/POST /experiencias` · `GET/PUT/DELETE /experiencias/:id` |
| Projetos | `GET/POST /projetos` · `GET/PUT/DELETE /projetos/:id` |
| Habilidades | `GET/POST /habilidades` · `GET/PUT/DELETE /habilidades/:id` |

**Relacionamentos**

| Método | Rota | O que faz |
|---|---|---|
| GET | `/pessoas/:id/curriculo` | Currículo completo (pessoa + tudo relacionado) |
| GET | `/pessoas/:id/formacoes` | Formações da pessoa |
| GET | `/pessoas/:id/experiencias` | Experiências da pessoa |
| GET | `/pessoas/:id/projetos` | Projetos da pessoa |
| GET | `/pessoas/:id/habilidades` | Habilidades da pessoa com nível |
| POST | `/pessoas/:id/habilidades` | Vincula habilidade `{ "habilidade_id": 1, "nivel": "Avançado" }` |
| PUT | `/pessoas/:id/habilidades/:habilidadeId` | Altera o nível `{ "nivel": "Intermediário" }` |
| DELETE | `/pessoas/:id/habilidades/:habilidadeId` | Remove o vínculo |
| GET | `/habilidades/:id/pessoas` | Pessoas que têm a habilidade |

Datas no formato `AAAA-MM-DD`. No `PUT` basta enviar os campos que vão mudar.

## Como rodar

### 1. Banco no NeonDB
1. Crie um projeto em https://neon.tech e copie a **connection string**.
2. Copie `.env.example` para `.env` e cole a connection string em `DATABASE_URL`.
3. Crie as tabelas e cadastre os dados:
   ```bash
   npm install
   npm run db:setup
   ```
   (Também dá para colar `db/schema.sql` e depois `db/seed.sql` no **SQL Editor** do Neon.)

### 2. Localmente
```bash
npm run dev
# http://localhost:3000
```

### 3. Deploy na Vercel
1. Envie o código para o GitHub.
2. Na Vercel: **Add New → Project**, importe o repositório e em **Root Directory** escolha `api-curriculo`.
3. Em **Environment Variables** adicione `DATABASE_URL` com a connection string do Neon.
4. Clique em **Deploy**. Teste abrindo `https://SEU-PROJETO.vercel.app/pessoas`.

## Postman
1. **Import** → `postman/API-Curriculo.postman_collection.json`.
2. Clique na coleção → aba **Variables** e troque `baseUrl` pela URL da Vercel → **Save**.
3. Para testar outro registro, altere `pessoaId`, `formacaoId`, `experienciaId`, `projetoId` ou `habilidadeId` e salve.
