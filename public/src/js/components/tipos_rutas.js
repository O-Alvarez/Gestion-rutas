const apiUrl = "https://gestion-rutas-2.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  getTypes();

  // Agregar nuevo tipo de ruta
  document
    .getElementById("formAgregarTipoRuta")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const nombreTipoRuta = document.getElementById(
        "nuevoNombreTipoRuta"
      ).value;
      const descripcionTipoRuta = document.getElementById(
        "nuevaDescripcionTipoRuta"
      ).value;

      const response = await fetch(`${apiUrl}/new-type`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre: nombreTipoRuta,
          Descripcion: descripcionTipoRuta,
        }),
      });

      if (response.ok) {
        getTypes();
        $("#modalAgregarTipoRuta").modal("hide");
      } else {
        alert("Error al agregar tipo de ruta");
      }
    });

  // Cargar tipos de rutas
  async function getTypes() {
    const response = await fetch(`${apiUrl}/types`);
    const types = await response.json();
    const tblBody = document.getElementById("tbl-body-tipos");
    tblBody.innerHTML = "";
    types.forEach((type) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${type.IdTipoRuta}</td>
                <td>${type.Nombre}</td>
                <td>${type.Descripcion}</td>
                <td>
                    <button class="btn btn-warning" onclick="openEditModal(${type.IdTipoRuta}, '${type.Nombre}', '${type.Descripcion}')">Modificar</button>
                    <button class="btn btn-danger" onclick="openDeleteModal(${type.IdTipoRuta}, '${type.Nombre}')">Eliminar</button>
                </td>
            `;
      tblBody.appendChild(row);
    });
  }

  // Abrir modal para modificar tipo
  window.openEditModal = (id, nombre, descripcion) => {
    document.getElementById("nombreTipoRuta").value = nombre;
    document.getElementById("descripcionTipoRuta").value = descripcion;

    document.getElementById("formModificarTipoRuta").onsubmit = async (e) => {
      e.preventDefault();
      const nuevoNombre = document.getElementById("nombreTipoRuta").value;
      const nuevaDescripcion = document.getElementById(
        "descripcionTipoRuta"
      ).value;

      const response = await fetch(`${apiUrl}/mod-type/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre: nuevoNombre,
          Descripcion: nuevaDescripcion,
        }), 
      });

      if (response.ok) {
        getTypes();
        $("#modalModificarTipoRuta").modal("hide");
      } else {
        alert("Error al modificar tipo de ruta");
      }
    };
    $("#modalModificarTipoRuta").modal("show");
  };

  // Abrir modal para eliminar tipo
  window.openDeleteModal = (id, nombre) => {
    document.querySelector(".tipo-ruta-nombre").textContent = nombre;
    document.getElementById("confirmarEliminarTipoRuta").onclick = async () => {
      const response = await fetch(`${apiUrl}/del-type/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        getTypes();
        $("#modalEliminarTipoRuta").modal("hide");
      } else {
        alert("Error al eliminar tipo de ruta");
      }
    };
    $("#modalEliminarTipoRuta").modal("show");
  };
});
