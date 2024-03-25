import fs from "fs";
import crypto from "crypto";


class UsersManager {
  constructor() {
    this.path = "./data/fs/files/users.json";
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
        throw new Error("NO HAY datos para crear el Usuario");
      } else {
        if (!data.email || data.email === "") {
          throw new Error("NO se ha incluído el email del usuario");
        } else {
          const usuario = {
            id: crypto.randomBytes(12).toString("hex"),
            photo: data.photo || "https://cdn-icons-png.flaticon.com/512/2919/2919600.png",
            email: data.email,
            password: data.password || "",
            rol: data.rol || 0,
          };
          let archivo = await fs.promises.readFile(this.path, "utf-8");
          archivo = JSON.parse(archivo);
          archivo.push(usuario);
          archivo = JSON.stringify(archivo, null, 2);
          await fs.promises.writeFile(this.path, archivo);
          console.log("nuevo Usuario creado con éxito", { create: usuario.id });
          return usuario;
        }
      }
    } catch (error) {
      console.log("ERROR método create()", error);
      return null;
    }
  }

  async read(rol) {
    try {
      let archivo = await fs.promises.readFile(this.path, "utf-8");
      archivo = JSON.parse(archivo);
      rol && (archivo = archivo.filter((each) => each.rol === rol));
      if (archivo.length === 0) {
        return null;
      } else {
        return archivo;
      }
    } catch (error) {
      console.log("ERROR método read()", error);
      return null;
    }
  }

  async readOne(id) {
    try {
      let archivo = await fs.promises.readFile(this.path, "utf-8");
      archivo = JSON.parse(archivo);
      const usuario = archivo.find((each) => each.id === id);
      if (!usuario) {
        throw new Error("NO se encontró el usuario ", id)
      } else {
        return usuario;
      }
    } catch (error) {
      console.log("ERROR en el método readOne()", error);
    }
  }

  async destroy(id) {
    try {
      let archivo = await fs.promises.readFile(this.path, "utf-8");
      archivo = JSON.parse(archivo);
      const usuario = archivo.find((each) => each.id === id)
      if (!usuario) {
        throw new Error("DESTROY NO se encontró el usuario", id);
      } else {
        let filtrados = archivo.filter((each) => each.id !== id);
        filtrados = JSON.stringify(filtrados, null, 2);
        await fs.promises.writeFile(this.path, filtrados);
        return usuario;
      }
    } catch (error) {
      console.log("ERROR en el método destroy()", error);
    }
  }
}

// función para probar la clase UsersManager
// async function test() {
//   try {
//     const usuario = new UsersManager();

//     const usuario1 = {
//       email: "rebeca@usuarios.com",
//       password: "usuario123",
//       role: 0
//     };
//     const usuario2 = {
//       email: "maria@usuarios.com",
//       password: "clave123",
//       rol: 1
//     };
//     const usuario3 = {
//       email: "gustavo@usuarios.com",
//       password: "clave123",
//       rol: 0
//     };
//     const usuario4 = {
//       email: "augusto@usuarios.com",
//       password: "usuario123",
//       rol: 1
//     };
//     await usuario.create(usuario1);
//     await usuario.create(usuario2);
//     await usuario.create(usuario3);
//     await usuario.create(usuario4);

//     const usuariosLista = await usuario.read();
//     console.log("USUARIOS LISTA:", usuariosLista);

//     const testUsuario = await usuario.create({
//       email: "pruebas@usuarios.com",
//       password: "pruebas123",
//       rol: 2
//     });
//     console.log("ID testUsuario:", testUsuario.id);
//     const usuarioLeido = await usuario.readOne(testUsuario.id);
//     console.log("USUARIO LEIDO:", usuarioLeido); 
//     const usuarioEliminado = await usuario.destroy(testUsuario.id);
//     console.log("USUARIO ELIMINADO", usuarioEliminado);
//   } catch (error) {
//     console.log("ERROR en el TEST", error);
//   }
// }

// // test();

const usersManager = new UsersManager();
export default usersManager; 
