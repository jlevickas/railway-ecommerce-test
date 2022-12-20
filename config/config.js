import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const SESSION_ID_SECRET = process.env.SESSION_ID_SECRET;

import yargs from "yargs";

const args = yargs(process.argv.slice(2))
  .default({
    PORT: 8080,
    SERVER_MODE: "FORK",
  })
  .alias({
    PORT: "p",
    SERVER_MODE: "m",
  }).argv;

const PORT = args.PORT;

const SERVER_MODE = args.SERVER_MODE;

export { MONGO_URI, SESSION_ID_SECRET, PORT, SERVER_MODE };
