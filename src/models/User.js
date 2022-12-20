import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false } // Elimina el campo __v
);

// Middleware de mongoose, hashea la password antes de guardar el usuario
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

// agrega el metodo comparePassword al modelo User
// este metodo usa bcrypt para comparar la password ingresada con la hasheada
userSchema.methods.comparePassword = async function (password) {
  const user = this;

  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", userSchema, "users");

export default User;
