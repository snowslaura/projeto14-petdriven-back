import { Router } from "express"

import { getProduct, postProductOnCart } from "../controllers/productController.js";
import {validateToken} from "./../middlewares/authMiddlewares.js"

const productRouter = Router();

productRouter.get("/product/:id", validateToken, getProduct);

productRouter.post("/product/:id", validateToken, postProductOnCart);

export default productRouter;