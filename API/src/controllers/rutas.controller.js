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
  const { Nombre, Descripcion, Horarios, Estado, IdTipoRuta, TipoBus } = req.body;
  if (
    Nombre == null ||
    Descripcion == null ||
    Horarios == null ||
    Estado == null ||
    IdTipoRuta == null || 
    TipoBus == null
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
        .input("TipoBus" ,  TipoBus)
        .query(querys.postnewruta);
      return res.json({ Nombre, Descripcion, Horarios, Estado, IdTipoRuta ,TipoBus });
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error" , error: error });
    }
  }
};

export const deleteRuta = async (req, res) => {
  const { IdRuta } = req.params;
  if (IdRuta == null) {
    return res.status(400).json({ msg: "Bad request: missing IdRuta parameter"  });
  }
  
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdRuta", parseInt(IdRuta))
      .query(querys.deleteruta);
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Route not found" });
    }

    return res.json({ msg: "Route successfully deleted", IdRuta });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" , error: error.message });
  }
};

export const updateRuta = async (req, res) => {
  const { IdRuta } = req.params;
  const { Nombre, Descripcion, Horarios, Estado, IdTipoRuta , TipoBus } = req.body;
  if (
    Nombre == null ||
    Descripcion == null ||
    Horarios == null ||
    Estado == null ||
    IdTipoRuta == null ||
    TipoBus == null
  ) {
    return res.status(400).json({ msg: "Bad request fill all fields " });
  } else {
    try {
      const pool = await getConnection();
      await pool
        .request()
        .input("IdRuta",  parseInt(IdRuta))
        .input("Nombre", Nombre)
        .input("Descripcion", Descripcion)
        .input("Horarios", Horarios)
        .input("Estado", Estado)
        .input("IdTipoRuta",  parseInt(IdTipoRuta))
        .input ("TipoBus", TipoBus)
        .query(querys.updateruta);
      return res.json({ msg:"Ruta actualizada correctamente" ,IdRuta, Nombre, Descripcion, Horarios, Estado, IdTipoRuta ,TipoBus});
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error" , error: error.message });
    }
  }
};
