import React from 'react'
import orderModel from '@/models/order'
import mongoose from 'mongoose'
const Myorders= () => {
  return (
    <>
    <div className='w-fit font-bold text:3xl md:text-5xl ml-7 md:ml-14 text-black py-4 md:py-10 ' >My Orders</div>

<div className="relative overflow-x-auto mx-7 md:mx-14 shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 table-auto">
        <thead className="text-xs text-black bg-shiny uppercase ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
               
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b   hover:bg-gray-100 ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">
                    Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                
            </tr>
            <tr className="bg-white border-b  hover:bg-gray-100 ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900  ">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
              
            </tr>
            <tr className="bg-white  hover:bg-gray-100 ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900  d">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>
                <td className="px-6 py-4">
                    Accessories
                </td>
                <td className="px-6 py-4">
                    $99
                </td>
               
            </tr>
        </tbody>
    </table>
</div>

</>
    
  )
}

export default Myorders

export async function getServerSideProps(context) {
    if(!mongoose.connections[0].readyState){
      await mongoose.connect(process.env.MONGO_URI)
  }
  
  // Finding All The products in TSHIRT Category 
  var order =await orderModel.find({slug:context.query.slug})// It includes a specific tshirt with a specific title category
  
  if (order) {
    var variants = await orderModel.find({title: order.title});
  } else {
    console.error("Product is null");
  }// we will find all the variants of this specific tshirt title
  
  var colorSizeSlug={}
 
  
    return {
      
      props: {order:JSON.parse(JSON.stringify(order)),variants:JSON.parse(JSON.stringify(colorSizeSlug)) }
      // deep copy because of object =_id
    }
  }