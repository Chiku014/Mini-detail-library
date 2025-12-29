const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "piaxis_local",  
  password: "Kiran@014",  
  port: 5432,
});

module.exports = pool;
