import db from "./../app/db.js"

export async function getProducts(req, res) {
    try {
      const products = await db.collection("products").find({}).toArray();
      res.status(200).send(products);
    } catch (err) {
      res.status(401).send({ message: "Erro ao pegar produtos" });
    }
  }
  