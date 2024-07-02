
const stripe=require('stripe')(process.env.STRIPE_PRIVATE_KEY)

import connectDb from '@/middleware/mongoose';
import orderModel from '@/models/order'
import { mongoose } from 'mongoose';
const createSession= async (req,res)=>{
  //CHECKS:

    // Checking if cart is not changed manually through semihacking
    
    //Checing if items are not out of stock 

    // checking if details are valid

//Initiating Order
var order= await new orderModel({
  orderId:req.body.orderDetails.orderId,
  email:req.body.orderDetails.email, 
  address:req.body.orderDetails.address,
  totalAmount:req.body.orderDetails.subTotal,
  address:req.body.orderDetails.address,
  products:req.body.cart,
  status:"Pending"
})
await order.save()


try {    
const session =await stripe.checkout.sessions.create({
payment_method_types:['card'],
mode:'payment',
line_items: req.body.cart.map(item => {
    return {
      price_data: {
        currency: "pkr",
        product_data: {
          name: `${item.name} - Size: ${item.size} - Variant: ${item.variant}`,
        },
        unit_amount: item.price * 100  // If the price is in rupees, convert it to paisa(single units)
      },
      quantity: item.qty  // Ensure you use qty, not quantity, as per your client-side code
    }
  }),
  success_url: `${process.env.NEXT_PUBLIC_HOST}/paymentSuccessfull`,
  cancel_url: `${process.env.NEXT_PUBLIC_HOST}/paymentUnsuccessfull`
  


})
res.json({url:session.url})


} catch (error) {
    res.status(500).json({error:error.message})
}

   
}
export default connectDb(createSession)