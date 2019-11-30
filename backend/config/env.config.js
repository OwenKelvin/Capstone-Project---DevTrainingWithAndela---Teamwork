const DATABASE_URL = 'postgres://root:password@localhost:5432/teamwork';
const PASSPORT_SECRET = '24rdfyi8$&i!';
const apiBase = process.env.BACKEND_URL + "api/v1" || "http://localhost:3000/api/v1";
const baseUrl = process.env.BACKEND_URL || 'http://localhost:3000/';

module.exports = {
  PASSPORT_SECRET,
  apiBase,
  DATABASE_URL,
  baseUrl,
};
