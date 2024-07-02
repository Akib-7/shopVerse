import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import productModel from '@/models/product'
import mongoose from "mongoose";
import ColorPicker from '@/components/colorPicker';
const Hoddies = ({products}) => {
  
  return (
    <>
    <div className='md:hidden m-5 font-bold'>
    Hoddies
    </div>

    
    
    <div className='hoddies Section mx-3 w-fit grid-cols-2 grid md:grid-cols-3 lg:grid-cols-4 gap-y-4 md:gap-y-8 mt-5 md:mt-14  gap-x-3 md:gap-x-3 lg:gap-x-6 md:mx-6'>
      {/* Because products is an object and not an array we cant use map function simply. We will have to use OBJECT.Keys[products] */}
      {Object.keys(products).length===0 && <div><p className='font-bold text-lg text-red-400'>Sorry, All the hoddies are out of stock</p> <p className='block font-bold text-2xl'>New Stock coming soon! Stay Tuned</p></div>}
    {Object.keys(products).map((item)=>{ return <Link  key={products[item]._id} passHref={true} legacyBehavior href={`/product/${products[item].slug}`} >
      <a>
<div className="card bg-slate-200  h-fit group w-auto overflow-hidden rounded-2xl items-center cursor-pointer hover:bg-shiny delay-100 transition ease-out hover:scale-95 relative">
  <Image className='object-cover' width={400} height={600} src={products[item].image} alt="" />
  <div className="justify-center flex details m-5 mx-8">
    <span className='font-semibold text-xs tracking-widest group-hover:font-bold delay-100'>{products[item].title} </span>
  </div>
  {/* COLOR VARIANTS DIV */}
  <div className="justify-center flex details mx-auto mb-4">
    <span className='font-bold text-xs tracking-widest group-hover:font-bold delay-100'><ColorPicker colors={products[item].color}/> </span>
  </div>
  {/* SIZE VARIANTS DIV */}
  <div className="sizes flex justify-center items-center space-x-1 pb-2">
{/* FOR SMALL */}
  {products[item].size.includes("S") && <div className=" border border-gray-400 px-2 py-[2px] text-xs  group-hover:text-black group-hover:font-bold delay-100 group-hover:border-black rounded-md "> S  </div>}

{/* FOR MEDIUM */}
  {products[item].size.includes("M") &&<div className=" border border-gray-400 px-2 py-[2px] text-xs group-hover:text-black group-hover:font-bold delay-100 group-hover:border-black rounded-md ">M</div>}

  {/* FOR LARGE */}
   {products[item].size.includes("L") &&<div className=" border border-gray-400 px-2 py-[2px] text-xs group-hover:text-black group-hover:font-bold delay-100 group-hover:border-black rounded-md ">L</div>}

{/* FOR XL */}
{products[item].size.includes("XL") && <div className=" border border-gray-400 px-2 py-[2px] text-xs group-hover:text-black group-hover:font-bold delay-100 group-hover:border-black rounded-md ">XL </div>
}

{/* FOR XXL */}
{products[item].size.includes("XXL") && <div className=" border border-gray-400 px-2 py-[2px] text-xs group-hover:text-black group-hover:font-bold delay-100 group-hover:border-black rounded-md ">XXL</div>}
  </div>
  <div className="group-hover:bg-emerald-400 group-hover:text-white delay-100 price Badge bg-gray-100 w-fit text-black rounded-full p-2 absolute top-0 ml-2 mt-2">
  <span className=' text-md font-bold' >Rs. {products[item].price}/-</span>
  </div>
 
</div>
</a>
    </Link>})}


    </div>
   




 

    </>
  )
}

// THROUGH THIS FUNCTION WE ARE GETTING DATA FROM SERVER DB. WE CAN ALSO USE FETCH API SYNTAX

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
}

// Finding All The products in TSHIRT Category 
var products =await productModel.find({category:'hoddie'})

let hoddies={}// it is an array of hoddies with hoddie's title is one element.

for(let item of products){
//Checikng if size/color is not an array we make it an array for storing different color,size variants of the proudcts which  hvae the same product title
    if(item.title in hoddies){
        if (!Array.isArray(hoddies[item.title].size)) {
            hoddies[item.title].size = [];
        }
        if (!Array.isArray(hoddies[item.title].color)) {
            hoddies[item.title].color = [];
        }

        if(!hoddies[item.title].color.includes(item.color) && item.availableQty > 0 ){
            hoddies[item.title].color.push(item.color)
        }
        if(!hoddies[item.title].size.includes(item.size) && item.availableQty > 0 ){
            hoddies[item.title].size.push(item.size)
        }
    }
    // IF item is not present in the our hoddies array we add that item in our hoddies category and storing its size and color variant
    else{

        


        hoddies[item.title]=JSON.parse(JSON.stringify(item))
        if(item.availableQty > 0){
            hoddies[item.title].color=[item.color]
            hoddies[item.title].size=[item.size]
        }
    }


}



  
  return {
    props: {products:JSON.parse(JSON.stringify(hoddies)) },// deep copy because of object =_id
  }
}

export default Hoddies

