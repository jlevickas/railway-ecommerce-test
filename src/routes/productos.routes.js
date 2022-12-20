import { Router } from "express";
import { listMockProducts } from "../controllers/productos.controller.js";

const productosRouter = Router();

productosRouter.get("/productos-test", listMockProducts);

export default productosRouter;
