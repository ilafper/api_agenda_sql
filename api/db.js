const mysql = require("mysql2/promise");
//grupo de conexiones listas para usar


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "agenda",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});



module.exports = pool;