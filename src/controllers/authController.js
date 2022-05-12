import db from "./../app/db.js"
import joi from "joi"
import {v4 as uuid} from "uuid"
import { ObjectId } from "mongodb"
import bcrypt from "bcrypt"

export async function signUp(req,res){
    
    const user = req.body; 
    const passwordHash = bcrypt.hashSync(user.password,parseInt(process.env.HASH));
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password:joi.string().alphanum().min(6).max(12).required(),
        confirmation:joi.ref("password")
    })

    const {error} = schema.validate(user,{abortEarly: false})

    if(error){
        res.status(422).send("Erro ao cadastrar")
        return 
    }

    try{
        const checkUser = await db.collection("users").findOne({email: user.email})
        console.log(checkUser)
        if(checkUser){
            return res.status(409).send("Usuário com esse email já existe")
        }
        delete user.confirmation
        await db.collection("users").insertOne({...user, password: passwordHash});
        res.status(201).send("Cadastro realizado com sucesso");
    }catch(e){
        console.error(e);
        res.status(500).send("Erro de conexão com servidor");
    }
}

export async function signIn(req,res){
    const {email, password} = req.body;
    try{
        const user = await db.collection("users").findOne({email});
        console.log(user , "   user")
        console.log(user._id)
        const userSessionExists = await db.collection("sessions").findOne({userId: new ObjectId(user._id)})
        console.log(userSessionExists)
        if(user && bcrypt.compareSync(password, user.password) && userSessionExists){
            const token = uuid(); 
            await db.collection("sessions").updateOne({userId:user._id},{$set:{token}})
            res.status(200).send({token, name:user.name});
        }
        else if(user && bcrypt.compareSync(password, user.password)){
            const token = uuid();            
            await db.collection("sessions").insertOne({userId:user._id, token})            
            res.status(200).send({token, name:user.name});
        }else{
            res.status(401).send("Erro ao logar");
        }
    }catch(e){
        console.error(e);
        res.status(500).send("Erro de conexão com servidor")
    }
}
