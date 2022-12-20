import { Server as Socket } from "socket.io";
import normalizarMensajes from "./messageNormalizer.js";
import Product from "../models/Product.js";
import Message from "../models/Message.js";

const initSocketIO = (server) => {
  const io = new Socket(server);

  io.on("connection", async (socket) => {
    console.log("New client connected!");

    sendProductList(socket);
    handleUpdateEvents(socket);
    sendNormalizedMessageList(socket);
    handleNewMessageEvents(socket);
  });

  return io;
};

// Send a list of products to the client
const sendProductList = async (socket) => {
  socket.emit("productos", await Product.find());
};

// Handle update events
const handleUpdateEvents = (socket) => {
  socket.on("update", async (product) => {
    // Create a new product object and save it
    const updatedProduct = new Product(product);
    await updatedProduct.save();

    // Emit a list of updated products to all clients
    io.sockets.emit("productos", await Product.find());
  });
};

// Send a list of normalized messages to the client
const sendNormalizedMessageList = async (socket) => {
  socket.emit("mensajes", await listNormalizedMessages());
};

// Handle new message events
const handleNewMessageEvents = (socket) => {
  socket.on("nuevoMensaje", async (data) => {
    // Create a new message object
    const message = { data };

    // Save the message
    const newMessage = new Message(message);
    newMessage.id = (await Message.countDocuments()) + 1;
    newMessage.save();

    // Emit a list of updated messages to all clients
    io.sockets.emit("mensajes", await listNormalizedMessages());
  });
};

// Get a list of normalized messages
const listNormalizedMessages = async () => {
  const mensajes = await Message.find().lean();
  const normalizedMessages = normalizarMensajes({ id: "mensajes", mensajes });
  return normalizedMessages;
};

export default initSocketIO;
