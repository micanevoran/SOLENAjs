# <img src="https://github.com/micanevoran/SOLENA/blob/master/img/logo.svg" alt="SOLENA - Soluciones Energéticas Ambientales" width=25%>
<img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green">


## Introducción

Para mejorar mi proyecto desarrollado en el Curso de Desarrollo Web, decidí hacer mi proyecto en JavaScript sobre el mismo, dándole funcionalidad al e-commerce de la sección "Productos" de la página

*A los fines de esta entrega, los archivos que componen el proyecto son **productos.html** **carrito.js** y **filtros.js***


## Archivo carrito.js

Inicialmente definí globalmente las variables que utilizaré a lo largo del código, entre las cuales se encuentra un array vacío donde agregaré mi lista de productos disponibles. 

Luego, con una función asíncrona, solicito a la API **mockapi** que tome la información de los productos y los agregue a mi array de productos. 
(Previamente agregué mis productos a la base de datos de MockAPI generando una API ficticia para consumir con la información necesaria de mis productos.). 

Cada producto de la tienda tiene un botón "Agregar al Carrito". El evento onclick para esto botones, desencadena el agregado del producto al carrito de compras ubicado al final de la página. Cuando un usuario agrega un producto, se dispara una notificación creada con **Toastify**

Si el usuario quiere agregar al carrito un producto que ya ha sido previamente agregado, sólamente aumenta la cantidad de unidades de producto.

Cuando un producto es agregado al carrito, se visualizan los datos de producto agregado (imagen, nombre, precio) y además hay un input de cantidad que por defecto es 1 pero puede ser modificada por el usuario. También al final de cada línea hay un botón para eliminar el producto del carrito. 

Cuando se produce cualquier modificación en el carrito (agregado/eliminación de un producto o modificación de la cantidad) esta información se almacena en el Local Storage para que el carrito armado persista a cierres del navegador. 

Al final del carrito, se visualiza el valor total de la compra, que se actualiza conforme se agregan, eliminan o se modifica la cantidad de productos. Este valor total, también se almacena en el Local Storage.

Al final del carrito de compras hay un botón para "Comprar", que al presionarlo dispara una alerta creada con **Sweet Alert** agradeciendo al usuario por la compra, vaciando el carrito y limpiando la información almacenada en Local Storage. 

Al lado del botón Comprar, hay un botón para "Limpiar Carrito" el cual elimina, a la vez, todos los productos que contiene el carrito y la información almacenada en el Local Storage.


## Archivo filtros.js

En este archivo determiné el funcionamiento de los filtros. 
Consta de un buscador de productos, un dropdown button para el filtro por línea y checked buttons para los filtros por tipo de producto. 

## Optimizaciones de código implementadas

Optimicé el código utilizando los operadores avanzados vistos en clase. Algunos ejemplos:
- Desestructuración de objeto en la función agregarCarritoClick() del archivo funciones.js (línea 45)
- Operador Lógico AND (&&) en la función agregarCarritoClick() del archivo funciones.js (línea 57)
- Operador Lógico AND (&&) en las funciones agregarCarritoClick() y mostrarProductoEnCarrito() del archivo funciones.js (línea 94)
- Operador Lógico AND (&&) en la función modificarCantidad() del archivo funciones.js (línea 121)
- Spread de objeto en otro objeto en la función guardarProductosLocalStorage() del archivo funciones.js (línea 147)
- Operador Ternario en la función obtenerProductosLocalStorage() del archivo funciones.js (línea 155)
- Operador Lógico AND (&&) en la función eliminarProductosLocalStorage() del archivo funciones.js (línea 168)


## Entrega desafío de incorporación de Fetch

Agregué mis productos a la base de datos de MockAPI generando una API ficticia para consumir con la información necesaria de mis productos. Eliminé la clase constructora de productos y la función para crear productos y agregarlos al array de productos. En su lugar, agregué una función asíncrona con fetch, que consulta la información almacenada en la API y la agrega a mi array de productos.
