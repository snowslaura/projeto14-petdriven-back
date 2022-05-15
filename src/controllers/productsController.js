import { ObjectId } from "mongodb";
import db from "./../app/db.js"

export async function getProducts(req, res) {
  try {
    const products = await db.collection("products").find({}).toArray();
    res.status(200).send(products);
  } catch (err) {
    res.status(401).send({ message: "Erro ao pegar produtos" });
  }
}

export async function logOut(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await db.collection("sessions").findOne({ token });
    const user = await db.collection("users").findOne({ _id: session.userId });
    await db
      .collection("sessions")
      .updateOne({ userId: new ObjectId(user._id) }, { $set: { token: "" } });
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}
  