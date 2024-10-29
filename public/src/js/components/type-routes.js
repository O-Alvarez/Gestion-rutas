let api = 'https://rutaapi-ejemplo/'

// carga los tipos de rutas que exiten en la base de datos y los muestra en la tabla
document.addEventListener('DOMContentLoaded',function(){
    fetch(`${api}tipos`)
    .then(response => response.json())
    .then(data => {
      // Almacena los datos en una variable
      const jsonData = data
      console.log('Datos JSON:', jsonData)

      // Muestra los datos en el elemento <pre>
      document.getElementById('resultado').innerText = JSON.stringify(jsonData, null, 2)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
})


const newButton = document.getElementById('saveNewRoute');
// const modButton = document.getElementById('saveMod');
// const delButton = document.getElementById('deleleteType');




newButton.addEventListener('click', function () {
    // OBTIENE LOS CAMPOS Y LOS EVALUA
    let name = document.getElementById("newName").value
    let description = document.getElementById("newDescription").value

    if (name != null && name != "" && description != null && description != "") {
        const data = {
            nombre: name,
            descripcion:description
        }
        // Realiza la peticion
        fetch(`${api}nuevo-tipo`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => {
            console.log('Éxito:', data)
            alert('Datos enviados con éxito')
          })
          .catch((error) => {
            console.error('Error:', error)
            alert('Hubo un error al enviar los datos')
          })
        console.log(data)
    } else {
        alert("verifique los campo")
    }
})











