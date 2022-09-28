//Me traigo del HTML todos los botones para agregar los productos al carrito
const agregarCarritoBtn = document.querySelectorAll(".btn-carrito")

//Agrego un eventListener al hacer click en los botones 
agregarCarritoBtn.forEach((btn)=>{
    btn.addEventListener("click", () => agregarCarritoClick(event))
})

//Me traigo del HTML el contenedor donde se ubicarán los productos que vaya agregando
const carritoContainer = document.querySelector(".carritoContainer")

//Cargo en el carrito los productos que se encuentran en local Storage
visualizarProductosLocalStorage()

//Defino la función de respuesta al hacer click en el botón de agregar al Carrito
function agregarCarritoClick(event){
    const button = event.target
    const prod = button.closest(".products__figure")
    
    const prodId = Number(prod.querySelector(".btn-carrito").getAttribute("data-id"))
    const prodNombre = prod.querySelector(".prod-nombre").textContent
    const prodPrecio = prod.querySelector(".prod-precio").textContent
    const prodImg = prod.querySelector(".prod-img").src

    agregarCarrito (prodId, prodNombre, prodPrecio, prodImg)
}

//Defino la función para agregar productos al Carrito
//Con un condicional indico que si el producto ya se encuentra en el carrito, sólo aumente la cantidad y no se vuelva a agregar
//Cuando agrego un nuevo producto, que no está en local Storage, se guarda en local Storage
function agregarCarrito (prodId, prodNombre, prodPrecio, prodImg){
    const productosCarrito = carritoContainer.querySelectorAll(".prodAgregadoNombre")
    for (let i=0; i<productosCarrito.length; i++){
        if (productosCarrito[i].innerText === prodNombre){
            let prodCantidad = productosCarrito[i].parentElement.parentElement.parentElement.querySelector(".prodAgregadoCantidadInput")
            prodCantidad.value ++
            actualizarCantidadLocalStorage(prodId, prodCantidad.value)
            actualizarTotalCarrito()
            return
        }
    }

    let productosLS = obtenerProductosLocalStorage()
    let prodIdBoolean = productosLS.some(prod=>prod.id == prodId)
    if (prodIdBoolean == false){
        const carritoRow = document.createElement("div")
        const prodCarritoContent = `
        <div class= "row prodAgregado container-fluid">
            <div class= "col-6">
                <div class= "prodAgregadoImgNombre">
                    <img src=${prodImg} class= "prodAgregadoImg">
                    <p class= "prodAgregadoNombre">${prodNombre}</p>
                </div>
            </div>
            <div class= "col-2">
                <div class= "prodAgregadoPrecio">
                    <p class="prodPrecio">${prodPrecio}</p>
                </div>
            </div>
            <div class= "col-4">
                <div class= "prodAgregadoCantidad">
                    <input class="prodAgregadoCantidadInput" type="number" value=1>
                    <button class="btnDelete" type="button" data-id="${prodId}">X</button>
                </div>
            </div>
        </div>`
        carritoRow.innerHTML= prodCarritoContent
        carritoContainer.append(carritoRow)
        
        const prodCantidad = carritoRow.querySelector(".prodAgregadoCantidadInput").value

        //Agrego un eventListener al hacer click en los botones de eliminar
        carritoRow.querySelector(".btnDelete").addEventListener("click", () => eliminarProductoClick(event))

        //Agrego un eventListener al aumentar la cantidad de productos
        carritoRow.querySelector(".prodAgregadoCantidad").addEventListener("change", ()=> modificarCantidad(event))

        guardarProductosLocalStorage(prodId, prodImg, prodNombre, prodPrecio, prodCantidad)
    }

    actualizarTotalCarrito()
}

//Defino la función para que se vaya actualizando el total del Carrito al agregar productos y se vaya guardando el total el local Storage
function actualizarTotalCarrito(){
    let total = 0
    const totalCarrito = document.querySelector(".totalCarrito")
    const productosCarrito = document.querySelectorAll(".prodAgregado")

    productosCarrito.forEach((prod) => {
        const precioProductoAgregado = Number(prod.querySelector(".prodPrecio").textContent.replace("U$S",""))
        const cantidadProductoAgregado = Number(prod.querySelector(".prodAgregadoCantidadInput").value)
        total = total + precioProductoAgregado * cantidadProductoAgregado
    })

    totalCarrito.innerHTML = `U$S ${total}`
    localStorage.setItem("totalCompra", total)
}

const eliminarProductoBtn = document.querySelectorAll(".btnDelete")

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
    if (inputCantidad.value<=0){
        inputCantidad.value=1
    }
    const prod = inputCantidad.closest(".prodAgregado")
    const prodId = Number(prod.querySelector(".btnDelete").getAttribute("data-id"))
    actualizarTotalCarrito()
    actualizarCantidadLocalStorage(prodId, inputCantidad.value)
}

//Me traigo del HTML el botón "comprar" 
const comprarBtn = document.querySelector(".comprarBtn")

//Agrego un eventListener al hacer click en el botón comprar
comprarBtn.addEventListener("click", () => comprarClick())

//Defino la función de respuesta al hacer click en el botón de comprar
//Al hacer click en comprar, se vacía el carrito y se limpia el local Storage
function comprarClick(){
    carritoContainer.innerHTML = ""
    actualizarTotalCarrito()
    localStorage.clear()
}

//Me traigo del HTML el botón "Limpiar Carrito" 
const limpiarCarritoBtn = document.querySelector(".vaciarCarritoBtn")

//Agrego un eventListener al hacer click en el botón "Limpiar Carrito"
limpiarCarritoBtn.addEventListener("click", () => limpiarCarritoClick())

//Defino la función de respuesta al hacer click en el botón de "Limpiar Carrito" 
//Se eliminan los productos del carrito y se limpia el local Storage
function limpiarCarritoClick(){
    carritoContainer.innerHTML = ""
    actualizarTotalCarrito()
    localStorage.clear()
}

//Creo la clase constructora para los productos que agrego al Carrito
class nuevoProdCarrito{
    constructor(id, img, nombre, precio, cantidad){
        this.id = id
        this.img = img
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
    }
}

//Defino la función para guardar productos en local Storage
//Aquí llamo a mi clase constructora para crear los productos
function guardarProductosLocalStorage(id, img, nombre, precio, cantidad){
    let nuevoProductoCarrito = new nuevoProdCarrito(id, img, nombre, precio, cantidad)
    let productosCarrito = obtenerProductosLocalStorage()
    productosCarrito.push(nuevoProductoCarrito)
    localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito))
}

//Defino la función para obtener productos del local Storage
function obtenerProductosLocalStorage(){
    let productosLS
    if (localStorage.getItem("productosCarrito") === null){
        productosLS = []
    }
    else{
        productosLS = JSON.parse(localStorage.getItem("productosCarrito"))
    }
    return productosLS
}

//Defino la función para visualizar productos de local Storage
function visualizarProductosLocalStorage(){
    carritoContainer.innerHTML= ""
    let productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(prod=>{
        const carritoRow = document.createElement("div")
        const prodCarritoContent = `
        <div class= "row prodAgregado container-fluid">
            <div class= "col-6">
                <div class= "prodAgregadoImgNombre">
                    <img src=${prod.img} class= "prodAgregadoImg">
                    <p class= "prodAgregadoNombre">${prod.nombre}</p>
                </div>
            </div>
            <div class= "col-2">
                <div class= "prodAgregadoPrecio">
                    <p class="prodPrecio">${prod.precio}</p>
                </div>
            </div>
            <div class= "col-4">
                <div class= "prodAgregadoCantidad">
                    <input class="prodAgregadoCantidadInput" type="number" value=${prod.cantidad}>
                    <button class="btnDelete" type="button" data-id="${prod.id}">X</button>
                </div>
            </div>
        </div>`
        carritoRow.innerHTML= prodCarritoContent
        carritoContainer.append(carritoRow)

        actualizarTotalCarrito()

        //Agrego un eventListener al hacer click en los botones de eliminar
        carritoRow.querySelector(".btnDelete").addEventListener("click", () => eliminarProductoClick(event))

        //Agrego un eventListener al aumentar la cantidad de productos
        carritoRow.querySelector(".prodAgregadoCantidad").addEventListener("change", ()=> modificarCantidad(event))
    })
}

//Defino la función para eliminar productos del local Storage
function eliminarProductosLocalStorage(productoID){
    let productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(function(prod, index){
        if(prod.id === productoID){
            productosLS.splice(index,1)
        }
    })
    localStorage.setItem("productosCarrito", JSON.stringify(productosLS))
    return productosLS
}

//Defino la función de actualizar cantidad en local Storage
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