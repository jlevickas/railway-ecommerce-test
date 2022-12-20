import os from "os";
import { PORT } from "../../config/config.js";

const infoController = (req, res) => {
  const info = {
    args: process.argv.slice(2),
    os: process.platform,
    nodeVersion: process.version,
    rss: process.memoryUsage().rss,
    execPath: process.execPath,
    processId: process.pid,
    directoryPath: process.cwd(),
    processors: os.cpus().length,
    port: PORT,
  };

  res.render("info", { info });
};

export default infoController;
