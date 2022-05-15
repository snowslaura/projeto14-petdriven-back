import db from "../app/db.js"

export async function findCart(req,res,next){
    try{
        const products = await db.collection("cart").find({
            idUser: res.locals.user._id
        }).toArray()

        res.locals.cart = products
    }catch(e){
        res.sendStatus(404)
    }

    next()
}