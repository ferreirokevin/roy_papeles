const mensajeError = document.getElementById("mensajeError");
const mensajeIngreso = document.getElementById("mensajeIngreso");
const formularioIngreso = document.getElementById("formularioIngreso");
const emailIngreso = document.getElementById("emailIngreso");
const contraseñaIngreso = document.getElementById("contraseñaIngreso");
const users = document.getElementById("users");

if (formularioIngreso) {
  formularioIngreso.addEventListener("submit", function (event) {
    event.preventDefault();

    const todosLosUsuarios = localStorage.getItem("usuarios");
    const usuarios = JSON.parse(todosLosUsuarios);

    const usuarioActivo = usuarios.find(
      (usuario) =>
        usuario.email === emailIngreso.value &&
        usuario.contraseña === contraseñaIngreso.value
    );

    if (usuarioActivo !== undefined) {
      limpiarmensaje();
      swal("Bienvenido!", "¿Como Estas?", "success");

      borrarBotones(usuarioActivo);
    } else {
      limpiarmensaje();
      swal("Usuario Incorrecto", "Vuelve a intentarlo", "error");
    }

    limpiarFormularioIngreso();
  });
}

function limpiarmensaje() {
  mensajeIngreso.textContent = "";
  mensajeError.textContent = "";
}

function limpiarFormularioIngreso() {
  emailIngreso.value = "";
  contraseñaIngreso.value = "";
}

function borrarBotones(usuarioActivo) {
  const registrarse = document.getElementById("registrarse");
  const iniciar__sesion = document.getElementById("iniciar__sesion");

  registrarse.style.display = "none";
  iniciar__sesion.style.display = "none";

  const userActivo = document.createElement("div");
  userActivo.id = "user-activo";

  if (usuarioActivo && usuarioActivo.email) {
    userActivo.innerHTML = `
      <p>${usuarioActivo.email}</p>
    `;
  } else {
    userActivo.innerHTML = "<p>Usuario activo desconocido</p>";
  }

  users.appendChild(userActivo);
}
