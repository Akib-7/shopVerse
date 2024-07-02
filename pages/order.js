import React from 'react'
import{CgTrack} from 'react-icons/cg'
import Image from 'next/image'
const Order= () => {
  
  return (
   <>
  <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-16 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-md title-font text-gray-500 tracking-widest">ShopVerse</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order ID: #737492</h1>
        <p className="leading-relaxed mb-4">Your Order has been successfully placed.ThankYou</p>
        <div className="flex mb-4">
          <a className="flex-grow text-yellow-500  py-2 text-lg px-1">Item Description</a>
          <a className="flex-grow  border-gray-300 py-2 text-lg px-1">Quantity</a>
          <a className="flex-grow  border-gray-300 py-2 text-lg px-1">Price</a>
        </div>
        
        
        <div className="flex  py-2">
          <span className="text-gray-500">Hello Graphic Tee (M)</span>
          <span className="mx-auto text-gray-900">1</span>
          <span className="mx-auto text-gray-900">800</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
        <span className="text-gray-500">Hello Graphic Tee (M)</span>
          <span className="mx-auto text-gray-900">1</span>
          <span className="mx-auto text-gray-900">800</span>
          
        </div>
        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
        <span className="text-gray-500">Hello Graphic Tee (M)</span>
          <span className="mx-auto text-gray-900">1</span>
          <span className="mx-auto text-gray-900">800</span>
        </div>
        <div className="flex-col">
          <span className="title-font font-medium text-2xl text-gray-900">SubTotal: $258.00</span>
          {/* <button className="flex ml-auto text-white bg-shiny border-0 py-2 px-6 focus:outline-none hover:bg-amber-300 rounded">Track Order</button> */}
          <button className="my-5 mx-auto md:ml-0 group flex active:bg-amber-300 text-black bg-shiny border-0 py-2 px-2 hover:scale-110 hover:bg-amber-400 transition ease-in duration-400 font-semibold rounded-sm cursor-pointer "> 
<CgTrack className='text-black  mr-[6px] mt-[3px] md:hidden group-hover:block  text-ld' />
Track Order
</button>
         
        </div>
      </div>
      <Image alt="ecommerce" className="p-[2px] lg:w-1/2 w-full md:h-[32rem] h-[27rem] object-scale-down object-top rounded"  width={400} height={600} src="/hoddies.jpg"/>
    </div>
  </div>
</section>
   </>
  )
}

export default Order
