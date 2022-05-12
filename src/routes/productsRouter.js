import { Router } from "express";
import {
  getCategory,
  getProducts,
} from "./../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/products", getProducts);
productsRouter.get("/products/:type", getCategory);

export default productsRouter;