const { Client } = require('pg');

const client = new Client({
  host: 'db',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'theredoces',
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
