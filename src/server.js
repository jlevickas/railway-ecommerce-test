import express from "express";
import { Server as HttpServer } from "http";
import handlebars from "express-handlebars";
import pino from "pino";
import pinoPretty from "pino-pretty";
import compression from "compression";
import fs from "fs";

import passport from "./utils/passportLocalAuth.js";
import initSocketIO from "./utils/socketConnect.js";
import sessionMiddleware from "./middleware/session.middleware.js";
import sessionHandler from "./utils/sessionHandler.js";
import sessionRouter from "./routes/session.routes.js";
import productosRouter from "./routes/productos.routes.js";
import mongoConnection from "./db/mongodbConnection.js";
import infoRouter from "./routes/info.routes.js";
import randomsRouter from "./routes/randoms.routes.js";

import { PORT } from "../config/config.js";

const initServer = () => {
  const app = express();
  const httpServer = new HttpServer(app);

  const streams = [
    { level: "info", stream: process.stdout },
    { level: "warn", stream: fs.createWriteStream("./logs/warn.log") },
    { level: "error", stream: fs.createWriteStream("./logs/error.log") },
  ];

  const logger = pino(
    {
      prettifier: pinoPretty(),
      level: "info",
    },
    pino.multistream(streams)
  );

  mongoConnection();

  app.engine(
    "hbs",
    handlebars.engine({
      extname: ".hbs",
      defaultLayout: "index.hbs",
    })
  );
  app.set("view engine", "hbs");
  app.set("views", "./src/views");

  app.use(compression());
  app.use(sessionHandler);

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(sessionMiddleware);

  app.use((req, res, next) => {
    logger.info(`Request ${req.method} ${req.url}`);
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", express.static("public"));

  try {
    app.use("/api", productosRouter);
    initSocketIO(httpServer);
  } catch (err) {
    logger.error(err);
  }

  app.use("/", sessionRouter);
  app.use("/info", infoRouter);
  app.use("/api/randoms", randomsRouter);

  app.all("*", (req, res, next) => {
    logger.warn(`404 ${req.method} ${req.url}`);
    res.status(404).json({ error: "404 not found" });
  });

  const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
  });

  connectedServer.on("error", (error) =>
    console.log(`Error en servidor ${error}`)
  );

  return connectedServer;
};

export default initServer;
