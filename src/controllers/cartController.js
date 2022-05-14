import { ObjectId } from "mongodb"
import db from "../app/db.js"

export async function getCart(req, res){
    try{
        res.status(200).send(res.locals.cart)
    }catch(e){
        res.sendStatus(404)
    }
}

export async function deleteProduct(req, res){
    const product = await db.collection("cart").findOne({
        idProduct: ObjectId(req.params) 
    }) 
    if(product && product.quantity > 1){
        await db.collection("cart").updateOne({
            idProduct: ObjectId(req.params)}, 
        {
        $set:{ quantity: product.quantity - 1
        }
        })
    }
    else if(product && product.quantity <= 1){
        await db.collection("cart").deleteOne({
            idProduct: ObjectId(req.params) 
        })
    }
}

export async function addProduct(req, res){
    const product = await db.collection("cart").findOne({
        idProduct: ObjectId(req.params) 
    }) 
    if(product){
    await db.collection("cart").updateOne({
        idProduct: ObjectId(req.params)}, 
     {
       $set:{ quantity: product.quantity + 1
       }
    })
}
}

export async function finalizePurchase(req, res){
    const allUserProducts = res.locals.cart
    await db.collection("cart").deleteMany({
        allUserProducts
    })
}