import mongoose from "mongoose";
import Product from "../models/product.model.js";


export const getProduct =async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json({sucsess:true,data:products});
    }catch(error){
        console.log("Error in fetching products:",error.message);
        res.status(500).json({sucsess:false,message:"Server Error"});
    }
};


export const createProduct=async(req,res) => {

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
};

export const updateProduct=async(req,res)=>{
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
};

export const deleteProduct=async(req,res) =>{
    const {id}=req.params;

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({succsess:true,message:"Product deleted"});
    }
    catch(error){
        console.log("Error in deleting product:", error.message); 
        res.status(404).json({success:false, message:"Product not found"});

    }


};