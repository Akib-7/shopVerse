var jwt = require('jsonwebtoken');
//const JWT_Secret='2137y217gdb*hskb@'// This should be placed in an ENVIRONMENT variable
const secretKey='IamAkib'

var checkLogin=(req,res,next)=>{
    // if (req.session.user){ next()}   else{res.json(Login First)}
        var token=req.headers.authentication
    
   
        if(!token){
            res.json('Login First')
        }
        else{
            //token=token.split(' ')[1]
           

            try{
            var data=jwt.verify(token,secretKey)
            req.user=data.user
            
            next()
            }
            catch(error){
                res.json(error)
              //  console.log("USER DATA IN CATCH BLOCK:  "+req.user.email)
            }
        }
        
    }
    module.exports = {checkLogin}