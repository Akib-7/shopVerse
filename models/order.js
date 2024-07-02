const mongoose=require('mongoose');
const OrderSchema=mongoose.Schema({

email:{
    type:String,
    required:true
},
orderId:{
    type:String,
    required:true
}
,
// payment info given by payment gateway will be stored in here
paymentInfo:{  
    type:String,
    default:''
},
products:{
    type: Object,
    required:true
},
address:{
    type:String,
    required:true
},
totalAmount:{
    type:Number,
    required:true
},
status:{
    type:String,
    default:'Pending',
    required:true
}





},{timestamps:true})
// timestamps is the second arg of schema which will create updated at: , created at: fields
mongoose.models={} //The reaon for wriring this is given in model : product.js
const orderModel=mongoose.model("order",OrderSchema);
export default orderModel
