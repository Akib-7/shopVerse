import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
   const router=useRouter();
    const[credentials,setCredentials]=useState({email:"",password:""})
   
     const handleSubmit= async (e)=>{
         e.preventDefault();
         const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
             method: "POST",
             headers: {
               "Content-Type": "application/json",    
             },
 
             body: JSON.stringify({email:credentials.email,password:credentials.password}),// body data type must match "Content-Type" header
           });
           const json= await response.json()
           console.log(json)
           if(json.success===true){
             
             //save the authentication token and redirect
             localStorage.setItem("authentication",json.authentication)
          
             // for Redirect we use useNavigate Hook
 // we are redirecting to "/" which is the HomePage url in our case . It can be any url i:e /about, /landingPage etc
        
            toast.success('Logged In Successfully', {
    position: "top-left",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    }); 
    setTimeout(() => {
        router.push('/')
    }, 1400);
 
                
                 
           }
           else{
            toast.warning('Invalid Credentials', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
           }
 
     }
 
     const handleOnChange=(e)=>{
         
         setCredentials({...credentials,[e.target.name]:e.target.value})
         
     }

  return (
<>
<ToastContainer
position="top-left"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
<div className="bg-white flex flex-col md:flex-row md:mb-14 md:mt-12">
  <div className="coloumn md:flex flex-col md:w-1/2 md:mt-40">
<div className="left w-full h-fit mt-6 flex items-center justify-center md:w-1/2 md:h-10 animate-bounce">
<a href="#" className=" flex items-center text-2xl font-semibold text-black900">
          
          <span className='md:text-6xl md:ml-[350px]'> ShopVerse</span> 
          <Image className="w-8 h-8 mr-2 md:w-16 md:h-16" width={128} height={135} src="/logo.png" alt="logo"/>   
      </a>
    
</div>
<div className='intro px-4 py-4 md:py-2 md:w-2/3 md:ml-[200px] md:mt-10 '>
<span className='block text-center text-xs font-semibold md:text-xl md:text-left ' >Navigate the galaxy of choices at ShopVerse, where every product is a star waiting to light up your lifestyle.</span>
</div>
</div>
  <div className=" RIGHT flex w-full items-center justify-center px-8 py-6 mx-auto md:px-0 md:mx-0 md:ml-10 md:w-[500px]">
     
      <div className="w-full bg-shadowColor rounded-lg shadow-2xl dow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                  Welcome Back
              </h1>
              <form onSubmit={handleSubmit} method='POST' className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Your email</label>
                      <input value={credentials.email} onChange={handleOnChange} type="email" name="email" id="email" className="bg-white border-gray-300  text-black sm:text-sm rounded-lg w-full p-2.5 border" placeholder="name@company.com" required={true}/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-black ">Password</label>
                      <input value={credentials.password} onChange={handleOnChange} type="password" name="password" id="password" className="bg-white border border-gray-300 text-black sm:text-sm rounded-lg  block w-full p-2.5" placeholder="••••••••" required={true}/>
                  </div>
                  <div className="flex items-center justify-end">
                      <a href="#" className="text-sm font-medium text-black hover:underline ">Forgot password?</a>
                  </div>
                  <button type="submit" className="w-full  bg-shiny  active:bg-amber-300  text-black px-5 py-2.5 text-center font-bold text-lg hover:bg-amber-400 transition ease-in duration-400">Log in</button>
                  <p className="text-sm font-semibold text-black rounded-sm">
                      Don’t have an account yet? 
                      <Link legacyBehavior href="/signup"> 
                      <a>
                        
                      <span  className="font-lg text-shiny hover:underline mx-2 font-semibold">Sign up
                      </span>
                      </a>
                      </Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</div>
</>
  )
}

export default Login