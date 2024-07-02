import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import productModel from '@/models/product'
import mongoose from "mongoose";
import ColorPicker from '@/components/colorPicker';
const TShirts = ({products}) => {
  
  return (
    <>
    <div className='md:hidden m-5 font-bold'>
    Tshirts
    </div>

    
    
    <div className='tshirts Section mx-3 w-fit grid-cols-2 grid md:grid-cols-3 lg:grid-cols-4 gap-y-4 md:gap-y-8 mt-5 md:mt-14  gap-x-3 md:gap-x-3 lg:gap-x-6 md:mx-6'>
      {/* Because products is an object and not an array we cant use map function simply. We will have to use OBJECT.Keys[products] */}
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
var products =await productModel.find({category:'tshirt'})

let tshirts={}// it is an array of tshirts with tshirt's title is one element.

for(let item of products){
//Checikng if size/color is not an array we make it an array for storing different color,size variants of the proudcts which  hvae the same product title
    if(item.title in tshirts){
        if (!Array.isArray(tshirts[item.title].size)) {
            tshirts[item.title].size = [];
        }
        if (!Array.isArray(tshirts[item.title].color)) {
            tshirts[item.title].color = [];
        }

        if(!tshirts[item.title].color.includes(item.color) && item.availableQty > 0 ){
            tshirts[item.title].color.push(item.color)
        }
        if(!tshirts[item.title].size.includes(item.size) && item.availableQty > 0 ){
            tshirts[item.title].size.push(item.size)
        }
    }
    // IF item is not present in the our tshirts array we add that item in our tshirts category and storing its size and color variant
    else{

        


        tshirts[item.title]=JSON.parse(JSON.stringify(item))
        if(item.availableQty > 0){
            tshirts[item.title].color=[item.color]
            tshirts[item.title].size=[item.size]
        }
    }


}



  
  return {
    props: {products:JSON.parse(JSON.stringify(tshirts)) },// deep copy because of object =_id
  }
}

export default TShirts

