export const querys = {
//CONSULTAS PARA TABLA RUTAS    
    getallrutas: 'EXEC ObtenerRutas',
    postnewruta: 'EXEC InsertarRuta @Nombre, @Descripcion, @Horarios, @Estado, @IdTipoRuta',
    deleteruta:  'EXEC EliminarRuta @IdRuta',
    updateruta:  'EXEC ActualizarRuta @IdRuta, @Nombre, @Descripcion, @Horarios, @Estado, @IdTipoRuta',

//CONSULTAS PARA TABLA TIPOS 
    getalltypes: 'EXEC ObtenerTiposRuta ',
    postnewtype: 'EXEC InsertarTipoRuta @Nombre @Descripcion',
    deletetype:  'EXEC EliminarTipoRuta @IdTipoRuta',
    updatetype:  'EXEC ActualizarTipoRuta @IdTipoRuta @Nombre @Descripcion',
    
//CONSULTAS PARA TABLA PARADAS
    getallstation:  'EXEC ObtenerParadas ',
    postnewstation: 'EXEC InsertarParada @Nombre  @Ubicacion @TiempoEstimadoLlegada @IdRuta',
    deletestation:  'EXEC EliminarParada @IdParada',
    updatestation:  'EXEC ActualizarParada @IdParada  @Nombre @Ubicacion  @TiempoEstimadoLlegada @IdRuta',
}