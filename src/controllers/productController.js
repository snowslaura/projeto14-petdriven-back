import { ObjectId } from "mongodb";
import db from "./../app/db.js"

export async function getProduct(req,res){    
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ','');
    const {id} = req.params
    try{
        const session = await db.collection("sessions").findOne({token})
        const user = await db.collection("users").findOne({_id: session.userId })
        const product = await db.collection("products").findOne({_id: new ObjectId(id)})
        if(product){            
            res.send(product).status(200)
        }else{
            res.send("Produto não encontrado ou não está disponível").status(404)
        }
    }catch(e){
        console.error(e);
        res.send("Erro ao conectar ao servidor").status(500);
    }
}

export async function postProductOnCart(req,res){    
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ','');
    const {id} = req.params
    try{
        const session = await db.collection("sessions").findOne({token})
        const user = await db.collection("users").findOne({_id: session.userId })
        const product = await db.collection("products").findOne({_id: new ObjectId(id)})        
        if(product){ 
            await db.collection("cart").insertOne({idUser: user._id, idProduct:product._id})           
            res.send("Produto adicionado ao carrinho").status(200)
        }else{
            res.send("Produto não encontrado ou não disponível").status(404)
        }
    }catch(e){
        console.error(e);
        res.send("Erro ao conectar ao servidor").status(500);
    }
}
