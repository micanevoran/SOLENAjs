# <img src="https://github.com/micanevoran/SOLENA/blob/master/img/logo.svg" alt="SOLENA - Soluciones Energéticas Ambientales" width=25%>
<img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green">


## Segunda Entrega Proyecto Final

El desarrollo JavaScript se puede visualizar en la página "Productos" (productos.html).

Para ello, en el archivo carrito.js, desarrollé un código que permita ir armando un carrito de compras al final de la página, donde se vayan agregando los productos que selecciona el usuario.

Utilicé Local Storage, para almacenar el carrito de compras armado por el usuario y que persista la información ante cierres del navegador o reinicio del sistema. 

En el código se encuentra comentado paso a paso lo que fui haciendo

OBS: desestimar el archivo filtros.js (aún me encuentro trabajando en ello y su referencia en el html se encuentra comentada)

**Los únicos archivos que componen el proyecto (por ahora) son *productos.html* y *carrito.js***



## Entrega desafío complementario optimización de código

Primero separé el código javascript en distintos archivos: uno para variables, uno para clases, uno para funciones y otro exclusivamente para los filtros de productos de la aplicación. 

Optimicé el código utilizando los operadores avanzados vistos en clase, por ejemplo:
- Desestructuración de objeto en la función agregarCarritoClick() del archivo funciones.js (línea 45)
- Operador Lógico AND (&&) en la función agregarCarritoClick() del archivo funciones.js (línea 57)
- Operador Lógico AND (&&) en las funciones agregarCarritoClick() y mostrarProductoEnCarrito() del archivo funciones.js (línea 94)
- Operador Lógico AND (&&) en la función modificarCantidad() del archivo funciones.js (línea 121)
- Spread de objeto en otro objeto en la función guardarProductosLocalStorage() del archivo funciones.js (línea 147)
- Operador Ternario en la función obtenerProductosLocalStorage() del archivo funciones.js (línea 155)
- Operador Lógico AND (&&) en la función eliminarProductosLocalStorage() del archivo funciones.js (línea 168)

También organicé mi código definiendo una función para inicializar los elementos, otra para inicializar los eventos y luego llamando a la ejecución en una función main()
