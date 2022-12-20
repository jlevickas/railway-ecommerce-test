import MongoStore from "connect-mongo";
import session from "express-session";

import { SESSION_ID_SECRET, MONGO_URI } from "../../config/config.js";

const sessionHandler = session({
  secret: SESSION_ID_SECRET,
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 1000 * 60 * 10 }, // 10 minutos
});

export default sessionHandler;
