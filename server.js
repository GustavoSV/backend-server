import express from "express";

// server
const server = express();
const port = 8080;
const ready = () => console.log("BACKEND SERVER ready on port", port);
server.listen(port, ready);

// middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// routes - users


// routes - products