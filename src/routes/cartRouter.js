import { addProduct, deleteProduct, getCart } from "../controllers/cartController.js"
import { Router } from "express"
import { validateToken } from "../middlewares/authMiddlewares.js"
import { findCart } from "../middlewares/cartMiddlewares.js"

const cartRouter = Router()
cartRouter.get("/cart", validateToken, findCart, getCart)
cartRouter.delete("/cart", deleteProduct)
cartRouter.post("/cart", addProduct)

export default cartRouter