//FILTROS

//Defino las variables
let prodContainer 
let TODOSfigures
let buscadorBtn
let prodBuscadoInput

//Me traigo del HTML el contenedor de todos los productos y todos los productos que contiene, todas las figures de productos y todos los nombres de productos (en minúsculas)
prodContainer = document.querySelector("#ProdList")
TODOSfigures = prodContainer.querySelectorAll(".products__figure")


/*---------------------BUSCADOR DE PRODUCTOS---------------------*/

//Me traigo del HTML el botón para buscar productos y el input del usuario del producto buscado
buscadorBtn = document.querySelector(".products__search--btn")
prodBuscadoInput = document.querySelector("#buscadorInput")

//Agrego un event listener al hacer click en el botón de buscar productos
buscadorBtn.addEventListener("click", buscarProd)

// Defino la función de respuesta al hacer click en el botón buscar producto
function buscarProd(e){
    e.preventDefault()
    TODOSfigures.forEach(el => {
        el.querySelector(".prod-nombre").textContent.toLowerCase().includes(prodBuscadoInput.value.toLowerCase()) ? el.classList.remove("d-none") : el.classList.add("d-none")
    }) 
}


/*---------------------FILTROS POR LÍNEA---------------------*/

//Me traigo del HTML los botones para filtrar productos por línea de producto
const fitroLineaBtn = document.querySelector("#filtroLinea")
const lineaFotovoltaicaBtn = document.querySelector("#linea-fotovoltaica")
const lineaTermicaBtn = document.querySelector("#linea-termica")
const lineaTodos = document.querySelector("#linea-todos")

//Agrego un event listener al hacer click en los botones
lineaFotovoltaicaBtn.addEventListener("click", filtrarFotovoltaica)
lineaTermicaBtn.addEventListener("click", filtrarTermica)
lineaTodos.addEventListener("click", verTodos)

//Defino las funciones de respuesta al hacer click en los filtros por linea
function filtrarFotovoltaica(){
    TODOSfigures.forEach(el => 
        el.className.includes("linea-fotovoltaica") ? el.classList.remove("d-none") : el.classList.add("d-none")) 
}
function filtrarTermica(){
    TODOSfigures.forEach(el => {
        el.className.includes("linea-termica") ? el.classList.remove("d-none") : el.classList.add("d-none")
    }) 
}
function verTodos(){
    TODOSfigures.forEach(el => el.classList.remove("d-none")) 
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
checkInputTipoPanel.addEventListener("change", filtrarTipoPanel)
checkInputTipoTermot.addEventListener("change", filtrarTipoTermot)
checkInputTipoInv.addEventListener("change", filtrarTipoInv)
checkInputTipoBat.addEventListener("change", filtrarTipoBat)
checkInputTipoAcc.addEventListener("change", filtrarTipoAcc)

//Defino la función de respuesta al filtro por tipo de producto
function filtrarTipoPanel(e){
    if(!e.target.checked){
        TODOSfigures.forEach(el => 
            el.className.includes("tipo-panel") && el.classList.add("d-none")) 
    }
    else{
        TODOSfigures.forEach(el => 
            el.className.includes("tipo-panel") && el.classList.remove("d-none")) 
    }
}
function filtrarTipoTermot(e){
    if(!e.target.checked){
        TODOSfigures.forEach(el => 
            el.className.includes("tipo-termot") && el.classList.add("d-none")) 
    }
    else{
        TODOSfigures.forEach(el => 
            el.className.includes("tipo-termot") && el.classList.remove("d-none")) 
    }
}
function filtrarTipoInv(e){
    if(!e.target.checked){
        TODOSfigures.forEach(el => 
            el.className.includes("tipo-inv") && el.classList.add("d-none")) 
    }
    else{
        TODOSfigures.forEach(el => 
            el.className.includes("tipo-inv") && el.classList.remove("d-none")) 
    }
}
function filtrarTipoBat(e){
    if(!e.target.checked){
        TODOSfigures.forEach(el => 
            el.className.includes("tipo-bat") && el.classList.add("d-none")) 
    }
    else{
        TODOSfigures.forEach(el => 
            el.className.includes("tipo-bat") && el.classList.remove("d-none")) 
    }

}
function filtrarTipoAcc(e){
    if(!e.target.checked){
        TODOSfigures.forEach(el => 
            el.className.includes("tipo-acc") && el.classList.add("d-none")) 
    }
    else{
        TODOSfigures.forEach(el => 
            el.className.includes("tipo-acc") && el.classList.remove("d-none")) 
    }

}