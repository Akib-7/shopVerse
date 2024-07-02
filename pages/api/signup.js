// This api will not be public. Not everyone can add a product

import connectDb from "@/middleware/mongoose"
import userModel from "@/models/user"
var bcrypt = require('bcryptjs');//FOR Hashing of Password
// This should be placed in an ENVIRONMENT variable


const createUser =async (req,res)=>{


  
userModel.findOne({email:req.body.email}).then((data)=>{
    var success="false";
    if(data){
        try {
        
            res.json({success,message:"SAME EMAIL FOUND Inside TRY"})
    } catch (error) {
    
        res.status(500).json({success,message:"SAME EMAIL FOUND Inside CATCH"})
        }

    }
    
    else{
        success=true;
    // If its a valid email then we will process
    //Using promises we will check and move forward

    // 1-Generating Salt
    try {
        
    
        bcrypt.genSalt(10).then((data)=>{

          //  console.log('PASSWORD: '+req.body.password)// Original Password
          //  console.log('Inside GEN SALT: '+data)// Password's Salt
            
            return data;
            
        }).then((data)=>{
            // 2- Generating hash and combining it with salt
            return bcrypt.hash(req.body.password,data)
            
            
        }).then(data=>{
            //Now variable "data" has the final secured password with salt+hash

            //console.log('INSIDE SECURE PASS: '+data)
            var securePassword=data;
            userModel.create({
                name:req.body.name,
                password:securePassword, // assigning the secured password to password field
                email:req.body.email,
            }).then((data)=>{
               
               // res.end('Account Created Successfully')
                res.json({success,message:"Account Created Successfully"})// It is the data that the user entered
               }).catch(err=>{
                res.json(err)
               })  

        })
    } catch (error) {
    
        res.status(500).json('Internal Server Error')
        }
      
    }
  })

}
export default connectDb(createUser)