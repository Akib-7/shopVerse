
var bcrypt = require('bcryptjs');//FOR Hashing of Password
import connectDb from "@/middleware/mongoose"
import userModel from "@/models/user"
var jwt = require('jsonwebtoken');// For User Session Record



var login= async (req,res)=>{
    var success=false;

//STEPS
//1: Finding user through email because email is unique
const {email,password}=req.body

    
try{
var userData= await userModel.findOne({email})
   
    
    if(!userData){
        
        res.json(success,'INVALID EMAIL')
        
    }
   
        var verifyPassword= await bcrypt.compare(password,userData.password)// Returns TRUE or FALSE
        // console.log("VERIFY PASSWORD VALUE: "+verifyPassword)
        if(!verifyPassword){
            
            res.json(success,'Invalid Credentials inside PASSWORD')
        }
        else{
           
            var payload={user:userData}
    var token=jwt.sign(payload,process.env.JWT_SECRET)
    var success=true;
    res.json({success,authentication:token})

   // console.log('USER ID'+userData.id)
    console.log('Logged In successfully' )
    
    //console.log(token)
        }
        
    

    } catch (error) {
    console.log(error)
    res.status(500).json('Internal Server Error')
    }


    }
    export default connectDb(login)