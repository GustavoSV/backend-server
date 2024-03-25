import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  constructor() {
    this.path = "./data/fs/files/products.json";
    this.init();
  }

  init() {
    const existe = fs.existsSync(this.path);
    if (!existe) {
      const archivoNuevo = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, archivoNuevo);
      console.log("Se creó el archivo", this.path);
    } else {
      console.log("YA existe el archivo", this.path);
    }
  }

  async create(data) {
    try {
      if (!data) {
        throw new Error("NO HAY datos para crear el Producto");
      } else {
        if (!data.title || data.title === "") {
          throw new Error("DEBE incluir el título del producto");
        } else {
          const producto = {
            id: crypto.randomBytes(12).toString("hex"),
            title: data.title,
            author: data.author,
            category: data.category,
            language: data.language,
            price: parseFloat(data.price),
            stock: parseInt(data.stock),
            type: data.type,
            img: data.img || "./img/" + data.title + ".GIF"
          };
          let archivo = await fs.promises.readFile(this.path, "utf-8");
          archivo = JSON.parse(archivo);
          archivo.push(producto);
          archivo = JSON.stringify(archivo, null, 2);
          await fs.promises.writeFile(this.path, archivo);
          console.log("nuevo Producto creado con éxito", { create: producto.id });
          return producto;
        }
      }
    } catch (error) {
      console.log("ERROR método create()", error);
    }
  }

  async read() {
    try {
      let archivo = await fs.promises.readFile(this.path, "utf-8");
      archivo = JSON.parse(archivo);
      if (archivo.length === 0) {
        console.log("Productos leídos: NO HAY PRODUCTOS");
      } else {
        return archivo;
      }
    } catch (error) {
      console.log("ERROR método read()", error);
    }
  }

  async readOne(id) {
    try {
      let archivo = await fs.promises.readFile(this.path, "utf-8");
      archivo = JSON.parse(archivo);
      const producto = archivo.find((each) => each.id === id);
      if (!producto) {
        throw new Error("NO se encontró el Producto ", id)
      } else {
        return producto;
      }
    } catch (error) {
      console.log("ERROR en el método readOne()", error);
    }
  }

  async destroy(id) {
    try {
      let archivo = await fs.promises.readFile(this.path, "utf-8");
      archivo = JSON.parse(archivo);
      const producto = archivo.find((each) => each.id === id)
      if (!producto) {
        throw new Error("DESTROY NO se encontró el producto", id);
      } else {
        let filtrados = archivo.filter((each) => each.id !== id);
        filtrados = JSON.stringify(filtrados, null, 2);
        await fs.promises.writeFile(this.path, filtrados);
        return producto;
      }
    } catch (error) {
      console.log("ERROR en el método destroy()", error);
    }
  }
}

// función para probar la clase ProductsManager
// async function test() {
//   try {
//     const producto = new ProductsManager();

//     const producto1 = {
//       photo: "http://fotos.com/producto1.jpg",
//       title: "Lápiz en carboncillo #2",
//       category: "Papeleria",
//       price: 2000,
//       stock: 100
//     };
//     const producto2 = {
//       photo: "http://fotos.com/producto2.jpg",
//       title: "Sanguina #201",
//       category: "Papeleria",
//       price: 3000,
//       stock: 60
//     };
//     const producto3 = {
//       photo: "http://fotos.com/producto3.jpg",
//       title: "Pisapapeles clásico",
//       category: "Escritorio",
//       price: 1890,
//       stock: 78
//     };
//     const producto4 = {
//       photo: "http://fotos.com/producto4.jpg",
//       title: "Organizador de libros",
//       category: "Escritorio",
//       price: 3565,
//       stock: 23
//     };
//     const producto5 = {
//       photo: "http://fotos.com/producto5.jpg",
//       title: "Marcador colores varios",
//       category: "Papeleria",
//       price: 4380,
//       stock: 45
//     };
//     const producto6 = {
//       photo: "http://fotos.com/producto6.jpg",
//       title: "Cuadernos 100 hojas argollado",
//       category: "Papeleria",
//       price: 5500,
//       stock: 150
//     };
//     const producto7 = {
//       photo: "http://fotos.com/producto7.jpg",
//       title: "Diccionario Lengua española",
//       category: "Librería",
//       price: 9050,
//       stock: 25
//     };
//     const producto8 = {
//       photo: "http://fotos.com/producto8.jpg",
//       title: "Carpetas tamaño oficio",
//       category: "Papelería",
//       price: 3900,
//       stock: 50
//     };
//     const producto9 = {
//       photo: "http://fotos.com/producto9.jpg",
//       title: "Manual de convivencia escolar",
//       category: "Librería",
//       price: 5800,
//       stock: 20
//     };
//     const producto10 = {
//       photo: "http://fotos.com/producto10.jpg",
//       title: "Lapiceros punta fina",
//       category: "Utiles",
//       price: 2900,
//       stock: 100
//     };
//     await producto.create(producto1);
//     await producto.create(producto2);
//     await producto.create(producto3);
//     await producto.create(producto4);
//     await producto.create(producto5);
//     await producto.create(producto6);
//     await producto.create(producto7);
//     await producto.create(producto8);
//     await producto.create(producto9);
//     await producto.create(producto10);

//     const productosLista = await producto.read();
//     console.log("PRODUCTOS LISTA:", productosLista);

//     const testProducto = await producto.create({
//       title: "Producto de prueba",
//     });
//     console.log("ID testProducto:", testProducto.id);
//     const productoLeido = await producto.readOne(testProducto.id);
//     console.log("PRODUCTO LEIDO:", productoLeido); 
//     const productoEliminado = await producto.destroy(testProducto.id);
//     console.log("PRODUCTO ELIMINADO", productoEliminado);
//   } catch (error) {
//     console.log("ERROR en el TEST", error);
//   }
// }

// test();

const productsManager = new ProductsManager();
export default productsManager;