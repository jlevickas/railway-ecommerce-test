import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    data: {
      author: {
        email: {
          type: String,
          required: true,
        },
        nombre: {
          type: String,
          required: true,
        },
        apellido: {
          type: String,
          required: true,
        },
        edad: {
          type: Number,
          required: true,
        },
        alias: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
          required: true,
        },
      },
      text: {
        type: String,
        required: true,
      },
      fyh: {
        type: String,
        default: new Date().toLocaleString(),
      },
    },
    id: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const Message = mongoose.model("Message", messageSchema, "mensajes");

export default Message;
