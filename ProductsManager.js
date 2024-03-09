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
  category: "Utiles",
  price: 2000,
  stock: 100
});
producto1.create({
  photo: "http://fotos.com/producto2.jpg",
  title: "Sanguina #201",
  category: "Utiles",
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
  category: "Utiles",
  price: 4260,
  stock: 45
});
console.log(producto1.read());