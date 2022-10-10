//Defino las variables
let agregarProdAlCarritoBtn
let carritoContainer
let carritoRow
let carritoContent
let cantidadAgregada
let comprarBtn
let limpiarCarritoBtn
const listaProductos = []

//Defino una función asíncrona que tome la información de los productos de mockAPI y los agregue a mi array listaProductos
const pedirDatosProd = async()=>{
    const resp = await fetch("https://6341d13816ffb7e275d87143.mockapi.io/solenajs/productos")
    const data = await resp.json()
    data.forEach(el=>listaProductos.push(el))
}

//Me traigo del HTML todos los elementos que desencadenarán eventos, definiendo una función para inicializarlos
function inicializarElementos(){
    agregarProdAlCarritoBtn = document.querySelectorAll(".btn-carrito")
    carritoContainer = document.querySelector(".carritoContainer")
    comprarBtn = document.querySelector(".comprarBtn")
    limpiarCarritoBtn = document.querySelector(".vaciarCarritoBtn")
}

//Defino una función para inicializar todos los eventos
function inicializarEventos(){
    agregarProdAlCarritoBtn.forEach((btn)=>{
        btn.addEventListener("click", agregarCarritoClick)
    })
    comprarBtn.addEventListener("click", comprarClick)
    limpiarCarritoBtn.addEventListener("click", limpiarCarritoClick)
}

//Defino una función para encontrar un producto en mi lista de productos
function buscarProducto(prodBuscado){
    const prodEncontrado = listaProductos.find(el=>el.nombre === prodBuscado)
    return prodEncontrado
}

//Defino la función de respuesta al hacer click en el botón de agregar producto al carrito
//Cuando agrego un nuevo producto, que no está en local Storage, se guarda en local Storage
function agregarCarritoClick(e){
    const button = e.target
    const prod = button.closest(".products__figure").children[1].textContent
    const {id, img, nombre, precio} = buscarProducto(prod)
    const productosCarrito = carritoContainer.querySelectorAll(".prodAgregadoNombre")
    for (let i=0; i<productosCarrito.length; i++){
        if (productosCarrito[i].innerText === nombre){
            let prodCantidad = productosCarrito[i].parentElement.parentElement.parentElement.querySelector(".prodAgregadoCantidadInput")
            prodCantidad.value ++
            Toastify({
                text: `Se gregó ${productosCarrito[i].innerText} al carrito`,
                duration: 3000,
                gravity: "bottom",
                position: "right",
                className: "toastStyle"
            }).showToast()
            actualizarCantidadLocalStorage(id, prodCantidad.value)
            actualizarTotalCarrito()
            return
        }
    }
    let productosLS = obtenerProductosLocalStorage()
    productosLS.some(prod=>prod.id == id) == false && mostrarProductoEnCarrito(id, img, nombre, precio, 1)
}

//Defino la función que muestra productos en el carrito
//Con un condicional indico que si el producto ya se encuentra en el carrito, sólo aumente la cantidad y no se vuelva a agregar
function mostrarProductoEnCarrito(id, img, nombre, precio, cdad){
    Toastify({
        text: `Se gregó ${nombre} al carrito`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        className: "toastStyle"
    }).showToast()
    carritoRow = document.createElement("div")
    carritoContent = `
        <div class= "row prodAgregado container-fluid">
            <div class= "col-6">
                <div class= "prodAgregadoImgNombre">
                    <img src=${img} class= "prodAgregadoImg">
                  <p class= "prodAgregadoNombre">${nombre}</p>
                </div>
            </div>
            <div class= "col-2">
                <div class= "prodAgregadoPrecio">
                    <p class="prodPrecio">${precio}</p>
                </div>
            </div>
            <div class= "col-4">
                <div class= "prodAgregadoCantidad">
                    <input class="prodAgregadoCantidadInput" type="number" value=${cdad}>
                <button class="btnDelete" type="button" data-id="${id}">X</button>
                </div>
            </div>
        </div>`
    carritoRow.innerHTML= carritoContent
    carritoContainer.append(carritoRow)
    //Agrego EventListener al hacer click en los botones de eliminar producto
    carritoRow.querySelector(".btnDelete").addEventListener("click", eliminarProductoClick)
    //Actualizo el total del carrito
    //Guardo las unidades del producto en una variable             
    cantidadAgregada = carritoRow.querySelector(".prodAgregadoCantidadInput")
    //Agrego EventListener ante el cambio en la cantidad de productos
    cantidadAgregada.addEventListener("change", modificarCantidad)
    //Guardo el elemento agregado al carrito en Local Storage
    obtenerProductosLocalStorage().some(el=>el.nombre === nombre) == false && guardarProductosLocalStorage(nombre, cdad) 
    actualizarTotalCarrito()                
}

//Defino la función para actualizar el total del carrito
function actualizarTotalCarrito(){
    let total = 0
    const totalCarritoNODO = document.querySelector(".totalCarrito")
    obtenerProductosLocalStorage().forEach(prod => total += prod.precio * prod.cantidad)
    totalCarritoNODO.innerHTML = `U$S ${total}`
    localStorage.setItem("totalCompra", total)
}

//Defino la función de respuesta al hacer click en el botón de eliminar producto
//Al eliminar un producto del carrito, también se elimina del local Storage
function eliminarProductoClick(event){
    const button = event.target
    let prodID = Number(button.getAttribute("data-id"))
    eliminarProductosLocalStorage(prodID)
    button.closest(".prodAgregado").remove()
    actualizarTotalCarrito()
}

//Defino la función de respuesta al modificar la cantidad de productos
//Al modificar la cantidad de productos en el carrito, también se actualiza en local Storage
function modificarCantidad(event){
    const inputCantidad = event.target
    inputCantidad.value <= 0 && inputCantidad.value == 1
    const prod = inputCantidad.closest(".prodAgregado")
    const prodId = Number(prod.querySelector(".btnDelete").getAttribute("data-id"))
    actualizarCantidadLocalStorage(prodId, inputCantidad.value)
    actualizarTotalCarrito()
}

//Defino la función de respuesta al hacer click en el botón de comprar
//Al hacer click en comprar, se vacía el carrito y se limpia el local Storage
function comprarClick(){
    carritoContainer.innerHTML = ""
    localStorage.clear()
    actualizarTotalCarrito()
    Swal.fire({
        title: "Gracias por su compra",
        icon: "success",
        confirmButtonText: "Cerrar",
        buttonsStyling: false,
        backdrop: false,
        customClass: {
            title: "swalText",
            confirmButtonText: "swalText",
            confirmButton: "swalButton",
            backdrop: "swalBackdrop"
        }
    })
}

//Defino la función de respuesta al hacer click en el botón de "Limpiar Carrito" 
//Se eliminan los productos del carrito y se limpia el local Storage
function limpiarCarritoClick(){
    carritoContainer.innerHTML = ""
    localStorage.clear()
    actualizarTotalCarrito()
}

//Defino la función para guardar productos en local Storage
function guardarProductosLocalStorage(nombre, cdad){
    let productosCarrito = obtenerProductosLocalStorage()
    let productoAgregado = {...buscarProducto(nombre), cantidad: cdad}
    productosCarrito.push(productoAgregado)
    localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito))
}

//Defino la función para obtener productos del Local Storage
function obtenerProductosLocalStorage(){
    let productosLS
    localStorage.getItem("productosCarrito") === null ? productosLS = [] : productosLS = JSON.parse(localStorage.getItem("productosCarrito"))
    return productosLS
}

//Defino la función para visualizar productos del Local Storage
function visualizarProductosLocalStorage(){
    let productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(prod=>mostrarProductoEnCarrito(prod.id, prod.img, prod.nombre, prod.precio, prod.cantidad))
}

//Defino la función para eliminar productos del Local Storage 
function eliminarProductosLocalStorage(productoID){
    let productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(function(prod, index){prod.id === productoID && productosLS.splice(index,1)})
    localStorage.setItem("productosCarrito", JSON.stringify(productosLS))
    return productosLS
}

//Defino la función de actualizar cantidades de productos en el local Storage
function actualizarCantidadLocalStorage(productoID, cantidadActual){
    let productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(prod=>{
        if(prod.id === productoID){
            let i = productosLS.indexOf(prod)
            productosLS[i].cantidad = cantidadActual
        }
    })
    localStorage.setItem("productosCarrito", JSON.stringify(productosLS))
    return productosLS
}

function main(){
    try{
        pedirDatosProd()
    }catch(error){
        console.log(error)
        }
    inicializarElementos()
    inicializarEventos()    
    visualizarProductosLocalStorage()
}

main()