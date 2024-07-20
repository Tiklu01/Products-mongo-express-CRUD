import mongoose from "mongoose";
import Product from "./models/product.js";
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
  console.log("Connected")
}

const seedsData = [
    {
        name: "Apple",
        price: 2.99,
        category: 'fruit'
    },
    {
        name: "carrot",
        price: 0.99,
        category: 'vegetable'
    },
    {
        name: "Milk",
        price: 1.99,
        category: 'dairy'
    },
]

Product.insertMany(seedsData)
.then(res=>{
    console.log(res)
})
.catch(e=>{
    console.log(e)
})