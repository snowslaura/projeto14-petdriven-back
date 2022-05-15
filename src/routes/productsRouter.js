import { Router } from "express";
import { validateToken } from "../middlewares/authMiddlewares.js"
import { getProducts, logOut } from "./../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/home", validateToken, getProducts);

productsRouter.put("/home", logOut);

export default productsRouter;