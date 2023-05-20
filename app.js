// //inicio principal

//expresion para solo permitir letras del abecedario en mayusculas y minusculas
const letras = /^[A-Za-z]+$/;
 
//variables
let precioItem;
let cantidad;
let total = 0;
let seguir; 
let nombreProducto;

//tabla de los productos, formulario y total
const tablaProductos = document.getElementById("tabla-productos");
const formularioProducto = document.getElementById("formulario-producto");
const totalElemento = document.getElementById("total");

// Recuperar los datos del carrito del localStorage o inicializar el carrito vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//funcion para agregar productos de acuerdo a producto, precio, cantidad, total 
function agregarProducto(evento) {
  evento.preventDefault();
  const producto = formularioProducto.elements.producto.value;
  const precio = formularioProducto.elements.precio.value;
  const cantidad = formularioProducto.elements.cantidad.value;

  const total = precio * cantidad;

  const nuevoProducto = {
    producto: producto,
    precio: precio,
    cantidad: cantidad,
    total: total
  };

  carrito.push(nuevoProducto);
  guardarCarritoEnLocalStorage();
  mostrarProductos();
  actualizarTotal();
  formularioProducto.reset();
}

//funcion para eliminar productos agregados al carrito
function eliminarProducto(indice) {
  carrito.splice(indice, 1);
  guardarCarritoEnLocalStorage();
  mostrarProductos();
  actualizarTotal();
}

//funcion para mostrar productos agregados
function mostrarProductos() {
  tablaProductos.innerHTML = "";
  carrito.forEach((producto, indice) => {
    const fila = document.createElement("tr");

    const celdaProducto = document.createElement("td");
    celdaProducto.textContent = producto.producto;
    fila.appendChild(celdaProducto);

    const celdaPrecio = document.createElement("td");
    celdaPrecio.textContent = producto.precio;
    fila.appendChild(celdaPrecio);

    const celdaCantidad = document.createElement("td");
    celdaCantidad.textContent = producto.cantidad;
    fila.appendChild(celdaCantidad);

    const celdaTotal = document.createElement("td");
    celdaTotal.textContent = producto.total;
    fila.appendChild(celdaTotal);

    const celdaEliminar = document.createElement("td");
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => eliminarProducto(indice));
    celdaEliminar.appendChild(botonEliminar);
    fila.appendChild(celdaEliminar);

    tablaProductos.appendChild(fila);
  });
}

function actualizarTotal() {
  const total = carrito.reduce((suma, producto) => {
    return suma + producto.total;
  }, 0);

  totalElemento.textContent = total;
}

formularioProducto.addEventListener("submit", agregarProducto);

//funcion para almacenar datos carrito
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//funcion para inicializar datos carrito guardado
function inicializarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

// Obtener el término de búsqueda ingresado por el usuario
function buscarProductoManual() {
  
let terminoBusqueda = document.querySelector('#formulario-producto input[name="buscar"]').value.toLowerCase();
  
// Recorrer las filas de la tabla y ocultar las que no coincidan con el término de búsqueda
let filas = document.querySelectorAll('#tabla-productos tr');
for (let i = 0; i < filas.length; i++) {
let nombreProducto = filas[i].querySelector('td:first-child').textContent.toLowerCase();
if (nombreProducto.includes(terminoBusqueda)) {
    filas[i].style.display = '';
   } else {
   filas[i].style.display = 'none';
    }
  }
}

document.getElementById("finalizarCompra").addEventListener("click", finalizarCompra);
const nuevaVentana = window.open("about:blank", "_blank");

//funcion para finalizar comprar donde solicita nombre al usuario y su validacion
  function finalizarCompra() {
    let nombreUsuario = prompt("Ingresa tu nombre de usuario:");
  
    // Validación del nombre de usuario
    while (!nombreUsuario || nombreUsuario.trim() === "") {
      nombreUsuario = prompt("Por favor, ingresa un nombre de usuario válido:");
    }
  
    const datosCompra = {
      usuario: nombreUsuario,
      carrito: carrito
    };

  // Abre una nueva ventana o pestaña para mostrar los datos de compra
  const nuevaVentana = window.open("about:blank", "_blank");
  nuevaVentana.document.write(`
    <html>
      <head>
        <title>Detalles de la compra</title>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          
          table th,
          table td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          
          table tbody tr:hover {
            background-color: #f5f5f5;
          }
        </style>
      </head>
      <body>
        <h1>Detalles de lo agregado al carrito</h1>
        <h2>Usuario: ${datosCompra.usuario}</h2>
        <h2>Artículos:</h2>
        <table>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
          
  `);

  datosCompra.carrito.forEach((producto) => {
    nuevaVentana.document.write(`
      <tr>
        <td>${producto.producto}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.total.toFixed(2)}</td>
      </tr>
    `);
  });

  nuevaVentana.document.write(`
        </table>
      </body>
    </html>
  `);
}

inicializarCarritoDesdeLocalStorage();
mostrarProductos();
actualizarTotal(); 

  