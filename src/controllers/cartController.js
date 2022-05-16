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
    try{
    const product = await db.collection("cart").findOne({
        idProduct: ObjectId(req.params),
        idUser: res.locals.user._id
    }) 
    if(product && product.quantity > 1){
        await db.collection("cart").updateOne({
            idProduct: ObjectId(req.params),
            idUser: res.locals.user._id}, 
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
    res.sendStatus(200)
    }catch(e){
        res.status(401).send("Não foi possível remover o produto")
    }
}

export async function addProduct(req, res){
    try{
    const product = await db.collection("cart").findOne({
        idProduct: ObjectId(req.params),
        idUser: res.locals.user._id
    }) 
    if(product){
        await db.collection("cart").updateOne({
            idProduct: ObjectId(req.params),
            idUser: res.locals.user._id}, 
        {
        $set:{ quantity: product.quantity + 1}
        })    
    }
    res.sendStatus(200)
    }catch(e){
        res.status(401).send("Não foi possível adicionar o produto")
    }
}

export async function finalizePurchase(req, res){
    const allUserProducts = res.locals.cart
    const payment = req.body
    try{
    await db.collection("cart").deleteMany({
        idUser: allUserProducts[0].idUser
    })
    await db.collection("sales").insertOne({
        allUserProducts,
        total: payment.total,
        payment: payment.payment
    })
    }catch(e){
        res.status(404).send("Carrinho vazio")
    }
}