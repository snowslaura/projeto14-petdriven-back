import { ObjectId } from "mongodb";
import db from "./../app/db.js"

export async function getProduct(req,res){    
    const {id} = req.params
    try{        
        const product = await db.collection("products").findOne({_id: ObjectId(id)})
        if(product){            
            res.status(200).send(product)
        }else{            
            res.status(404).send("Produto não encontrado ou não está disponível")
        }
    }catch(e){
        console.error(e);
        res.status(500).send("Erro ao conectar ao servidor");
    }
}

export async function postProductOnCart(req,res){   
    const {id} = req.params
    try{        
        const product = await db.collection("products").findOne({_id: new ObjectId(id)})
        if(product){ 
            const productAlredySelect = await db.collection("cart").findOne({idUser: user._id, idProduct:product._id})
            if(productAlredySelect){
                await db.collection("cart").updateOne({
                    idUser: user._id, idProduct:product._id
                },{quantity: productAlredySelect.quantity + 1})
            }
            else{
                await db.collection("cart").insertOne({idUser: user._id, idProduct:product._id, quantity: 1})
            }
            res.send("Produto adicionado ao carrinho").status(200)
        }else{
            res.status(404).send("Produto não encontrado ou não disponível")
        }
    }catch(e){
        console.error(e);
        res.status(500).send("Erro ao conectar ao servidor");
    }
}
