const sessionMiddleware = async (req, res, next) => {
  if (req.path !== "/") return next();

  if (!req.isAuthenticated()) {
    await res.redirect("/login");
    return
  }
  next();
};

export default sessionMiddleware;
