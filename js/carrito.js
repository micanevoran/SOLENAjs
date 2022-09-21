//Me traigo del HTML todos los botones para agregar los productos al carrito
const agregarCarritoBtn = document.querySelectorAll(".btn-carrito")

//Agrego un eventListener al hacer click en los botones 
agregarCarritoBtn.forEach((btn)=>{
    btn.addEventListener("click", () => agregarCarritoClick(event))
})

//Me traigo del HTML el botón "comprar" 
const comprarBtn = document.querySelector(".comprarBtn")

//Agrego un eventListener al hacer click en el botón comprar
comprarBtn.addEventListener("click", () => comprarClick())

//Me traigo del HTML el contenedor donde se ubicarán los productos que vaya agregando
const carritoContainer = document.querySelector(".carritoContainer")

//Defino la función de respuesta al hacer click en el botón de agregar al Carrito
function agregarCarritoClick(event){
    const button = event.target
    const prod = button.closest(".products__figure")
    
    const prodNombre = prod.querySelector(".prod-nombre").textContent
    const prodPrecio = prod.querySelector(".prod-precio").textContent
    const prodImg = prod.querySelector(".prod-img").src

    agregarCarrito (prodNombre, prodPrecio, prodImg)
}

//Defino la función para agregar productos al Carrito
function agregarCarrito (prodNombre, prodPrecio, prodImg){
    const productosCarrito = carritoContainer.querySelectorAll(".prodAgregadoNombre")
    for (let i=0; i<productosCarrito.length; i++){
        if (productosCarrito[i].innerText === prodNombre){
            let prodCantidad = productosCarrito[i].parentElement.parentElement.parentElement.querySelector(".prodAgregadoCantidadInput")
            prodCantidad.value ++
            actualizarTotalCarrito()
            return
        }
    }

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
                <button class="btnDelete" type="button">X</button>
            </div>
        </div>
    </div>`
    carritoRow.innerHTML= prodCarritoContent
    carritoContainer.append(carritoRow)

    //Agrego un eventListener al hacer click en los botones de eliminar
    carritoRow.querySelector(".btnDelete").addEventListener("click", () => eliminarProductoClick(event))

    //Agrego un eventListener al aumentar la cantidad de productos
    carritoRow.querySelector(".prodAgregadoCantidad").addEventListener("change", ()=> modificarCantidad(event))


    actualizarTotalCarrito()
}

//Defino la función para que se vaya actualizando el total del Carrito al agregar productos
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
}

const eliminarProductoBtn = document.querySelectorAll(".btnDelete")

//Defino la función de respuesta al hacer click en el botón de eliminar producto
function eliminarProductoClick(event){
    const button = event.target
    const prodAEliminar = button.closest(".prodAgregado").remove()
    actualizarTotalCarrito()
}

//Defino la función de respuesta al modificar la cantidad de productos
function modificarCantidad(event){
    const inputCantidad = event.target
    if (inputCantidad.value<=0){
        inputCantidad.value=1
    }
    actualizarTotalCarrito()
}

//Defino la función de respuesta al hacer click en el botón de comprar
function comprarClick(){
    carritoContainer.innerHTML = ""
    actualizarTotalCarrito()
}




