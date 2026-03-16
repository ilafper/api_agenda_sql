const express = require("express");

//conexion
const pool = require("./db.js");
const app = express();

app.use(express.json()); 


// get todos clientes
app.get("/api/clientesql", async (req, res) => {

  try {
    const [lista] = await pool.query("SELECT * FROM clientes");
    res.json({ success: true, lista_clientes: lista });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// crear cliente sql
app.post("/api/crearclientsql", async (req, res) => {
  const { nombre, apellidos, telefono, direccion, correo } = req.body;

  const code_user = 'codigo' + Math.floor(Math.random() * 1000);
  try {
    const sql = "INSERT INTO clientes (nombre, apellidos, telefono,direccion, correo, code_user) VALUES (?, ?, ?, ?,?,?)";
    const [result] = await pool.execute(sql, [nombre, apellidos, telefono, correo, direccion, code_user]);
    res.json({ success: true, mensaje: "cliente creado correctamente"});

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});



// borrar usuario sql


app.delete("/api/deleteclientesql/:id_eliminar", async (req, res) => {
  const id_eliminar = req.params.id_eliminar;
  console.log(id_eliminar);
  
  try {
    const consulta = await pool.execute("DELETE FROM clientes WHERE code_user = ?", [id_eliminar]);
    if (consulta.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "No se encontró el cliente" });
    }

    res.json({ success: true, mensaje: `Cliente ${id_eliminar} eliminado` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
module.exports = app;