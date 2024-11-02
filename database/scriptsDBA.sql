-- Crear la base de datos
CREATE DATABASE GestionRutas;
GO

-- Usar la base de datos
USE GestionRutas;
GO

-- Tabla: Tipo de Ruta
CREATE TABLE TipoRuta (
    IdTipoRuta INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(255) NULL
);
GO

-- Tabla: Ruta de Autob�s
CREATE TABLE Ruta (
    IdRuta INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(255) NULL,
    Horarios NVARCHAR(255) NULL, -- Puedes definir un formato para los horarios
    Estado NVARCHAR(20) NOT NULL, -- 'Activa', 'Inactiva'
    IdTipoRuta INT NOT NULL,
    FOREIGN KEY (IdTipoRuta) REFERENCES TipoRuta(IdTipoRuta)
);
GO

-----modificacion de examen
ALTER TABLE Ruta
ADD TipoBus VARCHAR(50) NULL;
GO

---------.



-- Tabla: Parada de la Ruta
CREATE TABLE Parada (
    IdParada INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(50) NOT NULL,
    Ubicacion NVARCHAR(255) NOT NULL, -- Puedes usar coordenadas o una direcci�n
    TiempoEstimadoLlegada INT NULL, -- En minutos
    IdRuta INT NOT NULL,
    FOREIGN KEY (IdRuta) REFERENCES Ruta(IdRuta)
);
GO

-------------------------------------------------
-- Procedimientos Almacenados
-------------------------------------------------

--- Tipos de Ruta ---
-- Crear un nuevo Tipo de Ruta
CREATE PROCEDURE InsertarTipoRuta
    @Nombre NVARCHAR(50),
    @Descripcion NVARCHAR(255) = NULL
AS
BEGIN
    INSERT INTO TipoRuta (Nombre, Descripcion)
    VALUES (@Nombre, @Descripcion);
END
GO

-- Leer todos los Tipos de Ruta
CREATE PROCEDURE ObtenerTiposRuta
AS
BEGIN
    SELECT * FROM TipoRuta;
END
GO

-- Actualizar un Tipo de Ruta
CREATE PROCEDURE ActualizarTipoRuta
    @IdTipoRuta INT,
    @Nombre NVARCHAR(50),
    @Descripcion NVARCHAR(255) = NULL
AS
BEGIN
    UPDATE TipoRuta
    SET Nombre = @Nombre, Descripcion = @Descripcion
    WHERE IdTipoRuta = @IdTipoRuta;
END
GO

-- Eliminar un Tipo de Ruta
CREATE PROCEDURE EliminarTipoRuta
    @IdTipoRuta INT
AS
BEGIN
    DELETE FROM TipoRuta
    WHERE IdTipoRuta = @IdTipoRuta;
END
GO

--- Rutas ---
-- Crear una nueva Ruta
CREATE PROCEDURE InsertarRuta
    @Nombre NVARCHAR(50),
    @Descripcion NVARCHAR(255) = NULL,
    @Horarios NVARCHAR(255) = NULL,
    @Estado NVARCHAR(20),
    @IdTipoRuta INT,
    @TipoBus VARCHAR(50) = NULL  -- Nuevo parámetro
AS
BEGIN
    INSERT INTO Ruta (Nombre, Descripcion, Horarios, Estado, IdTipoRuta, TipoBus)
    VALUES (@Nombre, @Descripcion, @Horarios, @Estado, @IdTipoRuta, @TipoBus);
END
GO

-- Leer todas las Rutas
CREATE PROCEDURE ObtenerRutas
AS
BEGIN
    SELECT * FROM Ruta;
END
GO

-- Actualizar una Ruta
CREATE PROCEDURE ActualizarRuta
    @IdRuta INT,
    @Nombre NVARCHAR(50),
    @Descripcion NVARCHAR(255) = NULL,
    @Horarios NVARCHAR(255) = NULL,
    @Estado NVARCHAR(20),
    @IdTipoRuta INT,
    @TipoBus VARCHAR(50) = NULL  -- Nuevo parámetro
AS
BEGIN
    UPDATE Ruta
    SET Nombre = @Nombre,
        Descripcion = @Descripcion,
        Horarios = @Horarios,
        Estado = @Estado,
        IdTipoRuta = @IdTipoRuta,
        TipoBus = @TipoBus  -- Actualización del nuevo campo
    WHERE IdRuta = @IdRuta;
END
GO

-- Eliminar una Ruta
CREATE PROCEDURE EliminarRuta
    @IdRuta INT
AS
BEGIN
    DELETE FROM Ruta
    WHERE IdRuta = @IdRuta;
END
GO

--- Paradas ---
-- Crear una nueva Parada
CREATE PROCEDURE InsertarParada
    @Nombre NVARCHAR(50),
    @Ubicacion NVARCHAR(255),
    @TiempoEstimadoLlegada INT = NULL,
    @IdRuta INT
AS
BEGIN
    INSERT INTO Parada (Nombre, Ubicacion, TiempoEstimadoLlegada, IdRuta)
    VALUES (@Nombre, @Ubicacion, @TiempoEstimadoLlegada, @IdRuta);
END
GO

-- Leer todas las Paradas
CREATE PROCEDURE ObtenerParadas
AS
BEGIN
    SELECT * FROM Parada;
END
GO

-- Actualizar una Parada
CREATE PROCEDURE ActualizarParada
    @IdParada INT,
    @Nombre NVARCHAR(50),
    @Ubicacion NVARCHAR(255),
    @TiempoEstimadoLlegada INT = NULL,
    @IdRuta INT
AS
BEGIN
    UPDATE Parada
    SET Nombre = @Nombre, Ubicacion = @Ubicacion, TiempoEstimadoLlegada = @TiempoEstimadoLlegada, IdRuta = @IdRuta
    WHERE IdParada = @IdParada;
END
GO

-- Eliminar una Parada
CREATE PROCEDURE EliminarParada
    @IdParada INT
AS
BEGIN
    DELETE FROM Parada
    WHERE IdParada = @IdParada;
END
GO

-- Obtener todas las Paradas de una Ruta espec�fica
CREATE PROCEDURE ObtenerParadasPorRuta
    @IdRuta INT
AS
BEGIN
    SELECT *
    FROM Parada
    WHERE IdRuta = @IdRuta;
END
GO

---------------------------------------DATOS DE EJEMPLO----------------------------------------------------------
-- Insertar tipos de ruta
EXEC InsertarTipoRuta @Nombre = 'Ruta Urbana', @Descripcion = 'Rutas que operan dentro de la ciudad';
EXEC InsertarTipoRuta @Nombre = 'Ruta Interurbana', @Descripcion = 'Rutas que conectan diferentes ciudades';

-- Insertar rutas
EXEC InsertarRuta @Nombre = 'Ruta 1', @Descripcion = 'Ruta que conecta el centro con la zona norte', @Horarios = '8:00-18:00', @Estado = 'Activa', @IdTipoRuta = 1;
EXEC InsertarRuta @Nombre = 'Ruta 2', @Descripcion = 'Ruta que conecta el centro con la zona sur', @Horarios = '8:00-18:00', @Estado = 'Activa', @IdTipoRuta = 1;

-- Insertar paradas
EXEC InsertarParada @Nombre = 'Parada 1', @Ubicacion = 'Calle A y Calle B', @TiempoEstimadoLlegada = 5, @IdRuta = 1;
EXEC InsertarParada @Nombre = 'Parada 2', @Ubicacion = 'Calle C y Calle D', @TiempoEstimadoLlegada = 10, @IdRuta = 1;
EXEC InsertarParada @Nombre = 'Parada 3', @Ubicacion = 'Calle E y Calle F', @TiempoEstimadoLlegada = 15, @IdRuta = 2;
