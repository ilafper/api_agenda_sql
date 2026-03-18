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
    const [result] = await pool.execute(sql, [nombre, apellidos, telefono, direccion, correo, code_user]);
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
    const [consulta] = await pool.execute("DELETE FROM clientes WHERE code_user = ?", [id_eliminar]);
    
    if (consulta.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "No se encontró el cliente" });
    }

    res.json({ success: true, mensaje: `Cliente ${id_eliminar} eliminado` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});





// filtro nombre sql 
app.get("/api/filtronombresql/:nombreBusqueda", async (req, res) => {
  
 const filtroNombreSql = req.params.nombreBusqueda;
 console.log(filtroNombreSql);
 const filtroNuevo = "%"+ filtroNombreSql+ "%";
 console.log(filtroNuevo);
 
  try {
    //select * from clientes where nombre like "%ari%";
    const [consulta] = await pool.execute('select * from clientes where nombre like ?', [filtroNuevo] );
    if (consulta.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "No se encontro ningun resultado" });
    }

    res.json({ success: true, mensaje:"todas las coincidencias", datos: consulta });

  } catch (error) {
    res.status(500).json({ success: false, error: "Error al encontrar", detalle: error.message });
  }
});

app.get("/api/filtroapellidossql/:apellidosBusqueda", async (req, res) => {
  
 const filtroApellidosql = req.params.apellidosBusqueda;
 //console.log(filtroApellidosql);
 const filtroNuevo = "%"+ filtroApellidosql+ "%";
 //console.log(filtroNuevo);
 
  try {
    //select * from clientes where nombre like "%ari%";

    // sin el corchete manda datos extra que no nos importan y lo ponemos en tre elos para solo el resultado de la busqueda
    const [consulta] = await pool.execute('select * from clientes where apellidos like ?', [filtroNuevo] );
    if (consulta.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "No se encontro ningun resultado" });
    }

    res.json({ success: true, mensaje:"todas las coincidencias", datos: consulta });

  } catch (error) {
    res.status(500).json({ success: false, error: "Error al encontrar", detalle: error.message });
  }
});



app.get("/api/filtrotelefono/:telefono", async (req, res) => {
  
 const filtroTelesql = req.params.telefono;
 //console.log(filtroApellidosql);
 const filtroNuevo = "%"+ filtroTelesql+ "%";
 //console.log(filtroNuevo);
 
  try {
    //select * from clientes where nombre like "%ari%";

    // sin el corchete manda datos extra que no nos importan y lo ponemos en tre elos para solo el resultado de la busqueda
    const [consulta] = await pool.execute('select * from clientes where telefono like ?', [filtroNuevo] );
    if (consulta.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "No se encontro ningun resultado" });
    }

    res.json({ success: true, mensaje:"todas las coincidencias", datos: consulta });

  } catch (error) {
    res.status(500).json({ success: false, error: "Error al encontrar", detalle: error.message });
  }
});


app.get("/api/filtrocorreo/:correo", async (req, res) => {
  
 const filtroCorreoSql = req.params.correo;
 //console.log(filtroApellidosql);
 const filtroNuevo = "%"+ filtroCorreoSql+ "%";
 //console.log(filtroNuevo);
 
  try {
    //select * from clientes where nombre like "%ari%";

    // sin el corchete manda datos extra que no nos importan y lo ponemos en tre elos para solo el resultado de la busqueda
    const [consulta] = await pool.execute('select * from clientes where correo like ?', [filtroNuevo] );
    if (consulta.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "No se encontro ningun resultado" });
    }

    res.json({ success: true, mensaje:"todas las coincidencias", datos: consulta });

  } catch (error) {
    res.status(500).json({ success: false, error: "Error al encontrar", detalle: error.message });
  }
});

app.get("/api/filtrodireccion/:direccion", async (req, res) => {
  
 const filtroDrireccionSql = req.params.direccion;
 //console.log(filtroApellidosql);
 const filtroNuevo = "%"+ filtroDrireccionSql+ "%";
 //console.log(filtroNuevo);
 
  try {
    //select * from clientes where nombre like "%ari%";

    // sin el corchete manda datos extra que no nos importan y lo ponemos en tre elos para solo el resultado de la busqueda
    const [consulta] = await pool.execute('select * from clientes where direccion like ?', [filtroNuevo] );
    if (consulta.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "No se encontro ningun resultado" });
    }

    res.json({ success: true, mensaje:"todas las coincidencias", datos: consulta });

  } catch (error) {
    res.status(500).json({ success: false, error: "Error al encontrar", detalle: error.message });
  }
});



module.exports = app;