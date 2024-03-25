# backend-server

# Primera entrega
Marzo 11 de 2024
* Se desarrollaron las clases UsersManager y ProductsManager para manejar información en memoria

# Segunda entrega 
Marzo 18 2024
* Se organizan las carpetas de los archivos y programas en Javascript
* Creadas las clases UsersManager y ProductsManager para manejar información en persistente en archivos planos

Para la realización de las pruebas, se recomienda eliminar los archivos existentes en la carpeta /files tanto de usuarios (users.json) como de productos (products.json), sin embargo, esta acción no es necesaria. No hacerlo implica que los registros van a aumentar en cada ejecución del programa.
La ejecución se realiza, clonando el repositorio 'sprint2' desde VisualStudio Code, se abre una consola GitBash y desde alli se ejecutan cada uno de los archivos Javascript desde el entorno 'node' con los comandos:
* node ./data/fs/UsersManager.js
* node ./data/fs/ProductsManager.js

Los resultados se verán en la consola y consultando los respectivos archivos JSON mencionados anteriormente.

# Tercera entrega
Marzo 25 de 2024
* Para esta entrega se crea el server que servirá de proveedor de los métodos para el manejo de las operaciones básicas tanto para Usuarios como para Productos
* Los métodos expuestos están disponibles a través del navegador en URLs específicas para cada acción
* Las pruebas pueden realizarse de acuerdo a los siguientes endpoints y su respectiva acción
* * Para los Usuarios
* * localhost:8080/api/users => devuelve todos los usuarios
* * localhost:8080/api/users/xxxx@zzz.com/CLAVE/ROL => permite la creación de un nuevo usuario pasando la información separada por un / de la siguiente manera: email/clave/rol, retorna la información del usuario creado
* * localhost:8080/api/users?rol=## => devuelve todos los usuarios que tienen el mismo rol (##)
* * localhost:8080/api/users/uid => permite la consulta de la información de un usuario específico, devuelve la información del usuario
* * localhost:8080/api/users/delete/uid => permite eliminar el usuario cuyo id se pasó como parámetro, devuelve la información del usuario eliminado

* * Para los Productos, estos hacen referencia a una venta de música en formatos especiales como discos en vinilo y cds para coleccionistas
* * localhost:8080/api/products => devuelve todos los productos
* * localhost:8080/api/products/título/autor/categoría/idioma/precio/stock/tipo => permite la creación de un nuevo producto pasando la información separada por un / de la siguiente manera: título/autor/categoría/idioma/precio/stock/tipo, retorna la información del producto creado
* * localhost:8080/api/products?category=XXXX => devuelve todos los productos que tienen la misma categoria (XXXX)
* * localhost:8080/api/products/pid => permite la consulta de la información de un producto específico, devuelve la información del producto
* * localhost:8080/api/products/delete/pid => permite eliminar el producto cuyo id se pasó como parámetro, devuelve la información del producto eliminado

Todas las pruebas y las respectivas respuesta se pueden apreciar en el navegador