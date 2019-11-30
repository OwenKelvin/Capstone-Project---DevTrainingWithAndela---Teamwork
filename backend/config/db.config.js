const pg = require('pg');

const config = {
  user: 'root',
  host: 'localhost',
  database: 'teamwork',
  password: 'password',
  port: 5432,
};
let pool;
const connectionString = process.env.DATABASE_URL;
if (connectionString) {
  pool = new pg.Pool({
    connectionString: connectionString
  });
} else {
  pool = new pg.Pool(config);
}

module.exports = { config, pool };
