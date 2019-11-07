const pg = require('pg');

const config = {
  user: 'root',
  host: 'localhost',
  database: 'teamwork',
  password: 'password',
  port: 5432,
};
const pool = new pg.Pool(config);

module.exports = { config, pool };
