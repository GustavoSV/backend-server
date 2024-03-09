class UsersManager {
  static #users = [];
  
  create(data) {
    const usuario = {
      id:
        (UsersManager.#users.length === 0)
          ? 1
          : UsersManager.#users[UsersManager.#users.length - 1].id + 1,
      foto: data.foto,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    UsersManager.#users.push(usuario);
    console.log("Usuario creado. Id: ", usuario.id);
  }

  read() {
    return UsersManager.#users;
  }
}

const usuario1 = new UsersManager;
usuario1.create({
  foto: "http://misfotos/fotoGustavo.jpg",
  email: "gustavo@gus.com",
  password: "usuario123",
  role: 0
})
usuario1.create({
  foto: "http://misfotos.com/fotoGustavo.jpg",
  email: "gus@gus.com",
  password: "user123",
  role: 0
})
console.log(usuario1.read());