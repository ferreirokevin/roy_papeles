document.addEventListener("DOMContentLoaded", function () {
  const abrirCarrito = document.getElementById("carrito");
  const ventanaCarrito = document.getElementById("ventanaCarrito");
  const productoCarrito = document.getElementById("productoCarrito");
  const total = document.getElementById("total");
  const contenedorProductos = document.getElementById("tarjet__contenedor");

  let carritoAbierto = false;
  let precioTotal = 0;

  let carrito = JSON.parse(localStorage.getItem("carrito"));

  async function cargarProductos() {
    try {
      const response = await fetch("../js/productos.json");
      const productos = await response.json();

      productos.forEach((producto) => {
        agregarProducto(producto);
      });
    } catch (error) {
      alert("Error al cargar los productos:", error);
    }
  }

  function agregarProducto(producto) {
    const tarjeta = document.createElement("div");
    tarjeta.id = "tarjet";

    tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div>
            <p id="title" class="titleProduct">${producto.nombre}</p>
            <p id="description">${producto.descripcion}</p>
            <p></p>
            <p id="price" class="preciosProductos">${producto.precio}</p>
            <div class="mensajeAgregado" style="color: green;"></div>
            <div>
                <button type="button" class="add_tocart" data-producto="${producto.nombre}">Agregar</button>
            </div>
        </div>
      `;

    contenedorProductos.appendChild(tarjeta);
  }

  window.addEventListener("load", cargarProductos);

  abrirCarrito.addEventListener("click", function () {
    if (!carritoAbierto) {
      ventanaCarrito.style.display = "block";
      carritoAbierto = true;
    } else {
      ventanaCarrito.style.display = "none";
      carritoAbierto = false;
    }
  });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("add_tocart")) {
      const button = event.target;
      const tarjeta = button.closest("#tarjet");
      const tituloProducto = tarjeta.querySelector(".titleProduct").textContent;
      const precioUnitario = parseFloat(
        tarjeta.querySelector(".preciosProductos").textContent
      );

      if (carrito.hasOwnProperty(tituloProducto)) {
        carrito[tituloProducto].cantidad++;
      } else {
        carrito[tituloProducto] = { cantidad: 1, precioUnitario };
      }

      guardarCarritoEnLocalStorage();
      mostrarCarrito();

      precioTotal += precioUnitario;
      total.innerText = `$${precioTotal.toFixed(2)}`;
    }
  });

  function mostrarCarrito() {
    setTimeout(function () {
      productoCarrito.innerHTML = "";
      precioTotal = 0;

      for (const producto in carrito) {
        const cantidad = carrito[producto].cantidad;
        const precioUnitario = carrito[producto].precioUnitario;
        const precioTotalProducto = cantidad * precioUnitario;

        const nuevoElementoCarrito = document.createElement("div");
        nuevoElementoCarrito.innerHTML = `
              <p>${producto} $${precioUnitario.toFixed(2)} x ${cantidad}/u </p>
              <button class="aumentarCantidad">+</button>
              <button class="disminuirCantidad">-</button>
          `;
        productoCarrito.appendChild(nuevoElementoCarrito);

        const botonAumentar =
          nuevoElementoCarrito.querySelector(".aumentarCantidad");
        const botonDisminuir =
          nuevoElementoCarrito.querySelector(".disminuirCantidad");

        botonAumentar.addEventListener("click", function () {
          modificarCantidadEnCarrito(producto, 1);
        });

        botonDisminuir.addEventListener("click", function () {
          modificarCantidadEnCarrito(producto, -1);
        });

        precioTotal += precioTotalProducto;
      }

      total.innerText = `$${precioTotal.toFixed(2)}`;
    }, 10);
  }

  const comprar = document.getElementById("comprar");
  comprar.addEventListener("click", function () {
    if (Object.keys(carrito).length === 0) {
      swal(
        "El carrito está vacío. Agrega productos antes de comprar.",
        "Vuelve a intentarlo",
        "error"
      );
    } else {
      productoCarrito.innerHTML = null;
      total.innerHTML = "Gracias por comprar";

      carrito = [];
      guardarCarritoEnLocalStorage();
    }
  });

  function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function modificarCantidadEnCarrito(producto, cantidad) {
    if (carrito.hasOwnProperty(producto)) {
      carrito[producto].cantidad += cantidad;
      if (carrito[producto].cantidad <= 0) {
        delete carrito[producto];
      }
      guardarCarritoEnLocalStorage();
      mostrarCarrito();
    }
  }
});
