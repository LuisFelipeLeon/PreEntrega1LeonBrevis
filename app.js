// //inicio principal

let nombreIngresado = prompt("Ingresa tu Nombre:");
let apellidoIngresado = prompt("Ingresa tu Apellido:");

//expresion para solo permitir letras del abecedario en mayusculas y minusculas
const letras = /^[A-Za-z]+$/;
 
//variables
let precioItem;
let cantidad;
let total = 0;
let seguir; 
let nombreProducto;

//en este ciclo de while validamos que los campos no queden vacios al ingresar nombre y apellido y se solicitan nuevamente
while (nombreIngresado === "" || apellidoIngresado === "" || !nombreIngresado.match(letras) || !apellidoIngresado.match(letras)) {
  nombreIngresado = prompt("Ingresa tu Nombre:");
  apellidoIngresado = prompt("Ingresa tu Apellido:");

  if (nombreIngresado === "" || apellidoIngresado === "") {
    alert("Error: debes ingresar tu nombre y apellido.");
  } else if (!nombreIngresado.match(letras) || !apellidoIngresado.match(letras)) {
    alert("Error: Ingresa solo letras en los campos de nombre y apellido.");
  }
}
alert("Nombre: " + nombreIngresado + "\nApellido: " + apellidoIngresado);

nombreIngresado = alert("¡Bienvenido al sitio" + " " + nombreIngresado + "! " + " Presiona aceptar para seguir ");
//nombreProducto = prompt("Ingrese nombre de producto");

let productos = [];

//ciclo de ingreso de producto-cantidad-precio + alert's con datos ingresados
do{
    do{
        nombreProducto = prompt("Ingrese nombre de producto");
        if(nombreProducto !=""){
            //alert("Nombre producto: " + nombreProducto);
        }else{
            alert("Error en producto ingresado");
        }

    precioItem = parseFloat(prompt("Ingrese el precio del producto"));
    if(precioItem <=0)
    {
        alert("Precio invalido");
    }

    }while(precioItem <=0);

    cantidad = parseInt(prompt("Ingrese cantidad de stock"));
    while (cantidad <=0)
    {
        cantidad = parseInt(prompt("Cantidad invalida"));  
    }

    total = parseFloat(total) + parseFloat(precioItem*cantidad);
    seguir = prompt("Desea ingresar otro item s/n");
    // almacenar datos del arreglo hecho anteriormente
    productos.push({
    nombre: nombreProducto,
    precio: precioItem,
    cantidad: cantidad
  });

}while(seguir == 's');

//pop con impresion de cada campo completado
alert("Sr. " + apellidoIngresado + "  Producto ingresado: "+ nombreProducto + " Precio item: "+ precioItem +"  Stock:" + cantidad + " " +`  El total es: ${total}`);
// /*alert("Sr. " + apellidoIngresado);
// alert("Producto ingresado: " + nombreProducto);
// alert("Precio item: " + precioItem);
// alert("Stock: " + cantidad);
// alert(`El total es: ${total}`);*/

// datos para obtener y insertar los datos en cada celda de los datos ingresados
let tabla = document.getElementById("tabla-informacion-carrito").getElementsByTagName('tbody')[0];

for (let i = 0; i < productos.length; i++) {
    let fila = tabla.insertRow();
    
    let apellido = fila.insertCell(0);
    apellido.innerHTML = apellidoIngresado;
  
    let producto = fila.insertCell(1);
    producto.innerHTML = productos[i].nombre;
  
    let precio = fila.insertCell(2);
    precio.innerHTML = productos[i].precio;
  
    let stock = fila.insertCell(3);
    stock.innerHTML = productos[i].cantidad;
  
    let totalFila = fila.insertCell(4);
    totalFila.innerHTML = (productos[i].precio * productos[i].cantidad).toFixed(2);
  }

//funcion para agregar nuevo producto desde el boton creado y asi ingresar nuevos items al carrito
function agregarNuevoProducto() {
    let apellidoIngresado = prompt("Ingrese su apellido nuevamente");
    let nombreProducto = prompt("Ingrese nombre del nuevo producto");
    do {
      if(nombreProducto === null) {
        break;
      }
  
      if (nombreProducto !== "") {
        //alert("Nombre producto: " + nombreProducto);
  
        let precioItem = parseFloat(prompt("Ingrese el precio del producto"));
        while (isNaN(precioItem) || precioItem <= 0) {
          precioItem = parseFloat(prompt("Ingrese un precio válido"));
        }
  
        let cantidad = parseInt(prompt("Ingrese la cantidad de stock"));
        while (isNaN(cantidad) || cantidad <= 0) {
          cantidad = parseInt(prompt("Ingrese una cantidad válida"));
        }
  
        total += precioItem * cantidad;
  
        // agrega una nueva fila a la tabla con los datos del nuevo producto
        let table = document.getElementById("tabla-informacion-carrito");
        let newRow = table.insertRow(-1);
        let newCell1 = newRow.insertCell(0);
        let newCell2 = newRow.insertCell(1);
        let newCell3 = newRow.insertCell(2);
        let newCell4 = newRow.insertCell(3);
        let newCell5 = newRow.insertCell(4);
  
        //se ingresan los datos y se redondean con el .tofixed
        newCell1.innerHTML = apellidoIngresado;
        newCell2.innerHTML = nombreProducto;
        newCell3.innerHTML = precioItem.toFixed(2); 
        newCell4.innerHTML = cantidad;
        newCell5.innerHTML = (precioItem * cantidad).toFixed(2);
  
        //validacion si agregamos otro producto o no para luego en caso de si ingresar un nuevo producto
        seguir = prompt("¿Desea agregar otro producto? (s/n)");
        if (seguir !== "s" && seguir !== "S") {
          break;
        }
        nombreProducto = prompt("Ingrese nombre de producto");
      } else {
        alert("Nombre de producto inválido");
        nombreProducto = prompt("Ingrese nombre de producto");
      }
    } while (true);
}

//funcion para realizar busqueda de producto del array de acuerdo a lo solicitado
function buscarProducto() {
  let busqueda;
  let encontrado = false;

  while (!encontrado) {
    busqueda = prompt("Ingresa por favor el nombre del producto:");

    if (!busqueda) { 
      alert("¡Error! Debes ingresar el nombre del producto.");
      continue; 
    }

    let resultados = productos.filter(function(producto) {
      return producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    });

    if (resultados.length > 0) {
      resultados.forEach(function(producto) {
        alert("¡Tu producto fue encontrado! "+producto.nombre + ": Tiene un valor de $" + producto.precio + " " + "Actualmente en stock existen: " + producto.cantidad);
      });

      let otraBusqueda = prompt("¿Quieres realizar otra búsqueda? (s/n)");

      while (otraBusqueda.toLowerCase() !== "s" && otraBusqueda.toLowerCase() !== "n") {
        otraBusqueda = prompt("¡Respuesta inválida! ¿Quieres realizar otra búsqueda? (s/n)");
      }
      if (otraBusqueda.toLowerCase() === "n") {
        encontrado = true;
      }
    } else {
      let confirmacion = confirm("El producto buscado no existe. ¿Quieres realizar otra búsqueda?");

      if (!confirmacion) {
        encontrado = true;
      }
    }
  }
}

    
const tablaProductos = document.getElementById("tabla-productos");
const formularioProducto = document.getElementById("formulario-producto");
const totalElemento = document.getElementById("total");

let carrito = [];

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
  mostrarProductos();
  actualizarTotal();
  formularioProducto.reset();
}

function eliminarProducto(indice) {
  carrito.splice(indice, 1);
  mostrarProductos();
  actualizarTotal();
}

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

function buscarProductoManual() {
  // Obtener el término de búsqueda ingresado por el usuario
  var terminoBusqueda = document.querySelector('#formulario-producto input[name="buscar"]').value.toLowerCase();
  
  // Recorrer las filas de la tabla y ocultar las que no coincidan con el término de búsqueda
  var filas = document.querySelectorAll('#tabla-productos tr');
  for (var i = 0; i < filas.length; i++) {
    var nombreProducto = filas[i].querySelector('td:first-child').textContent.toLowerCase();
    if (nombreProducto.includes(terminoBusqueda)) {
      filas[i].style.display = '';
    } else {
      filas[i].style.display = 'none';
    }
  }
}

  

  