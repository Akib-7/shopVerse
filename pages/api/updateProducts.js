
import productModel from "@/models/product"
import connectDb from "@/middleware/mongoose"
const updateProducts =async (req,res)=>{

try {

for (let i = 0; i < req.body.length; i++) {

    var updateP=await productModel.findByIdAndUpdate(req.body[i]._id,req.body[i])//Note that it is _id not id
}
res.status(200).json({success:'successfully Updated'})
    


    
} catch (error) {
    console.error(error)
}

}
export default connectDb(updateProducts)