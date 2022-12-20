const login = async (req, res) => {
  const email = await req.body.email;
  req.session.email = email;
  return res.redirect("/");
};

const loginForm = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  } else {
    return res.render("login");
  }};

const failLogin = async (req, res) => {
  return res.render("login", { error: "Usuario o contraseña incorrectos" });
};



const loggedUser = async (req, res) => {
  return res.send(req.session.email);
};

const logout = async (req, res) => {
  const email = await req.session.email;
  await req.session.destroy();

  res.render("logout-screen", { email });
};



const registerForm = async (req, res) => {
  return res.render("register");
};

const register = async (req, res) => {
  return res.redirect("/login");
};

const failRegister = async (req, res) => {
  return res.render("register", { error: "Usuario ya registrado" });
};

export { login, loginForm, loggedUser, logout, register, registerForm, failLogin, failRegister };
