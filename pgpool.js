const { Pool, Client } = require('pg').native
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})

async function getroles() {
  pool.query('SELECT *from pg_roles', (err, res) => {
    console.log(res.rows[0]);
    pool.end()
  })
}
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
//  console.log(err, res.fields)
  client.end()
})

module.exports = {client};
document.getElementById("sample").innerHTML = await getroles();