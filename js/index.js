//PARA REGISTRAR EN UN ALMACEN INTRODUCIR CONTRASEÑA PARA QUE PUEDAN INTRODUCIR PRODUCTOS O VER RESUMEN DE PRODUCTOS

const PRODUCTOS = [
    {
        nombre: "Azucar",
        precio: 30.50,
        cantidad: 4,
        
    },
    {
        nombre: "Frijoles",
        precio: 20.70,
        cantidad: 10
    },
    {
        nombre: "Arroz",
        precio: 22.50,
        cantidad: 8
    },

];


function main(){
    if(seguridad()== false){
        console.log("No tienes permiso para ingresar al sistema");
        return;

    }
    let funcionalidad = prompt(
        "ingresa la categoria \n" +
        "1.-Productos\n"+
        "2.-Pedidos");
    switch(funcionalidad){
        case "1":
            productos()
            break;
        case "2":
            pedidos()
            break;
                

    
    }
}

main()



function productos(){

    let operacion = prompt("ingresa la operacion\n"+
         "1.- Ver productos\n"+
         "2.- Insertar producto\n"+
         "3.- Modificar producto"
        );
    switch(operacion){
        case "1":
            console.log("ingresaste a ver productos");
            verProductos()
            break;
        case "2":
            console.log("ingresaste a insertar producto")
            introducirProductos()
            break;
        case "3":
            console.log("ingresaste a resumen mensual")
            modificarProducto();
            break;
    }
}

function verProductos(){
    //alert(PRODUCTOS)
    PRODUCTOS.forEach((producto, index) => {
            console.log(`${index + 1}.-${producto.nombre}  ${producto.cantidad}  ${producto.precio}`) 
        }
    )
    localStorage.setItem("productos", JSON.stringify(PRODUCTOS))
}

function modificarProducto(){
    verProductos()
    
    let numeroProducto = prompt("Selecciona el numero de producto")

    if (numeroProducto < 0 || numeroProducto > PRODUCTOS.length){
        console.log("El numero seleccionado no existe")
        return
    }
    let posicion = numeroProducto - 1 
    let  productoSeleccionado = PRODUCTOS[posicion]
    let cantidadModificar = prompt(`Ingresar el nueva cantidad de ${productoSeleccionado.nombre}`)
    if (cantidadModificar < 0 ){
        console.log("La cantidad debe ser mayor a 0")
        return
    }
    productoSeleccionado.cantidad = cantidadModificar
    verProductos()

}

function seguridad(){
    let clave;
    let intentos = 0;
    const MAX_INTENTOS = 3;
    let auth = false;
    do{
        clave = prompt('ingresa la contraseña');
        intentos ++;

    if(clave === '2108'){
        console.log("contraseña correcta")
        auth = true;
        break; 
    }
    if(intentos >= MAX_INTENTOS){
        console.log("la cantidad de intentos se alcanzo")
        break;
    }

    }while(true);
    return auth;
}


function introducirProductos() {

    let continuar = true;

    while (continuar) {
        let productoNombre = prompt("Introduce el nombre del producto (o deja vacío para terminar):");
        if (productoNombre) {
            let cantidad = parseInt(prompt(`Introduce la cantidad de ${productoNombre}:`));
            let precio = parseFloat(prompt(`Introduce el precio por unidad de ${productoNombre}:`));

            PRODUCTOS.push({
                nombre: productoNombre,
                cantidad: cantidad,
                precio: precio,
            });
        } else {
            continuar = false;
        }
    }
    console.log(PRODUCTOS)
    localStorage.setItem("productos", JSON.stringify(PRODUCTOS))

}

/*let costoTotal = productos.reduce((sum, prod) => sum + prod.costoTotal, 0);

console.log("Productos introducidos:");
productos.forEach(prod => {
    console.log(`Producto: ${prod.nombre}, Cantidad: ${prod.cantidad}, Costo por unidad: ${prod.costoUnidad}, Costo total del producto: ${prod.costoTotal}`);
});
console.log(`Costo total de todos los productos: ${costoTotal}`);*/



//introducirProductos();

/*function verProducto(nombre) {
    let producto = productos.find(prod => prod.nombre.toLowerCase() === nombre.toLowerCase());
    if (producto) {
        console.log(`Producto: ${producto.nombre}, Cantidad: ${producto.cantidad}, Costo por unidad: ${producto.costoUnidad}, Costo total del producto: ${producto.costoTotal}`);
    } else {
        console.log("Producto no encontrado");
    }


let costoTotal = productos.reduce((sum, prod) => sum + prod.costoTotal, 0);

console.log("Productos introducidos:");
productos.forEach(prod => {
    console.log(`Producto: ${prod.nombre}, Cantidad: ${prod.cantidad}, Costo por unidad: ${prod.costoUnidad}, Costo total del producto: ${prod.costoTotal}`);
});


console.log(`Costo total de todos los productos: ${costoTotal}`);

// Pedir al usuario el producto que quiere ver
let productoBuscar = prompt("Introduce el nombre del producto que quieres ver:");
verProducto(productoBuscar);
}



introducirProductos();
*/


/*let rubro = prompt("ingresa el rubro");
    if (rubro == "abarrotes"){
        console.log("ingresaste el rubro " + rubro)
    }

        
    else{
        if (rubro == "pan"){
            console.log("ingresaste el rubro " + rubro)
        }
        else{
            if (rubro == "carnes"){
                console.log("ingresaste el rubro " + rubro)
            }
            else{
                prompt("ingresa un rubro correcto")
            }
        }


    }
*/


    

