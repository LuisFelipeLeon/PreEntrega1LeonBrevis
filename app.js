//inicio principal

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
    alert("Nombre: "+nombreIngresado +"\nApellido: "+apellidoIngresado);
}else{
    alert("Error: Ingrese nombre y apellido nuevamente");
}

nombreIngresado = prompt("¡Bienvenido al sitio!" + " " + nombreIngresado + " " + " escribe cualquier palabra para seguir ");
nombreProducto = prompt("Ingrese nombre de producto");

//ciclo de ingreso de producto-cantidad-precio + alert's con datos ingresados
do{
    do{
        if(nombreProducto !=""){
            alert("Nombre producto: " + nombreProducto);
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

    total = total + precioItem*cantidad;
    seguir = prompt("Desea ingresar otro item s/n");

}while(seguir == 's');

//pop con impresion de cada campo completado
alert("Sr. "+ apellidoIngresado + "  Producto ingresado: "+ nombreProducto + " Precio item: "+ precioItem +"  Stock:" + cantidad + " " +`  El total es: ${total}`);
/*alert("Sr. " + apellidoIngresado);
alert("Producto ingresado: " + nombreProducto);
alert("Precio item: " + precioItem);
alert("Stock: " + cantidad);
alert(`El total es: ${total}`);*/