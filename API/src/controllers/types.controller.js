import { getConnection, sql, querys } from "../database"

//OBTENER TODOS LOS TIPOS
export const getType = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getalltypes);
        return res.json(result.recordset);
      } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
      }
}

//CREAR UN NUEVO TIPO
export const postType = async (req, res) => {
    const { Nombre, Descripcion } = req.body
    if (Nombre == null || Descripcion == null) {
        return res.status(400).json({ msg: "Campos incompletos" })
    } else {
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input('Nombre', Nombre)
                .input('Descripcion', Descripcion)
                .query(querys.postnewtype)
            return res.json({ msg: "Tipo creado correctamente", Nombre, Descripcion })
        } catch (error) {
            return res.status(500).json({ msg: "Internal server error" , error:  error.message })
        }
    }
}

//ELIMINAR UN TIPO
export const delType = async (req, res) => {
    const { IdTipoRuta } = req.params
    if (IdTipoRuta == null) {
        return res.status(400).json({ msg: "Bad request: missing IdTipoRuta parameter" })
    } else {
        try {
            const pool = await getConnection()
            const result = await pool
                .request()
                .input('IdTipoRuta', parseInt(IdTipoRuta))
                .query(querys.deletetype)
            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ msg: "Tipo no encontrado" })
            } else {
                return res.json({ msg: "Tipo eliminado correctamente", IdTipoRuta })
            }
        } catch (error) {
            return res.status(500).json({ msg: "Internal server error" , error:  error.message })
        }
    }
}

//ACTUALIZAR UN TIPO
export const putType = async (req, res) => {
    const { IdTipoRuta } = req.params
    const { Nombre, Descripcion } = req.body
    if (IdTipoRuta == null){
        return res.status(400).json({ msg: "Bad request: missing IdTipoRuta parameter" })
    }else{
        if (Nombre == null || Descripcion == null){
            return res.status(400).json({ msg: "Campos incompletos" })
        }else{
            try {
                const pool = await getConnection()
                const result = await pool 
                .request()
                .input('IdTipoRuta' , parseInt(IdTipoRuta))
                .input('Nombre' , Nombre)
                .input('Descripcion', Descripcion)
                .query(querys.updatetype)
                if (result.rowsAffected[0] === 0) {
                    return res.status(404).json({ msg: "Tipo no encontrado" })
                } else {
                    return res.json({ msg: "Tipo modificado correctamente", IdTipoRuta , Nombre , Descripcion })
                }
            }catch(error){
                return res.status(500).json({ msg: "Internal server error" , error:  error.message })
            }
        }
    }   
}