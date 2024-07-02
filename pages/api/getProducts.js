// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// This api is public. Everyone can get products

import productModel from "@/models/product"
import connectDb from "@/middleware/mongoose"
import tShirts from "../tShirts"

const getProducts= async (req,res)=>{
    
var products =await productModel.find({title:"Santa Monica "})



res.status(200).json(products)




}

//   We are inserting getProducts in connect db so that if there is no connection before ... it will make the connection through connectDb function in mongoose.json
export default connectDb(getProducts)