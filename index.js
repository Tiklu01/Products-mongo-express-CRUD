import mongoose from 'mongoose';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Product from "./models/product.js";
import methodOverride from 'method-override';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
// Connect to MongoDB
const main = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

main();

// ES Module-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set views directory and view engine
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/products',async(req,res)=>{
  const products = await Product.find({})
  // console.log(products)
  res.render('products/index',{products})
})

app.get('/products/new', (req, res) => {
  res.render('products/new');
});
app.post('/products',async(req,res)=>{
const newProduct = new Product(req.body)
await newProduct.save()
res.redirect('/products')
})


app.get('/products/:id', async(req,res)=>{
  const {id} = req.params
  const product = await Product.findById(id)
  
  res.render('products/show',{product})
})
app.get('/products/:id/edit', async(req,res)=>{
  const {id} = req.params
  const product = await Product.findById(id)
  res.render('products/edit',{product})
})
app.put('/products/:id',async(req,res)=>{
  const {id} = req.params
  const product =  await Product.findByIdAndUpdate(id,req.body,{runValidators:true, new:true})
  res.redirect(`/products/${product.id}`)
})

app.delete('/products/:id',async(req,res)=>{
  const {id} = req.params
  await Product.findByIdAndDelete(id)
  res.redirect("/products")
})



// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
