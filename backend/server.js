import express from 'express';
import dotenv from "dotenv";
import { connectDB } from '../config/db.js';
import Product from "./models/product.model.js"; 
import mongoose from 'mongoose';


dotenv.config();


const app=express();

app.use(express.json()); // allow us to accept JSON in tht req.body


app.get("/api/products",async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json({sucsess:true,data:products});
    }catch(error){
        console.log("Error in fetching products:",error.message);
        res.status(500).json({sucsess:false,message:"Server Error"});
    }
})

app.post("/api/products", async(req,res) => {

    const product =req.body; // user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({succsess:false,message:"Please provide all fields"});
    }

    const newProduct=new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success:true,data:newProduct})
    }catch(error){
        console.log("Error in create product: ",error.message)
        res.status(500).json({success:false,message:"server Error"});
    }
});

app.put("/api/products/:id", async(req,res)=>{
    const {id}=req.params;

    const product =req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"Invalid product id"});
    }

    try{
        const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true, data:updatedProduct});

    }catch(error){
        res.status(500).json({succes:false,message:"Server Error"});
    }
});


app.delete("/api/products/:id",async(req,res) =>{
    const {id}=req.params;

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({succsess:true,message:"Product deleted"});
    }
    catch(error){
        console.log("Error in deleting Products")
        res.status(404).json({success:false, message:"Product not found"});

    }


})


app.listen(5000, () =>{
    connectDB();
    console.log('server started at http://localhost:5000')

});
