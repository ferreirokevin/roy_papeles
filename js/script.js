//registrarse//
let usuarios = [];

const formularioRegistro = document.getElementById("formularioRegistro");
const emailRegistro = document.getElementById("email");
const repetirEmailRegistro = document.getElementById("repetirEmail");
const contraseñaRegistro = document.getElementById("contraseña");
const repetirContraseñaRegistro = document.getElementById("repetirContraseña");

const mensajeRegistroCorrecto = document.getElementById(
  "mensajeRegistroCorrecto"
);
const localStorage = window.localStorage;

formularioRegistro.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = emailRegistro.value;

  if (
    emailRegistro.value !== repetirEmailRegistro.value &&
    contraseñaRegistro.value === repetirContraseñaRegistro.value
  ) {
    mensajeRegistroError.textContent = "Los emails no coinciden";
    limpiarFormulario();
  } else if (
    emailRegistro.value === repetirEmailRegistro.value &&
    contraseñaRegistro.value !== repetirContraseñaRegistro.value
  ) {
    mensajeRegistroError.textContent = "las contraseñas no coinciden";
    limpiarFormulario();
  } else if (usuarios.some((usuario) => usuario.email === email)) {
    mensajeRegistroError.textContent = "El email ya ha sido registrado";
    limpiarFormulario();
  } else {
    mensajeRegistroCorrecto.textContent = "Registrado exitosamente";
    usuarios.push({
      email: emailRegistro.value,
      contraseña: contraseñaRegistro.value,
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    
    limpiarFormulario();
  }
});

function limpiarFormulario() {
  emailRegistro.value = "";
  repetirEmailRegistro.value = "";
  contraseñaRegistro.value = "";
  repetirContraseñaRegistro.value = "";
}











