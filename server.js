import express, { response } from "express";
import usersManager from "./data/fs/UsersManager.js";
import productsManager from "./data/fs/ProductsManager.js";

// server
const server = express();
const port = 8080;
const ready = () => console.log("MUSIC VINILS SERVER ready on port", port);
server.listen(port, ready);

// middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// router
server.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      response: "MUSIC VINILS API",
      success: true,
    });
  } catch (error) {
    console.log();
    return res.status(500).json({
      response: "MUSIC VINILS API ERROR",
      success: false,
    });
  }
});

// router - users

// crear usuario
server.get("/api/users/:email/:password/:rol", async (req, res) => {
  try {
    const { email, password, rol } = req.params;
    const data = { email, password, rol };
    const user = await usersManager.create(data);
    if (user) {
      return res.status(201).json({
        response: user,
        success: true,
      });
    } else {
      const error = new Error("ERROR creando el usuario");
      error.statusCode = 500;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false
    })
  }
});

// leer todos y filtrar
server.get("/api/users", async (req, res) => {
  try {
    const { rol } = req.query;
    const allUsers = await usersManager.read(rol);
    if (allUsers) {
      return res.status(200).json({
        response: allUsers,
        rol: rol,
        success: true
      })
    } else {
      const error = new Error("NOT FOUND USERS WITH rol: " + rol);
      error.statusCode = 404;
      throw error
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false
    })
  }
})

// leer un usuario
server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await usersManager.readOne(uid);
    if (user) {
      return res.status(200).json({
        response: user,
        success: true
      })
    } else {
      const error = new Error("USER NOT EXIST. Id: " + uid);
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false
    })
  }
})

// eliminar un usuario
server.get("/api/users/delete/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const userDel = await usersManager.destroy(uid);
    if (userDel) {
      return res.status(200).json({
        response: userDel,
        success: true
      })
    } else {
      const error = new Error("USER NOT DELETED. Id: " + uid);
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false
    })
  }
})

// router - products
// crear producto
server.get("/api/products/:title/:author/:category/:language/:price/:stock/:type", async (req, res) => {
  try {
    const { title, author, category, language, price, stock, type } = req.params;
    const data = { title, author, category, language, price, stock, type };
    const product = await productsManager.create(data);
    if (product) {
      return res.status(201).json({
        response: product,
        success: true
      })
    } else {
      let error = new Error("ERROR product create");
      error.statusCode = 404
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false
    })
  }
})

