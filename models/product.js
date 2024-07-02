import mongoose from 'mongoose';
const ProductSchema=mongoose.Schema({

title:{
    type:String,
    required:true
},
slug:{
    type:String,
    required:true,
    unique:true,
}
,
description:{
    type:String,
    required:true,

}
,
image:{
    type:String,
    required:true
},
category:{
    type:String,
    required:true,
  
},
size:{
    type:String,
    
},
color:{
    type:String,
    
},
price:{
    type:Number,
    required:true
    
},
availableQty:{
    type:Number,
    required:true
    
}
},{timestamps:true})
// timestamps is the second arg of schema which will create updated at: , created at: fields
mongoose.models={} //The reason we wrote thhis is given below
const productModel=mongoose.model("product",ProductSchema);
export default productModel;


// REASON:
// Singleton Pattern: Ensure that your model definitions follow the singleton pattern. When you define and compile a model, do so in a single file, and then export the compiled model. Whenever you need the model elsewhere in your application, import the already-compiled model.
//module.exports = mongoose.models.product || mongoose.model('product', productSchema);import { mongoose } from 'mongoose';


//The mongoose.models.product || mongoose.model('product', productSchema) part checks if the model is already compiled and uses it; otherwise, it compiles the model. This helps avoid the overwrite error.