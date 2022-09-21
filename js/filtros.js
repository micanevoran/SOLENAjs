//FILTROS

//Me traigo del HTML el contenedor de todos los productos y todos los productos que contiene
const prodContainer = document.querySelector("#ProdList")
const TODOS = document.querySelectorAll(".products__figure")

//Creo una clase constructora para mis productos//
class crearProducto{
    constructor(img, nombre, nombreLowerCase, precio, linea, tipo){
        this.img = img
        this.nombre = nombre
        this.nombreLowerCase = nombreLowerCase
        this.precio = precio
        this.linea = linea
        this.tipo = tipo
    }
}

let prodArray = []

//Para cada figure de producto, obtengo los datos que voy a necesitar y creo un nuevo objeto con la clase constructora agregándolos a un Array
TODOS.forEach(prod => obtenerDatosProd(prod))
function obtenerDatosProd(prod){
    const prodImg = prod.querySelector(".prod-img").src
    const prodNombre = prod.querySelector(".prod-nombre").textContent
    const prodNombreLowerCase = prodNombre.toLowerCase()
    const prodPrecio = prod.querySelector(".prod-precio").textContent
    const prodLinea = extraerLinea(prod.classList[1])
    const prodTipo = extraerTipo(prod.classList[2])
    const productoNuevo = new crearProducto(prodImg, prodNombre, prodNombreLowerCase, prodPrecio, prodLinea, prodTipo)
    prodArray.push(productoNuevo)
}

//Defino una función para extraer la línea de producto a la que corresponde el producto
function extraerLinea (elemento){
    switch(elemento){
        case "linea-fotovoltaica":
            return "linea-fotovoltaica"
            break
        case "linea-termica":
            return "linea-termica"
            break
        default:
            return "no determinado"
            break
    }
    return
}

//Defino una función para extraer el tipo de producto al que corresponde el producto
function extraerTipo (elemento){
    switch(elemento){
        case "tipo-panel":
            return "tipo-panel"
            break
        case "tipo-termot":
            return "tipo-termot"
            break
        case "tipo-inv":
            return "tipo-inv"
            break
        case "tipo-bat":
            return "tipo-bat"
            break
        case "tipo-acc":
            return "tipo-acc"
            break
        default:
            return "no determinado"
            break
    }
    return
}
//Defino una función para crear las Figures según el criterio buscado
function crearFigure(prodImg, prodNombre, prodPrecio, prodLinea, prodTipo){
    const prodFigure = document.createElement("figure")
    prodFigure.className = `products__figure ${prodLinea} ${prodTipo}`
    const figureContent = `
        <img src=${prodImg} class="prod-img">
        <figcaption class="prod-nombre">${prodNombre}</figcaption>
        <p class="prod-precio">${prodPrecio}</p>
        <button class="btn-carrito">
            Agregar al Carrito 
            <img src="img/icons/agregarCarrito.png" alt="Agregar al Carrito de compras" class="btn-img">
        </button> `
        prodFigure.innerHTML = figureContent
        prodContainer.append(prodFigure)
        let agregarCarritoBtnFiltrado = prodFigure.querySelectorAll(".btn-carrito")
        agregarCarritoBtnFiltrado.forEach((btn)=>{
            btn.addEventListener("click", () => agregarCarritoClick(event))
        })
}


/*---------------------BUSCADOR DE PRODUCTOS---------------------*/

//Me traigo del HTML el botón para buscar productos
const buscadorBtn = document.querySelector(".products__search--btn")

//Agrego un event listener al hacer click en el botón de buscar productos
let prodBuscado = document.querySelector("#buscadorInput")
buscadorBtn.addEventListener("click", () => buscarProducto(event))

//Defino la función de respuesta al hacer click en el botón de agregar al Carrito
function buscarProducto(event){
    event.preventDefault()
    let filtrados = prodArray.filter(el=>el.nombreLowerCase.includes(prodBuscado.value.toLowerCase()))
    if(filtrados.length==0){
        prodContainer.innerHTML = ``
    }
    else{
        prodContainer.innerHTML = ``
        filtrados.forEach(e=>crearFigure(e.img, e.nombre, e.precio, e.linea, e.tipo))
    }
}


/*---------------------FILTROS POR LÍNEA---------------------*/

//Me traigo del HTML los botones para filtrar productos por línea de producto
const fitroLineaBtn = document.querySelector("#filtroLinea")
const lineaFotovoltaicaBtn = document.querySelector("#linea-fotovoltaica")
const lineaTermicaBtn = document.querySelector("#linea-termica")
const lineaTodos = document.querySelector("#linea-todos")

//Agrego un event listener al hacer click en los botones
lineaFotovoltaicaBtn.addEventListener("click", () => filtrarFotovoltaica(event))
lineaTermicaBtn.addEventListener("click", () => filtrarTermica(event))
lineaTodos.addEventListener("click", () => verTodos(event))

//Armo un array de productos para cada una de las líneas
const LineaFotovoltaicaProdArray = document.querySelectorAll(".linea-fotovoltaica")
const LineaTermicaProdArray = document.querySelectorAll(".linea-termica")

//Defino las funciones de respuesta al hacer click en los filtros por linea
function filtrarFotovoltaica(event){
    LineaFotovoltaicaProdArray.forEach(e=> e.className="products__figure")
    LineaTermicaProdArray.forEach(e=> e.className="d-none")
    fitroLineaBtn.innerText = "Línea Solar Fotovoltaica"
}
function filtrarTermica(event){
    LineaTermicaProdArray.forEach(e=> e.className="products__figure")
    LineaFotovoltaicaProdArray.forEach(e=> e.className="d-none")
    fitroLineaBtn.innerText = "Línea Solar Térmica"
}
function verTodos(event){
    LineaTermicaProdArray.forEach(e=> e.className="products__figure")
    LineaFotovoltaicaProdArray.forEach(e=> e.className="products__figure")
    fitroLineaBtn.innerText = "Línea de Productos"
}


/*---------------------FILTROS POR TIPO---------------------*/

//Me traigo del HTML los botones para filtrar productos por tipo de producto
const checkInputs = document.querySelectorAll(".form-check-input")
const checkInputTipoPanel = document.querySelector("#tipo-panel")
const checkInputTipoTermot = document.querySelector("#tipo-termot")
const checkInputTipoInv = document.querySelector("#tipo-inv")
const checkInputTipoBat = document.querySelector("#tipo-bat")
const checkInputTipoAcc = document.querySelector("#tipo-acc")

console.log(checkInputTipoBat)

//Agrego un event listener al hacer click en los botones
checkInputTipoPanel.addEventListener("change", () => filtrarTipoPanel(event))
checkInputTipoTermot.addEventListener("change", () => filtrarTipoTermot(event))
checkInputTipoInv.addEventListener("change", () => filtrarTipoInv(event))
checkInputTipoBat.addEventListener("change", () => filtrarTipoBat(event))
checkInputTipoAcc.addEventListener("change", () => filtrarTipoAcc(event))

//Armo un array de productos para cada tipo de producto
const TipoPanelArray = document.querySelectorAll(".tipo-panel")
const TipoTermotArray = document.querySelectorAll(".tipo-termot")
const TipoInvArray = document.querySelectorAll(".tipo-inv")
const TipoBatArray = document.querySelectorAll(".tipo-bat")
const TipoAccArray = document.querySelectorAll(".tipo-acc")


// //Defino la función de respuesta al filtro por tipo de producto
function filtrarTipoPanel(event){
    if(checkInputTipoPanel.checked){
        TipoPanelArray.forEach(e=> e.className="products__figure")
    }
    else{
        TipoPanelArray.forEach(e=> e.className="d-none")
    }
}
function filtrarTipoTermot(event){
    if(checkInputTipoTermot.checked){
        TipoTermotArray.forEach(e=> e.className="products__figure")
    }
    else{
        TipoTermotArray.forEach(e=> e.className="d-none")
    }
}
function filtrarTipoInv(event){
    if(checkInputTipoInv.checked){
        TipoInvArray.forEach(e=> e.className="products__figure")
    }
    else{
        TipoInvArray.forEach(e=> e.className="d-none")
    }
}
function filtrarTipoBat(event){
    if(checkInputTipoBat.checked){
        TipoBatArray.forEach(e=> e.className="products__figure")
    }
    else{
        TipoBatArray.forEach(e=> e.className="d-none")
    }
}
function filtrarTipoAcc(event){
    if(checkInputTipoAcc.checked){
        TipoAccArray.forEach(e=> e.className="products__figure")
    }
    else{
        TipoAccArray.forEach(e=> e.className="d-none")
    }
}