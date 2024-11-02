let api = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  cargarRutas();
  document
    .getElementById("confirmarEliminar")
    .addEventListener("click", eliminarRuta);
  document
    .getElementById("formModificar")
    .addEventListener("submit", modificarRuta);
  document
    .getElementById("btnAgregarRuta")
    .addEventListener("click", () => abrirModalAgregar());

  document
    .getElementById("formAgregar")
    .addEventListener("submit", agregarRuta);
});

async function cargarRutas() {
  try {
    const response = await fetch(`${api}/rutas`);
    const rutas = await response.json();

    let filas = "";
    rutas.forEach((ruta) => {
      filas += `<tr>
          <td>${ruta.IdRuta}</td>
          <td>${ruta.Nombre}</td>
          <td>${ruta.Descripcion}</td>
          <td>${ruta.Estado}</td>
          <td>${ruta.Horarios}</td>
          <td>${ruta.IdTipoRuta}</td>
          <td><button class="btn btn-warning modificar" data-id="${ruta.IdRuta}" data-nombre="${ruta.Nombre}" data-descripcion="${ruta.Descripcion}" data-estado="${ruta.Estado}" data-Horarios="${ruta.Horarios}" >Modificar</button></td>
          <td><button class="btn btn-danger eliminar" data-id="${ruta.IdRuta}" data-nombre="${ruta.Nombre}" data-descripcion="${ruta.Descripcion}">Eliminar</button></td>
        </tr>`;
    });
    document.getElementById("tbl-body").innerHTML = filas;
    console.log(rutas);

    // Agregar eventos a los botones de Modificar y Eliminar
    document.querySelectorAll(".modificar").forEach((btn) => {
      btn.addEventListener("click", () => abrirModalModificar(btn));
    });

    document.querySelectorAll(".eliminar").forEach((btn) => {
      btn.addEventListener("click", () => abrirModalEliminar(btn));
    });
  } catch (error) {
    console.error("Error al cargar las rutas:", error);
  }
}

let idSeleccionado = null;

function abrirModalEliminar(btn) {
  idSeleccionado = btn.dataset.id;

  // Mostrar datos en el modal de eliminación
  document.querySelector(".ruta-nombre").textContent = btn.dataset.nombre;
  document.querySelector(".ruta-descripcion").textContent =
    btn.dataset.descripcion;

  const modalEliminar = new bootstrap.Modal(
    document.getElementById("modalEliminar")
  );
  modalEliminar.show();
}

function abrirModalModificar(btn) {
  idSeleccionado = btn.dataset.id;

  // Verificar que los elementos existen antes de intentar asignarles valores
  const nombreRuta = document.getElementById("nombreRuta");
  const descripcionRuta = document.getElementById("descripcionRuta");
  const estadoRuta = document.getElementById("estadoRuta");
  const horariosRuta = document.getElementById("Horarios");
  const idTipoRuta = document.getElementById("IdTipoRuta");

  if (
    nombreRuta &&
    descripcionRuta &&
    estadoRuta &&
    horariosRuta &&
    idTipoRuta
  ) {
    // Asignar valores de los datos del botón al formulario
    nombreRuta.value = btn.dataset.nombre;
    descripcionRuta.value = btn.dataset.descripcion;
    estadoRuta.value = btn.dataset.estado;
    horariosRuta.value = btn.dataset.horarios;
    idTipoRuta.value = btn.dataset.idtiporuta;

    // Mostrar el modal de modificación
    const modalModificar = new bootstrap.Modal(
      document.getElementById("modalModificar")
    );
    modalModificar.show();
  } else {
    console.error("Error: uno o más elementos no se encontraron en el DOM.");
  }
}

async function eliminarRuta() {
  try {
    const response = await fetch(`${api}/del-ruta/${idSeleccionado}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Esta ruta tiene estaciones asociadas");
    }

    mostrarMensaje("Ruta eliminada correctamente", "success");
    cargarRutas();
  } catch (error) {
    mostrarMensaje("Error al eliminar la ruta: " + error.message, "error");
    console.error("Error al eliminar la ruta:", error);
  }
}

async function modificarRuta(event) {
  event.preventDefault();

  const Nombre = document.getElementById("nombreRuta").value;
  const Descripcion = document.getElementById("descripcionRuta").value;
  const Estado = document.getElementById("estadoRuta").value;
  const Horarios = document.getElementById("Horarios").value;
  const IdTipoRuta = document.getElementById("IdTipoRuta").value;

  try {
    const response = await fetch(`${api}/mod-ruta/${idSeleccionado}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Nombre,
        Descripcion,
        Horarios,
        Estado,
        IdTipoRuta,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al modificar la ruta");
    }

    mostrarMensaje("Ruta modificada correctamente", "success");
    cargarRutas(); // Recargar la lista de rutas
  } catch (error) {
    mostrarMensaje("Error al modificar la ruta: " + error.message, "error");
    console.error("Error al modificar la ruta:", error);
  }
}

function mostrarMensaje(mensaje, tipo) {
  const mensajeElemento = document.getElementById("alertaMensaje");
  mensajeElemento.textContent = mensaje;

  // Cambiar el título del modal dependiendo del tipo de mensaje
  const modalTitulo = document.getElementById("modalAlertaLabel");
  if (tipo === "success") {
    modalTitulo.textContent = "Éxito";
    modalTitulo.classList.add("text-success");
    modalTitulo.classList.remove("text-danger");
  } else {
    modalTitulo.textContent = "Error";
    modalTitulo.classList.add("text-danger");
    modalTitulo.classList.remove("text-success");
  }

  // Mostrar el modal de alerta
  const modalAlerta = new bootstrap.Modal(
    document.getElementById("modalAlerta")
  );
  modalAlerta.show();
}

function abrirModalAgregar() {
    const modalAgregar = new bootstrap.Modal(
      document.getElementById("modalAgregar")
    );
    modalAgregar.show();
  }
  
  async function agregarRuta(event) {
    event.preventDefault();
  
    const Nombre = document.getElementById("nuevoNombreRuta").value;
    const Descripcion = document.getElementById("nuevaDescripcionRuta").value;
    const Estado = document.getElementById("nuevoEstadoRuta").value;
    const Horarios = document.getElementById("nuevoHorarios").value;
    const IdTipoRuta = document.getElementById("nuevoIdTipoRuta").value;
  
    try {
      const response = await fetch(`${api}/new-ruta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nombre,
          Descripcion,
          Horarios,
          Estado,
          IdTipoRuta,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al agregar la ruta");
      }
  
      mostrarMensaje("Ruta agregada correctamente", "success");
      cargarRutas(); // Recargar la lista de rutas
    } catch (error) {
      mostrarMensaje("Error al agregar la ruta: " + error.message, "error");
      console.error("Error al agregar la ruta:", error);
    }
  }