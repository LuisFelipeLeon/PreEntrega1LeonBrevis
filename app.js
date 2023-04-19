// //inicio principal

let nombreIngresado = prompt("Ingrese nombre");
let apellidoIngresado = prompt("Ingrese apellido");
 
//variables
let precioItem;
let cantidad;
let total = 0;
let seguir; 
let nombreProducto;

//validacion nombre y apellido que no este en blanco
if((nombreIngresado !="") && (apellidoIngresado !="")){
    //alert("Nombre: "+nombreIngresado +"\nApellido: "+apellidoIngresado);
}else{
    alert("Error: Ingrese nombre y apellido nuevamente");
}

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
    //seguir = prompt("Desea ingresar otro item s/n");
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
  


    
  

  