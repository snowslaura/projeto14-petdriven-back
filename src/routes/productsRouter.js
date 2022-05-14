import { Router } from "express";
import { validateToken } from "../middlewares/authMiddlewares.js"
import { getProducts } from "./../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/home", getProducts);

//productsRouter.get("/home", validateToken, getProducts);

export default productsRouter;