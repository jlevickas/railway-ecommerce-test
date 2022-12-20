import { fork } from "child_process";
import { PORT } from "../../config/config.js";

const randomsController = (req, res) => {
  const cantidadRandoms = req.query.cant || 100000000;

  const forked = fork("./src/utils/computeRandomNumbers.js");
  forked.on("message", (msg) => {
    if (msg == "ready") {
      forked.send(cantidadRandoms);
    } else {
      const randoms = msg;
      randoms.port = PORT;
      res.render("randoms", { randoms });
    }
  });
};

export default randomsController;
