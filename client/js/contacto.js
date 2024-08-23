// Esperar a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar el formulario
    const form = document.getElementById("contact");
  
    // Agregar un evento al formulario para capturar los datos cuando se envíe
    form.addEventListener("submit", async function (event) {
      // Declarar la función como async
      // Prevenir el comportamiento por defecto del formulario
      event.preventDefault();
  
      // Obtener los valores de los inputs y el textarea
      const nombre = document.querySelector('input[name="Name"]').value;
      const email = document.querySelector('input[name="Email"]').value;
      const mensaje = document.querySelector("textarea").value;
  
      // Mostrar los datos en la consola (o procesarlos según sea necesario)
      console.log("Nombre:", nombre);
      console.log("Email:", email);
      console.log("Mensaje:", mensaje);
  
      // Aquí puedes agregar el código para enviar los datos a un servidor o procesarlos de otra manera
      try {
        // Envía los datos al servidor usando Fetch API
        const response = await fetch("http://localhost:3000/api/index", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            email,
            mensaje,
          }),
        });
  
        // Manejo de la respuesta del servidor
        const data = await response.json();
        console.log("Success:", data);
  
        // Mostrar una alerta
        alert("Se recibió su petición");
  
        // Restablecer el formulario
        form.reset();
  
        // Recargar la página después de un pequeño retraso para asegurar que el formulario se restablezca
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } catch (error) {
        // Manejo de errores en caso de problemas con la conexión
        console.error("Error en la conexión con el servidor:", error);
        alert("Error en la conexión con el servidor");
      }
    });
  });