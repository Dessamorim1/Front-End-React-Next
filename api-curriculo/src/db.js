const { Pool, types } = require('pg');

// Retorna colunas DATE como texto 'AAAA-MM-DD' (evita problemas de fuso horário)
types.setTypeParser(1082, (valor) => valor);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
});

module.exports = {
  query: (sql, params) => pool.query(sql, params),
  pool,
};
