const abrirCarrito = document.getElementById("carrito");
const ventanaCarrito = document.getElementById("ventanaCarrito");
const add_tocart = document.querySelectorAll(".add_tocart")
const productoCarrito = document.getElementById("productoCarrito")
const total =document.getElementById("total")

let carritoAbierto = false; 
let precioTotal = 0;
abrirCarrito.addEventListener("click", function () {
  if (!carritoAbierto) {
    ventanaCarrito.style.display = "block";
    carritoAbierto = true;
  } else {
    ventanaCarrito.style.display = "none";
    carritoAbierto = false;
  }
});
add_tocart.forEach(function(boton,index){
    boton.addEventListener("click" , function(){
        const titulos = document.querySelectorAll(".titleProduct")
        const precios = document.querySelectorAll(".preciosProductos")

        productoCarrito.innerHTML += `
        <div>
            <p>${titulos[index].textContent}</p>
            <p>$${precios[index].textContent}</p>
        </div>
        `
        precioTotal += parseInt(precios[index].textContent)
        
        total.innerText =`$${precioTotal}`

    })
});

const comprar = document.getElementById("comprar")
 comprar.addEventListener("click", function(){
   productoCarrito.innerHTML = null;
   total.innerHTML = "Gracias por comprar";
 })