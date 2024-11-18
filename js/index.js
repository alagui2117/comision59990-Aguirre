//PARA REGISTRAR EN UN ALMACEN INTRODUCIR CONTRASEÑA PARA QUE PUEDAN INTRODUCIR PRODUCTOS O VER RESUMEN DE PRODUCTOS
const carritoKey = "carrito"

const PRODUCTOS = [
    {
        id:1,
        nombre: "Azucar",
        precio: 30.50,
        cantidad: 4,
        imagen:"https://plus.unsplash.com/premium_photo-1671130295824-37e73f098d46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXp1Y2FyfGVufDB8fDB8fHww"
       
        
    },
    {
        id:2,
        nombre: "Frijoles",
        precio: 20.70,
        cantidad: 10,
        imagen: "https://plus.unsplash.com/premium_photo-1671130295242-582789bd9861?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnJpam9sZXN8ZW58MHx8MHx8fDA%3D"
    },
    {
        id:3,
        nombre: "Arroz",
        precio: 22.50,
        cantidad: 8,
        imagen: "https://plus.unsplash.com/premium_photo-1705338026411-00639520a438?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJyb3p8ZW58MHx8MHx8fDA%3D"
    }

];
let CARRITO = []

let ORDENES = []

function main(){
  
   verProductos()
   verCarrito()
}

main()


function addProducto(idProducto){
    
    let productoAgregado = CARRITO.filter(item => item.id == idProducto)

    if (productoAgregado.length){
        productoAgregado.map(item => {
            item.cantidad+=1
            item.total = Math.round(item.cantidad * item.precio)
        })
        localStorage.setItem(carritoKey, JSON.stringify(CARRITO))
        verCarrito()
        return
    }


    let producto = PRODUCTOS.find(item => item.id == idProducto)

    if (producto){
        let productoAgregar = {
            ...producto,
            cantidad:1,
            total: producto.precio
        }

        CARRITO.push(productoAgregar)
       
    }
    localStorage.setItem(carritoKey, JSON.stringify(CARRITO))
    verCarrito()
    
}

function removerProducto(idProducto){

    CARRITO = CARRITO.filter(item => item.id != idProducto)

    localStorage.setItem(carritoKey, JSON.stringify(CARRITO))
    verCarrito()

}

function verCarrito(){

    if (!CARRITO.length && localStorage.getItem(carritoKey)){
        
        let carritoStr  = localStorage.getItem(carritoKey)
        CARRITO  = JSON.parse(carritoStr)


    }
   
    
    const listaDom = document.getElementById("lista-carrito")
    let rows = "";
    let total  = 0 
    if (listaDom) {
        CARRITO.forEach((producto, index) => {
                total += producto.total
                rows += `<div class="card w-100">
                    <div class="card-body d-flex flex-wrap justify-content-end">
                    <h5 class="card-title w-100"> <i class="bi bi-x-lg text-danger" onclick="removerProducto(${producto.id})"></i>  ${producto.nombre}</h5> <p></p>
                    <p class="card-text price" >  ${producto.cantidad} unidades</p>
              
                    </div>
                    <div class="card-footer">
                              <p class="card-text price" >  $${producto.total} MXN </p>
                              
                    </div>
                </div>`
           
             }
        )
        
        rows += `<div class="card w-100">
        <div class="card-body d-flex flex-wrap justify-content-end">
        <h5 class="card-title w-100">  Total: $${total} MXN</h5>
        <button class="btn btn-outline-primary" onclick="ordenar()"><i class="bi bi-cart-check"></i>Ordenar</button>
        </div>
        </div>`
        listaDom.innerHTML = rows
    }
    
}


function getOrdenes(){
    return JSON.parse(localStorage.getItem("ordenes")) || []
}

function ordenar(){
    const ORDENES = getOrdenes()
    const orden = {
        id: Math.round(Math.random() * 1000 ),
        productos: CARRITO,
        prioridad: designarPrioridad()
        
    }
    console.log(orden)
    ORDENES.push(orden)
    CARRITO = []
    localStorage.setItem("ordenes", JSON.stringify(ORDENES))
    localStorage.removeItem("carrito")
    cambiarPagina(1)
    


}
function designarPrioridad(){
    const numRandom = Math.round(Math.random() * 10)
    if(numRandom> 7){
        return "ok"
    }
    if (numRandom >4 ){
        return "warn"
    }
    if (numRandom >= 0){
        return "danger"
    }
}

function cambiarPagina(page){
    const productosBox = document.getElementById("productos-box")
    const ordenesBox = document.getElementById("ordenes-box")
    const productosLabel = document.getElementById("productos-label")
    const ordenesLabel = document.getElementById("ordenes-label")

    if (page == 0) {
        productosLabel.classList.add("active")
        ordenesLabel.classList.remove("active")
        productosBox.classList.remove("d-none")
        ordenesBox.classList.add("d-none")
        main()
        return
    }
    if (page==1){
        productosLabel.classList.remove("active")
        ordenesLabel.classList.add("active")
        productosBox.classList.add("d-none")
        ordenesBox.classList.remove("d-none")
        ordenes()
        return
    }
    

}


function verProductos(){
    //alert(PRODUCTOS)
    const listaDom = document.getElementById("lista-productos")
    let cards = "";
   
    if (listaDom) {
        PRODUCTOS.forEach((producto, index) => {
            
                cards += `<div class="card" style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="...">
                    <div class="card-body d-flex flex-wrap justify-content-end">
                    <h5 class="card-title w-100">${producto.nombre}</h5>
                    <p class="card-text price" >$${producto.precio} MXN </p>
                    <a href="#" class="btn btn-primary w-100" onclick="addProducto(${producto.id})"> Agregar</a>
                    </div>
                </div>`
           
             }
        )
        listaDom.innerHTML = cards
    }
    
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
    localStorage.setItem("productos", JSON.stringify(PRODUCTOS))

}


function ordenes(){
    verOrdenes()
}

function verOrdenes(){

    ORDENES = getOrdenes()
    const listaOrdenes = document.getElementById("lista-ordenes")



    let cards=""
    ORDENES.forEach((orden, index) =>  {
        let productos = ""
        let total = 0.0
        orden.productos.forEach(producto => {
            total += producto.total 
            productos += `<li class="list-group-item d-flex justify-content-between align-items-start w-100">
                            <div class="ms-2 me-auto">
                            <div class="fw-bold">${producto.nombre}</div>
                                <h6>Cantidad: ${producto.cantidad}</h6>
                            </div>
                            <span class="badge text-bg-primary rounded-pill">$ ${producto.total}</span>
                        </li>`
        })



        
        cards += `<div class="card mb-5 mr-2 ${getClassPrioridad(orden.prioridad)} " style="width: 18rem; flex-basis:30%">
                    <div class="card-body d-flex flex-wrap justify-content-end">
                    <h5 class="card-title w-100"># ${orden.id}</h5>
                    <ul class="list-group">
                    </ul>
                    ${productos}
                    </div>
                    <div class="card-footer d-flex justify-content-end">
                        Total: $${total} MXN
                    </div>
                </div>`

    })
    listaOrdenes.innerHTML =cards
}

function getClassPrioridad(prioridad){

    switch(prioridad){
        case "warn":
            return "border border-warning"
        case "ok":
            return "border border-primary"
        case "danger":
            return "border border-danger"    
    }

}



    

