export const querys = {
    getallrutas: 'EXEC ObtenerRutas',
    postnewruta: 'EXEC InsertarRuta @Nombre, @Descripcion, @Horarios, @Estado, @IdTipoRuta',
    deleteruta: 'EXEC EliminarRuta @IdRuta',
    updateruta: 'EXEC ActualizarRuta @IdRuta, @Nombre, @Descripcion, @Horarios, @Estado, @IdTipoRuta',
}