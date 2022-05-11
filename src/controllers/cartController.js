import { ObjectId } from "mongodb"
import db from "../app/db.js"

export async function getCart(req, res){
    try{
        res.send(res.locals.cart).status(200)
    }catch(e){
        res.sendStatus(404)
    }
}

export async function deleteProduct(req, res){
    try{
        const deleteProduct = req.body
        await db.collection("cart").deleteOne({
            _id: new ObjectId(deleteProduct.id)
        })
        res.sendStatus(200)
    }catch(e){
        res.sendStatus(500)
    }
}

export async function addProduct(req, res){
    try{
        const addProduct = req.body
        const product = await db.collection("cart").findOne({
            _id: new ObjectId(addProduct.id)
        })
        await db.collection("cart").insertOne({product})
        res.sendStatus(200)
    }catch(e){
        res.sendStatus(500)
    }

}