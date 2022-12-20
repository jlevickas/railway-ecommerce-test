import initServer from "./server.js";
import cluster from "cluster";
import os from "os";
import { SERVER_MODE } from "../config/config.js";

if (SERVER_MODE === "CLUSTER") {
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is runing`);

    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    initServer();
    console.log(`Worker ${process.pid} started`);
  }
} else {
  initServer();
}
