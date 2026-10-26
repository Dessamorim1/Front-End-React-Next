// Cria as tabelas e cadastra os currículos iniciais no banco (NeonDB)
// Uso: npm run db:setup   (precisa do DATABASE_URL no arquivo .env)
const fs = require('node:fs');
const path = require('node:path');
const { pool } = require('../src/db');

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL não definida. Crie o arquivo .env a partir do .env.example');
  }

  for (const arquivo of ['schema.sql', 'seed.sql']) {
    const sql = fs.readFileSync(path.join(__dirname, '..', 'db', arquivo), 'utf8');
    await pool.query(sql);
    console.log(`✔ ${arquivo} executado`);
  }

  const { rows } = await pool.query('SELECT id, nome FROM pessoas ORDER BY id');
  console.log('Pessoas cadastradas:', rows);
}

main()
  .catch((err) => {
    console.error('Erro:', err.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
