# API REST - Controladores

Este documento describe los controladores de la API REST que gestionan las rutas de autobuses, estaciones de autobús y tipos de ruta.

## Controladores

### 1. Rutas Controller

Maneja las operaciones CRUD para las rutas de autobús.

- **Obtener todas las rutas**
  - **Ruta**: `GET /rutas`
  - **Descripción**: Obtiene una lista de todas las rutas de autobús.
  - **Respuesta**: JSON con el conjunto de rutas.

- **Crear una nueva ruta**
  - **Ruta**: `POST /new-ruta`
  - **Descripción**: Crea una nueva ruta de autobús.
  - **Cuerpo de la solicitud**:
    ```json
    {
      "Nombre": "Nombre de la ruta",
      "Descripcion": "Descripción de la ruta"
    }
    ```
  - **Respuesta**: JSON con la ruta creada.

- **Eliminar una ruta**
  - **Ruta**: `DELETE /del-ruta/:IdRuta`
  - **Descripción**: Elimina una ruta existente.
  - **Parámetro**: `IdRuta` (ID de la ruta a eliminar).
  - **Respuesta**: Mensaje de confirmación.

- **Actualizar una ruta**
  - **Ruta**: `PUT /mod-ruta/:IdRuta`
  - **Descripción**: Actualiza una ruta existente.
  - **Parámetro**: `IdRuta` (ID de la ruta a actualizar).
  - **Cuerpo de la solicitud**:
    ```json
    {
      "Nombre": "Nuevo nombre de la ruta",
      "Descripcion": "Nueva descripción de la ruta"
    }
    ```
  - **Respuesta**: Mensaje de confirmación con los nuevos datos.

---

### 2. Estaciones Controller

Maneja las operaciones CRUD para las estaciones de autobús.

- **Obtener todas las estaciones**
  - **Ruta**: `GET /stations`
  - **Descripción**: Obtiene una lista de todas las estaciones de autobús.
  - **Respuesta**: JSON con el conjunto de estaciones.

- **Crear una nueva estación**
  - **Ruta**: `POST /new-station`
  - **Descripción**: Crea una nueva estación de autobús.
  - **Cuerpo de la solicitud**:
    ```json
    {
      "Nombre": "Nombre de la estación",
      "Ubicacion": "Ubicación de la estación",
      "TiempoEstimadoLlegada": "Tiempo estimado de llegada",
      "IdRuta": "ID de la ruta asociada"
    }
    ```
  - **Respuesta**: JSON con la estación creada.

- **Eliminar una estación**
  - **Ruta**: `DELETE /del-station/:IdParada`
  - **Descripción**: Elimina una estación existente.
  - **Parámetro**: `IdParada` (ID de la estación a eliminar).
  - **Respuesta**: Mensaje de confirmación.

- **Actualizar una estación**
  - **Ruta**: `PUT /mod-station/:IdParada`
  - **Descripción**: Actualiza una estación existente.
  - **Parámetro**: `IdParada` (ID de la estación a actualizar).
  - **Cuerpo de la solicitud**:
    ```json
    {
      "Nombre": "Nuevo nombre de la estación",
      "Ubicacion": "Nueva ubicación",
      "TiempoEstimadoLlegada": "Nuevo tiempo estimado",
      "IdRuta": "Nuevo ID de la ruta"
    }
    ```
  - **Respuesta**: Mensaje de confirmación con los nuevos datos.

---

### 3. Tipos de Ruta Controller

Maneja las operaciones CRUD para los tipos de ruta.

- **Obtener todos los tipos de ruta**
  - **Ruta**: `GET /types`
  - **Descripción**: Obtiene una lista de todos los tipos de ruta.
  - **Respuesta**: JSON con el conjunto de tipos de ruta.

- **Crear un nuevo tipo de ruta**
  - **Ruta**: `POST /new-type`
  - **Descripción**: Crea un nuevo tipo de ruta.
  - **Cuerpo de la solicitud**:
    ```json
    {
      "Nombre": "Nombre del tipo",
      "Descripcion": "Descripción del tipo"
    }
    ```
  - **Respuesta**: JSON con el tipo creado.

- **Eliminar un tipo de ruta**
  - **Ruta**: `DELETE /del-type/:IdTipoRuta`
  - **Descripción**: Elimina un tipo de ruta existente.
  - **Parámetro**: `IdTipoRuta` (ID del tipo a eliminar).
  - **Respuesta**: Mensaje de confirmación.

- **Actualizar un tipo de ruta**
  - **Ruta**: `PUT /mod-type/:IdTipoRuta`
  - **Descripción**: Actualiza un tipo de ruta existente.
  - **Parámetro**: `IdTipoRuta` (ID del tipo a actualizar).
  - **Cuerpo de la solicitud**:
    ```json
    {
      "Nombre": "Nuevo nombre del tipo",
      "Descripcion": "Nueva descripción del tipo"
    }
    ```
  - **Respuesta**: Mensaje de confirmación con los nuevos datos.

---

## Configuración

Asegúrate de tener configurada tu base de datos y de que las rutas estén correctamente enlazadas con los controladores en tu aplicación Express.

## Uso

Realiza peticiones a las rutas usando herramientas como Postman o curl, asegurándote de incluir los encabezados necesarios y el cuerpo de la solicitud para los métodos POST y PUT.

# Frontend de la Aplicación

Este es el frontend de la aplicación de gestión de rutas de autobús, construido con Node.js, React y Bootstrap. Este proyecto se encarga de proporcionar una interfaz de usuario moderna y responsiva.

## Índice

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Scripts](#scripts)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Características

- Interfaz de usuario responsiva y moderna.
- Gestión de rutas de autobús con CRUD completo.
- Visualización de datos en tablas.
- Modales para interacción con el usuario.
- Notificaciones de éxito, error y advertencia.

## Tecnologías

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **React**: Biblioteca para construir interfaces de usuario.
- **Bootstrap**: Framework CSS para un diseño responsivo y atractivo.
- **Axios**: Cliente HTTP para realizar solicitudes a la API.
- **PM2**: Administrador de procesos para Node.js.

## Instalación

Para clonar el proyecto y configurarlo en tu máquina local, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/nombre_del_repositorio.git
   cd nombre_del_repositorio

# Base de Datos - API REST

Este documento describe la estructura de la base de datos utilizada por la API REST para gestionar las rutas de autobuses, estaciones de autobús y tipos de ruta.

## Estructura de la Base de Datos

La base de datos está compuesta por las siguientes tablas:

### 1. Tabla: `TipoRuta`

| Campo       | Tipo          | Descripción                          |
|-------------|---------------|--------------------------------------|
| IdTipoRuta  | INT           | Identificador único del tipo de ruta |
| Nombre      | NVARCHAR(50)  | Nombre del tipo de ruta              |
| Descripcion | NVARCHAR(255) | Descripción del tipo de ruta         |

### 2. Tabla: `Parada`

| Campo                     | Tipo          | Descripción                                      |
|---------------------------|---------------|--------------------------------------------------|
| IdParada                  | INT           | Identificador único de la parada                 |
| Nombre                    | NVARCHAR(50)  | Nombre de la estación                            |
| Ubicacion                 | NVARCHAR(255) | Ubicación de la estación                         |
| TiempoEstimadoLlegada     | INT           | Tiempo estimado de llegada                       |
| IdRuta                    | INT           | Identificador de la ruta asociada                |

### 3. Tabla: `Ruta`

| Campo      | Tipo          | Descripción                                |
|------------|---------------|--------------------------------------------|
| IdRuta     | INT           | Identificador único de la ruta             |
| Nombre     | NVARCHAR(50)  | Nombre de la ruta                          |
| Descripcion| NVARCHAR(255) | Descripción de la ruta                     |

## Procedimientos Almacenados

La base de datos incluye los procedimientos almacenados que se encuentran en:

raiz/database/scriprsDBA.sql
