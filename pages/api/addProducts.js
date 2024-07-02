// This api will not be public. Not everyone can add a product
import productModel from "@/models/product"
import connectDb from "@/middleware/mongoose"

const addProducts =async (req,res)=>{

for (let i = 0; i < req.body.length; i++) {
    
   var product= await productModel.create({
    
    title:req.body[i].title,
    slug:req.body[i].slug,
    description:req.body[i].description,
    image:req.body[i].image,
    category:req.body[i].category,
    size:req.body[i].size,
    color:req.body[i].color,
    price:req.body[i].price, 
    availableQty:req.body[i].availableQty,   

})


    
}
res.status(200).json({success:'Product added Successfully'})




}
export default connectDb(addProducts)