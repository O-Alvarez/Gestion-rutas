const apiUrl = "https://gestion-rutas-2.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    getStations();

    // Agregar nueva estación
    document
        .getElementById("formAgregarEstacion")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            const nombreEstacion = document.getElementById("nuevoNombreEstacion").value.trim();
            const ubicacionEstacion = document.getElementById("nuevaUbicacionEstacion").value.trim();
            const tiempoEstimadoLlegada = document.getElementById("nuevoTiempoEstimadoLlegada").value.trim();
            const IdRuta = document.getElementById("nuevoIdRuta").value.trim();

            // Validación de campos
            if (!nombreEstacion || !ubicacionEstacion || !tiempoEstimadoLlegada || !IdRuta) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            const response = await fetch(`${apiUrl}/new-station`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Nombre: nombreEstacion,
                    Ubicacion: ubicacionEstacion,
                    TiempoEstimadoLlegada: parseInt (tiempoEstimadoLlegada),
                    IdRuta: parseInt(IdRuta),
                }),
            });

            console.log(JSON.stringify({
                Nombre: nombreEstacion,
                Ubicacion: ubicacionEstacion,
                TiempoEstimadoLlegada: tiempoEstimadoLlegada,
                IdRuta: IdRuta,
            }))
            if (response.ok) {
                getStations();
                $("#modalAgregarEstacion").modal("hide");
                alert("Estación agregada con éxito.");
                document.getElementById("formAgregarEstacion").reset(); // Limpiar formulario
            } else {
                alert("Error al agregar estación");
            }
        });

    // Cargar estaciones
    async function getStations() {
        const response = await fetch(`${apiUrl}/stations`);
        const stations = await response.json();
        const tblBody = document.getElementById("tbl-body-estaciones");
        tblBody.innerHTML = "";
        stations.forEach((station) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${station.IdParada}</td>
                <td>${station.Nombre}</td>
                <td>${station.Ubicacion}</td>
                <td>
                    <button class="btn btn-warning" onclick="openEditModal(${station.IdParada}, '${station.Nombre}', '${station.Ubicacion}', '${station.TiempoEstimadoLlegada}', '${station.IdRuta}')">Modificar</button>
                    <button class="btn btn-danger" onclick="openDeleteModal(${station.IdParada}, '${station.Nombre}')">Eliminar</button>
                </td>
            `;
            tblBody.appendChild(row);
        });
    }

    // Eliminar estación
    window.openDeleteModal = function (id, nombre) {
        document.querySelector(".estacion-nombre").textContent = nombre;
        document.getElementById("confirmarEliminarEstacion").onclick = async () => {
            const response = await fetch(`${apiUrl}/del-station/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                getStations();
                $("#modalEliminarEstacion").modal("hide");
                alert("Estación eliminada con éxito.");
            } else {
                alert("Error al eliminar estación");
            }
        };
        $("#modalEliminarEstacion").modal("show");
    };

    // Abrir modal de modificación
    window.openEditModal = function (id, nombre, ubicacion, TiempoEstimadoLlegada, IdRuta) {
        document.getElementById("nombreEstacion").value = nombre;
        document.getElementById("ubicacionEstacion").value = ubicacion;
        document.getElementById("TiempoEstimadoLlegada").value = TiempoEstimadoLlegada;
        document.getElementById("IdRuta").value = IdRuta;


        document.getElementById("formModificarEstacion").onsubmit = async (e) => {
            e.preventDefault();
            const nombreModificado = document.getElementById("nombreEstacion").value.trim();
            const ubicacionModificada = document.getElementById("ubicacionEstacion").value.trim();
            const TiempoEstimadoLlegada = document.getElementById("TiempoEstimadoLlegada").value.trim();
            const IdRuta = document.getElementById("IdRuta").value.trim();

            // Validación de campos
            if (!nombreModificado || !ubicacionModificada) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            const response = await fetch(`${apiUrl}/mod-station/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Nombre: nombreModificado,
                    Ubicacion: ubicacionModificada,
                    TiempoEstimadoLlegada: TiempoEstimadoLlegada,
                    IdRuta: IdRuta,
                }),
            });

            if (response.ok) {
                getStations();
                $("#modalModificarEstacion").modal("hide");
                alert("Estación modificada con éxito.");
            } else {
                alert("Error al modificar estación");
            }
        };
        $("#modalModificarEstacion").modal("show");
    };
});
