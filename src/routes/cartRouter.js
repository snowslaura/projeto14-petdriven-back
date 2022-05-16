import { addProduct, deleteProduct, getCart, finalizePurchase } from "../controllers/cartController.js"
import { Router } from "express"
import { validateToken } from "../middlewares/authMiddlewares.js"
import { findCart } from "../middlewares/cartMiddlewares.js"

const cartRouter = Router()
cartRouter.get("/cart", validateToken, findCart, getCart)
cartRouter.put("/cart/:id", validateToken ,deleteProduct)
cartRouter.post("/cart/:id", validateToken,addProduct)
cartRouter.post("/checkout", validateToken, findCart ,finalizePurchase)

export default cartRouter