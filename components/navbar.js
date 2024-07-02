import Link from 'next/link';
import React from 'react';
import  { useRef,useState } from 'react'
import{AiFillCloseCircle,AiFillPlusCircle,AiFillMinusCircle} from 'react-icons/ai'
import{BsFillBagCheckFill,BsFillTrash3Fill,BsSearch,BsPersonCircle,BsPersonVcard} from 'react-icons/bs'
import{GiShoppingCart} from 'react-icons/gi'
import {LuLogOut} from 'react-icons/lu'
import {TbTruckDelivery} from 'react-icons/tb'


import Image from 'next/image'

const Navbar = ({ handleLogout,user,cart,addToCart,removeFromCart,clearCart,subTotal}) => {

  // console.log(cart,addToCart,removeFromCart,clearCart,subTotal)// TESTING if the functions are received correctly
  const [dropDown, setDropDown] = useState(null)
 

  const toggleCart=()=>{
if(cartref.current.classList.contains('translate-x-full')){
  cartref.current.classList.remove('translate-x-full')
  cartref.current.classList.add('translate-x-0')
}
else if(!cartref.current.classList.contains('translate-x-full')){
  cartref.current.classList.remove('translate-x-0')
  cartref.current.classList.add('translate-x-full')
}
  }
  const cartref = useRef()// you can access the element which have ref={cartref} in this case its cart side bar
 

  
  return (
    
    <div className='Navbar s shadow-md py-4 md:py-4 flex justify-between'>

{/*SECTION:1 Hamburger and Search Icon  */}
<div className=" HamBurger & SearchIcon mb-[1px] flex items-center md:order-2">
{/* <!-- HamBurger --> */}
        <div className="hamburger ml-4 inline-block cursor-pointer md:hidden">
            <div className="line h-[1px] bg-black w-5 mt-[4px]"></div>
            <div className="line h-[1px] bg-black w-5 mt-[4px]"></div>
            <div className="line h-[1px] bg-black w-5 mt-[4px]"></div>
        </div>
{/* <!-- SearchIcon In Mobile--> */}
        <div className="search md:hidden w-4 ml-4 mt-[2px]">
          <BsSearch className='text-xl'></BsSearch>
          </div>
         </div>


{/*SECTION:2 Logo && Categories*/}
<div className="logo and Categories order-2 md:order-1">
<Link href={"/"}>
<div className="logo flex md:ml-28 md:space-y-2">
  <div className='text-lg font-semibold md:text-2xl md:mt-2'>Shopverse</div>
  <Image className='h-7 w-7 md:h-10 md:w-10'width={128} height={135} src="/logo.png" alt="" priority/>
</div>
</Link>

<div className="categories flex items-center">

<ul className=" md:text-lg md:font-semibold md:-translate-y-[20px] text-sm absolute -translate-x-[400px] md:translate-x-80 md:mt-0 md:flex space-x-4 ">
    <li></li>
    <Link legacyBehavior href={"/tShirts"}><a><li className='hover:underline underline-offset-8 decoration-shiny decoration-2 cursor-pointer delay-75' >Tshirts</li></a></Link>
    <Link legacyBehavior href={"/hoddies"}><a><li className='hover:underline underline-offset-8 decoration-shiny decoration-2 cursor-pointer delay-75' >Hoddies</li></a></Link>
    <Link legacyBehavior href={"/mugs"}><a><li className='hover:underline underline-offset-8 decoration-shiny decoration-2 cursor-pointer delay-75' >Mugs</li></a></Link>
    <Link legacyBehavior href={"/stickers"}><a><li className='hover:underline underline-offset-8 decoration-shiny decoration-2 cursor-pointer delay-75' >Stickers</li></a></Link>
  </ul>
</div>
</div>


{/* SECTION:3 Cart and Account Search[after md:] */}
<div className="cart and Account items-center order-3 flex space-x-4 mr-4">
<div className="search hidden md:block w-4 md:w-5 ml-4 mt-[2px] cursor-pointer">
          <BsSearch className='text-xl'/>
          </div>
<div onClick={toggleCart} className="cart cursor-pointer w-fit h-fit">
  <GiShoppingCart className='text-3xl md:text-3xl'/>
</div>
{user.value &&
<span onMouseOver={()=>setDropDown(true)}  onMouseLeave={()=>setDropDown(false)}>

{dropDown &&

<div onMouseOver={()=>setDropDown(true)} onMouseLeave={()=>setDropDown(false)} className="z-50 dropDown absolute top-[52px] right-4 w-36   py-5 pl-8 rounded-b-full border-b-[15px] border-x-[3px] border-shiny shadow-2xl bg-white
">
<ul>
  <Link href={'/profile'}>
  <li className=' flex my-2 font-medium hover:font-bold hover:scale-110 hover:text-shiny cursor-pointer' >Profile <BsPersonVcard className="ml-4 text-lg" /> </li></Link>
  <Link href={'/myorders'}>
  <li className=' flex my-2 font-medium hover:font-bold hover:scale-110 hover:text-shiny cursor-pointer' >Orders <TbTruckDelivery className="ml-3 text-2xl" /></li>  </Link>
 
  <li onClick={()=>handleLogout()} className='flex my-2 font-medium hover:font-bold hover:scale-110 hover:text-shiny cursor-pointer' >Logout <LuLogOut className="ml-3 text-xl" /></li>
</ul> 
</div>}


<div  className="account cursor-pointer">
  <BsPersonCircle   className='text-2xl md:text-2xl' ></BsPersonCircle>
</div>      



</span>}

{!user.value &&
<Link href={"/login"}>
  <div  className="account cursor-pointer">
  <BsPersonCircle   className='text-2xl md:text-2xl' ></BsPersonCircle>
</div>   
</Link>
}


</div>






{/* SideBar - for showing cart */}
<div ref={cartref} className={` z-50 w-72 h-full sidebar absolute px-7 py-10  top-0 right-0 bg-shadowColor shadow-lg transform transition-transform ${Object.keys(cart).length==0 ?`translate-x-full`:`translate-x-0`} `}>
  <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
  <span onClick={toggleCart} className='top-5 right-3 absolute cursor-pointer' ><AiFillCloseCircle className='text-2xl text-shiny'/></span>
<ol className='list-decimal font-semibold' >
{Object.keys(cart).length==0 && 
<div className="noItem justify-center p-5 flex  items-center">You cart is empty</div>
}

{/* Loop Through list Items using map function  */}
 {Object.keys(cart).map((itemCode)=>{return <li key={itemCode}>
    <div className="item flex my-5">
    <div className='w-2/3 font-semibold'>{cart[itemCode].name}({cart[itemCode].variant})/({cart[itemCode].size})</div>
    <div className='w-1/3 font-semibold flex justify-center items-center text-xl'>
      
      <AiFillMinusCircle onClick={()=>{removeFromCart(
        itemCode,1,cart[itemCode].name,cart[itemCode].price,cart[itemCode].size,cart[itemCode].varient
      )}} className='text-shiny cursor-pointer'/>  
      <span className='mx-2 text-sm font-semibold'> {cart[itemCode].qty} </span>
      <AiFillPlusCircle onClick={()=>{addToCart(
        itemCode,1,cart[itemCode].name,cart[itemCode].price,cart[itemCode].size,cart[itemCode].varient)}} className='text-shiny cursor-pointer'/>
    
    </div>
    </div>
    </li>}) }
    
</ol>

<div className='font-bold mb-6'>SubTotal: Rs. {subTotal}/-</div>
{/* Checkout Button of Cart */}
<div className="buttons flex justify-center items-center space-x-3">
<Link  href="/checkout"> 
  <div>

<button className=" group flex active:bg-amber-300 text-black bg-shiny border-0 py-2 px-3 focus:outline-none hover:scale-105 hover:bg-amber-400 transition ease-in duration-400 font-semibold rounded-sm cursor-pointer "> 
<BsFillBagCheckFill className='text-black mx-[6px] mt-[3px] md:hidden group-hover:block'/>
Checkout
</button>
</div>
</Link>

<button onClick={()=>clearCart()} className=" group flex active:bg-amber-300 text-black bg-shiny border-0 py-2 px-3 focus:outline-none hover:scale-105 hover:bg-amber-400 transition ease-in duration-400 font-semibold rounded-sm cursor-pointer "> 
<BsFillTrash3Fill className='text-black mx-[6px] mt-[3px] md:hidden group-hover:block'/>
Empty
</button>

</div>
    </div>


    </div>
  )
}

export default Navbar