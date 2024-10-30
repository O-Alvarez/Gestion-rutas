//CONTROLADOR PARA LA TABLA DE PARADAS DE AUTOBUSES
import { getConnection, sql, querys } from "../database"

export const getStations = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(querys.getallstation)
        return res.json(result.recordset)
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const postStation = async (req, res) => {
    const { Nombre, Ubicacion, TiempoEstimadoLlegada, IdRuta } = req.body
    if (Nombre == null || Ubicacion == null || TiempoEstimadoLlegada == null || IdRuta == null) {
        return res.status(400).json({ msg: "Complete todos los campos" })
    } else {
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input("Nombre", sql.NVARCHAR, Nombre)
                .input("Ubicacion", sql.NVARCHAR, Ubicacion)
                .input("TiempoEstimadoLlegada", sql.Int, parseInt(TiempoEstimadoLlegada))
                .input("IdRuta", sql.INT, parseInt(IdRuta))
        } catch (error) {
            return res.status(500).json({ msg: "Internal server error" })
        }
    }
}

export const delStation = async (req, res) => {
    const { IdParada } = req.params
    if (IdParada == null) {
        return res.status(400).json({ msg: "Es necesario el Id de la estacion" })
    } else {
        try {
            const pool = await getConnection()
            const result = await pool
                .request()
                .input("IdParada", sql.Int, parseInt(IdParada))
                .query(querys.deletestation)

            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ msg: "Route not found" })
            } else {
                return res.json({ msg: "Estacion borrada correctamente", IdParada })
            }
        } catch (error) {
            return res.status(500).json({ msg: "Internal server error" })
        }
    }
}


export const putStation = async (req, res) => {
    const { IdParada } = req.params
    const { Nombre, Ubicacion, TiempoEstimadoLlegada, IdRuta } = req.body
    if (IdParada == null) {
        return res.status(400).json({ msg: "Id de la ruta nulo " })
    } else {
        if (
            Nombre == null ||
            Ubicacion == null ||
            TiempoEstimadoLlegada == null ||
            IdRuta == null
        ) {
            try {
                const pool = await getConnection()
                const result = await pool
                    .request()
                    .input('IdParada', sql.Int, parseInt(IdParada))
                    .input('Nombre', sql.NVarchar, Nombre)
                    .input('Ubicacion', sql.NVarchar, Ubicacion)
                    .input('TiempoEstimadoLlegada', sql.Int, parseInt(TiempoEstimadoLlegada))
                    .input('IdRuta', sql.Int, parseInt(IdRuta))
                    .query(querys.putStation)
                if (result.rowsAffected[0] === 0) {
                    return res.status(404).json({ msg: "Estacion no encontrada" })
                } else {
                    return res.json({ msg: "Estacion modificada correctamente", IdParada, Nombre, Ubicacion, TiempoEstimadoLlegada, IdRuta })
                }
            } catch (error) {
                console.log(error)
                return res.status(500).json({ msg: error })
            }
        } else {
            return res.status(400).json({ msg: "campos incompletos" })
        }
    }
}



