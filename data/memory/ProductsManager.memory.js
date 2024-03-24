class ProductsManager {
  static #products = [];

  create(data) {
    const producto = {
      id:
        ProductsManager.#products.length === 0
          ? 1
          : ProductsManager.#products[ProductsManager.#products.length - 1].id +
            1,
      photo: data.photo,
      title: data.title,
      category: data.category,
      price: data.price,
      stock: data.stock,
    };
    ProductsManager.#products.push(producto);
    console.log("Producto creado. Id: ", producto.id);
  }

  read() {
    return ProductsManager.#products;
  }
}

const producto1 = new ProductsManager;
producto1.create({
  photo: "http://fotos.com/producto1.jpg",
  title: "Lápiz en carboncillo #2",
  category: "Papeleria",
  price: 2000,
  stock: 100
});
producto1.create({
  photo: "http://fotos.com/producto2.jpg",
  title: "Sanguina #201",
  category: "Papeleria",
  price: 3000,
  stock: 60
});
producto1.create({
  photo: "http://fotos.com/producto3.jpg",
  title: "Pisapapeles clásico",
  category: "Escritorio",
  price: 1890,
  stock: 78
});
producto1.create({
  photo: "http://fotos.com/producto4.jpg",
  title: "Organizador de libros",
  category: "Escritorio",
  price: 3565,
  stock: 23
});
producto1.create({
  photo: "http://fotos.com/producto5.jpg",
  title: "Marcador colores varios",
  category: "Papeleria",
  price: 4380,
  stock: 45
});
producto1.create({
  photo: "http://fotos.com/producto6.jpg",
  title: "Cuadernos 100 hojas argollado",
  category: "Papeleria",
  price: 5500,
  stock: 150
});
producto1.create({
  photo: "http://fotos.com/producto7.jpg",
  title: "Diccionario Lengua española",
  category: "Librería",
  price: 9050,
  stock: 25
});
producto1.create({
  photo: "http://fotos.com/producto8.jpg",
  title: "Carpetas tamaño oficio",
  category: "Papelería",
  price: 3900,
  stock: 50
});
producto1.create({
  photo: "http://fotos.com/producto9.jpg",
  title: "Manual de convivencia escolar",
  category: "Librería",
  price: 5800,
  stock: 20
});
producto1.create({
  photo: "http://fotos.com/producto10.jpg",
  title: "Lapiceros punta fina",
  category: "Utiles",
  price: 2900,
  stock: 100
});
console.log(producto1.read());