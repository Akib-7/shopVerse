import '@/styles/globals.css'
import Navbar from './../components/navbar';
import Footer from './../components/footer';
import { useState,useEffect } from 'react';
import  {useRouter}  from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'


export default function App({ Component, pageProps }) {

const [cart, setCart] = useState({})
const [subTotal, setSubTotal] = useState(0)
const [user, setUser] = useState({value:null})
const [key, setKey] = useState(0)
const router = useRouter()
const [progress, setProgress] = useState(0)


useEffect(() => {
  
  router.events.on('routeChangeStart',()=>{
    setProgress(50)
  } )
  router.events.on('routeChangeComplete',()=>{
    setProgress(100)
  } )
  var savedCart=localStorage.getItem('cart')// it will give you a string

  try {
    if(savedCart){

      setCart(JSON.parse(savedCart))// we are parsing the string into json for sending it to client side
      saveCart(JSON.parse(savedCart))
    }
  } catch (error) {
    console.error(error)
    localStorage.removeItem('cart')
  }
  const token=localStorage.getItem('authentication')

 if(token){
  setUser({value:token})
}
setKey(Math.random())
 
  
}, [router.query])


 

const handleLogout=()=>{
localStorage.removeItem("authentication")
setUser({value:null})
setKey(Math.random())
toast.success('You have been logged out', {
  position: "top-left",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  });
router.push('/login')
console.log("After Logout Token: "+localStorage.getItem("authentication"))
 }
 <ToastContainer
position="bottom-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
></ToastContainer>
// Saving the cart state i:e making it persistent

const saveCart=(myCart)=>{
localStorage.setItem('cart',JSON.stringify(myCart))
let total=0;
let keys=Object.keys(myCart)
for (let i = 0;i< keys.length;i++) {
  total+=myCart[keys[i]].price * myCart[keys[i]].qty;
  
}
setSubTotal(total);
}

//FUNCTION : Add to Cart 
const addToCart=(itemCode,qty,name,price,size,variant)=>{
let myCart=cart
if(itemCode in cart){
  myCart[itemCode].qty=cart[itemCode].qty +qty
}
else{
  myCart[itemCode]={qty,name,price,size,variant}
}
setCart(myCart)
saveCart(myCart)

}
const buyNowCart=(itemCode,qty,name,price,size,variant)=>{
 

 
  let myCart={itemCode:{qty:1,name,price,size,variant}}
  setCart(myCart)
 saveCart(myCart)
router.push('/checkout')
}

// FUNCTION :  Clearing Entire Cart
const clearCart=()=>{
  setCart({})// there in no guarantee if this statement will execute before the next statement so thats why we will run saveCart({}) with empty object so that it can update localStorage . Note that we are not writing saveCart(cart) after writing setCart({}) 
  saveCart({})
}


// FUNCTION : Remove from Cart Function
const removeFromCart=(itemCode,qty,name,price,size,variant)=>{
  let myCart=cart
  if(itemCode in cart){
    myCart[itemCode].qty=cart[itemCode].qty -qty
  }
 if(myCart[itemCode].qty <=0){
  //if we are accssing a field then we write it in "example" otherwise a variable is written as example i:e not in double qoutes
  delete myCart[itemCode]
 }

  setCart(myCart)
  saveCart(myCart)
  
  }

 
  return <>
        <LoadingBar
        color='#ED9818'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={6}
      />

   {key && <Navbar user={user}  handleLogout={ handleLogout}  cart={cart}  buyNowCart={buyNowCart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />}
   <Component user={user} cart={cart} buyNowCart={buyNowCart}  addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}  {...pageProps} />
   <Footer/></>
}
