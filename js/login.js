const mensajeError = document.getElementById("mensajeError");
const mensajeIngreso = document.getElementById("mensajeIngreso");
const formularioIngreso = document.getElementById("formularioIngreso")
const emailIngreso = document.getElementById("emailIngreso")
const contraseñaIngreso = document.getElementById("contraseñaIngreso")
const localStorage = window.localStorage

formularioIngreso.addEventListener("submit", function(event){
  event.preventDefault()

  const todosLosUsuarios = localStorage.getItem("usuarios");
  const usuarios = JSON.parse(todosLosUsuarios);
  const usuarioActivo = usuarios.find(usuario => 
    usuario.email === emailIngreso.value && usuario.contraseña === contraseñaIngreso.value) 
  
  if (usuarioActivo !== undefined) {
    limpiarmensaje()
    mensajeIngreso.textContent = "Bienvenido";
    borrarBotones()
  } else {
    limpiarmensaje()
    mensajeError.textContent = "Credenciales incorrectas";
  }
  
  limpiarFormularioIngreso();
  guardarUsuario(usuarioActivo);
})

function limpiarmensaje(){
  mensajeIngreso.textContent="";
  mensajeError.textContent="";
}

function limpiarFormularioIngreso() {
  emailIngreso.value = "";
  contraseñaIngreso.value = "";
}
function borrarBotones(){
  const registrarse = document.getElementById("registrarse")
  const iniciar__sesion = document.getElementById("iniciar__sesion")

  registrarse.style.display = "none"; 
  iniciar__sesion.style.display = "none"; 
}

