import db from "../app/db.js"
import { ObjectId } from "mongodb"

export async function findCart(req,res,next){
    try{
        const products = await db.collection("cart").find({
            idUser: new ObjectId(res.locals.user._id)
        }).toArray()

        res.locals.cart = products
    }catch(e){
        res.sendStatus(404)
    }

    next()
}