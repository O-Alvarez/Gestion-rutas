//contiene las instrucciones para que el servidor sepa que hacer cuando se accede a una ruta
import { getConnection, sql, querys } from "../database";

export const getRutas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getallrutas);
    return res.json(result.recordset);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const postRuta = async (req, res) => {
  const { Nombre, Descripcion, Horarios, Estado, IdTipoRuta } = req.body;
  if (
    Nombre == null ||
    Descripcion == null ||
    Horarios == null ||
    Estado == null ||
    IdTipoRuta == null
  ) {
    return res.status(400).json({ msg: "Bad request fill all fields " });
  } else {
    try {
      const pool = await getConnection();
      await pool
        .request()
        .input("Nombre", Nombre)
        .input("Descripcion", Descripcion)
        .input("Horarios", Horarios)
        .input("Estado", Estado)
        .input("IdTipoRuta", IdTipoRuta)
        .query(querys.postnewruta);
      return res.json({ Nombre, Descripcion, Horarios, Estado, IdTipoRuta });
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
};

export const deleteRuta = async (req, res) => {
  const { IdRuta } = req.params;
  console.log(IdRuta);
  if (IdRuta == null) {
    return res.status(400).json({ msg: "Bad request: missing IdRuta parameter" });
  }
  
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdRuta", sql.Int, parseInt(IdRuta))
      .query(querys.deleteruta);
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Route not found" });
    }

    return res.json({ msg: "Route successfully deleted", IdRuta });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateRuta = async (req, res) => {
  const { IdRuta } = req.params;
  const { Nombre, Descripcion, Horarios, Estado, IdTipoRuta } = req.body;
  if (
    Nombre == null ||
    Descripcion == null ||
    Horarios == null ||
    Estado == null ||
    IdTipoRuta == null
  ) {
    return res.status(400).json({ msg: "Bad request fill all fields " });
  } else {
    try {
      const pool = await getConnection();
      await pool
        .request()
        .input("IdRuta", sql.Int, parseInt(IdRuta))
        .input("Nombre", Nombre)
        .input("Descripcion", Descripcion)
        .input("Horarios", Horarios)
        .input("Estado", Estado)
        .input("IdTipoRuta", sql.Int, parseInt(IdTipoRuta))
        .query(querys.updateruta);
      return res.json({ Nombre, Descripcion, Horarios, Estado, IdTipoRuta });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
};
