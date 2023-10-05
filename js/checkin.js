let usuarios = [];
const formularioRegistro = document.getElementById("formularioRegistro");

formularioRegistro.addEventListener("submit", function (event) {
  event.preventDefault();

  const emailRegistro = document.getElementById("email");
  const repetirEmailRegistro = document.getElementById("repetirEmail");
  const contraseñaRegistro = document.getElementById("contraseña");
  const repetirContraseñaRegistro = document.getElementById("repetirContraseña");

  const emailRegistrominuscula = emailRegistro.value.toLowerCase();
  const repetirEmailRegistrominuscula = repetirEmailRegistro.value.toLowerCase();

  if (emailRegistrominuscula !== repetirEmailRegistrominuscula) {
    swal("Los emails no coinciden", "Vuelve a intentarlo", "error");
    limpiarFormulario();
  } else if (contraseñaRegistro.value !== repetirContraseñaRegistro.value) {
    swal("Las contraseñas no coinciden", "Vuelve a intentarlo", "error");
    limpiarFormulario();
  } else if (usuarios.some((usuario) => usuario.email === emailRegistrominuscula)) {
    swal("El email ya ha sido registrado", "Vuelve a intentarlo", "error");
    limpiarFormulario();
  } else {
    swal("Registrado exitosamente", "¡Bienvenido!", "success");
    usuarios.push({
      email: emailRegistrominuscula,
      contraseña: contraseñaRegistro.value,
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    limpiarFormulario();
  }
});

function limpiarFormulario() {
  document.getElementById("email").value = "";
  document.getElementById("repetirEmail").value = "";
  document.getElementById("contraseña").value = "";
  document.getElementById("repetirContraseña").value = "";
}

