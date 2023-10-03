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
    swal("Los emails no coinciden", "Vuelve a intentarlo", "error");
    limpiarFormulario();
  } else if (
    emailRegistro.value === repetirEmailRegistro.value &&
    contraseñaRegistro.value !== repetirContraseñaRegistro.value
  ) {
    swal("las contraseñas no coinciden", "Vuelve a intentarlo", "error");
    limpiarFormulario();
  } else if (usuarios.some((usuario) => usuario.email === email)) {
    swal("El email ya ha sido registrado", "Vuelve a intentarlo", "error");
    limpiarFormulario();
  } else {
    swal("Registrado exitosamente", "Bienvenido!?", "success");
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
