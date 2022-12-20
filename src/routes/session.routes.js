import { Router } from "express";
import {
  login,
  loginForm,
  loggedUser,
  logout,
  register,
  registerForm,
  failLogin,
  failRegister
} from "../controllers/session.controller.js";
import passport from "../utils/passportLocalAuth.js";

const sessionRouter = Router();

sessionRouter.get("/fail-login", failLogin);
sessionRouter.get("/fail-register", failRegister);
sessionRouter.get("/login", loginForm);
sessionRouter.get("/logout", logout);
sessionRouter.get("/logged-user", loggedUser);
sessionRouter.get("/register", registerForm);
sessionRouter.post("/login", passport.authenticate("login", {failureRedirect: "/fail-login"}), login);
sessionRouter.post("/register", passport.authenticate("register", {failureRedirect: "/fail-register"}), register);


export default sessionRouter;
