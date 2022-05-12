import db from "./../app/db.js"

export async function getProducts(req, res) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ message: "Token não encontrado" });
  
    try {
      const products = await db.collection("products").find({}).toArray();
      res.status(200).send(products);
    } catch (err) {
      res.status(401).send({ message: "Erro ao pegar produtos" });
    }
  }

  export async function getCategory(req, res) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ message: "Token não encontrado" });
  
    const { type } = req.params;
  
    try {
      const category = await db.collection("products").find({ type }).toArray();
      res.status(200).send(category);
    } catch (err) {
      res.status(401).send({ message: "Erro ao pegar produtos da categoria" });
    }
  }