import  {useState,useEffect}  from 'react'
import  {useRouter}  from 'next/router'
import {ImCart} from 'react-icons/im'

import {TbTruckDelivery} from 'react-icons/tb'
import Image from 'next/image'
import productModel from '@/models/product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mongoose from 'mongoose'





const Post=({buyNowCart,addToCart,product,variants})=> {


  const router = useRouter()
  const {slug}=router.query;
 
 
  var [selectedSize, setSelectedSize] = useState();

var [showSize, setShowSize] = useState(Object.keys(variants[Object.keys(variants)[0]] || {}));

 var [selectedColor, setSelectedColor] = useState(Object.keys(variants)[0]);
   
  var [pin, setPin] = useState()
  var [service, setService] = useState(null)
  
 
  const refreshVariants = (newColor, newSize) => {
    const newSlug = variants[newColor][newSize];
    if(newSlug) {
        router.push(`/product/${newSlug}`);
    }
}
{/* 
Insted of making a separate function for getting the array of sizes and calling it in the onClick of ColorPicker, I am using useEffect. Before useEffect my styling logic was getting disrupted and the styling that was meant to show when a color is selected was not showing.

USE EFFECT APPROACH :
This approach keeps the logic clean. Instead of doing two things at once during the click (setting the color and fetching the sizes), the code sets the color and then lets the useEffect handle the associated update (fetching the sizes). This separation can make the code more predictable and easier to understand.
*/}
  useEffect(() => {
    if (selectedColor) {
      setShowSize(Object.keys(variants[selectedColor] || {}));
    
    }
  }, [selectedColor]);



function MyColorPicker() {
 
// Color Picker for showing colors against specific sizes:
var variantColors=Object.keys(variants)
  return (
      <div className="flex space-x-4">
        
          {variantColors.map((color, index) => (
            
              <div
                  key={index}
                  className={`w-4 h-4  cursor-pointer border-[1px] border-black  ${selectedColor === color ?  'scale-125 outline outline-offset-2 outline-1' : 'scale-100'}`}
                  style={{ backgroundColor: color }}
                 
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedSize()
                    
                  }}
                  
                
                  
                  aria-label={`Select color ${color}`}
                  tabIndex={0}
              ></div>
          )
          )}
          
          
      </div>
      
  );
}


const checkServiceability = async () => {
  try {
      const fetchpins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincodes`);
      const pinCodes = await fetchpins.json(); // Note the invocation here

      if (pinCodes.includes(pin)) {
          setService(true);
          toast.success('Yes! We can deliver it to your home', {
            position: "top-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
      } else {
          setService(false);
          toast.error('Sorry! we do not deliver to your area', {
            position: "top-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
      }
  } catch (error) {
      console.error("Error fetching or parsing pincodes:", error);
      setService(false); // You can decide if you want to set this to false in case of an error.
  }
  
}

  const onChangePin=(e)=>{
setPin(e.target.value)
  }
 


  return(


   
   <>

 <section className="text-gray-600 body-font overflow-hidden">
 <ToastContainer
position="bottom-left"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
></ToastContainer>
  <div className="container px-5 py-16 mx-auto">
    <div className=" md:h-2/3 md:px-10 lg:w-4/5 mx-auto md:flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">ShopVerse</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{product.title} ({selectedColor}) </h1>
        <div className="flex mb-4">
          <a className="flex-grow text-yellow-500 border-b-2 border-yellow-500 py-2 text-lg px-1">Description</a>
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Reviews</a>
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Details</a>
        </div>
        <p className="leading-relaxed mb-4">{product.description}</p>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Select Color</span>
          <span className="ml-auto text-gray-900"><MyColorPicker />
</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Available Sizes</span>
          <span className="ml-auto text-gray-900">



<select 
    value={selectedSize}

  onChange={e => {
    const newSize = e.target.value;
    setSelectedSize(newSize);
    
    refreshVariants(selectedColor, newSize);
    
  }}
    name="shirtSize"


>          

           {(showSize.includes('S') || showSize.includes('M') || showSize.includes('L') || showSize.includes('XL')) && <option>Select</option>}
           {showSize.includes('S') && <option  value="S">S</option>}          
           {showSize.includes('M') && <option  value="M">M</option>}
           {showSize.includes('L') &&  <option  value="L">L</option>}
           {showSize.includes('XL')&&   <option  value="XL">XL</option>}
            
      
</select>


          </span>
        </div>
        
        <div className="flex">
          <span className="title-font font-medium text-lg my-auto md:text-2xl text-gray-900">Rs. {product.price}/-</span>
          
{selectedSize && <button onClick={()=>buyNowCart(slug,1,product.title,product.price,product.size,selectedColor)} className="ml-auto md:ml-9 group flex active:bg-amber-300 text-black bg-shiny border-0 py-2 px-2 focus:outline-none hover:scale-110 hover:bg-amber-400 transition ease-in duration-400 font-semibold rounded-sm cursor-pointer "> 
<ImCart className='text-black  mr-[6px] mt-[3px] md:hidden group-hover:block  text-lg'/>
Buy Now
</button>  }

{selectedSize &&<button onClick={()=>addToCart(slug,1,product.title,product.price,product.size,selectedColor)} className="ml-auto md:ml-9 group flex active:bg-amber-300 text-black bg-shiny border-0 py-2 px-2 focus:outline-none hover:scale-110 hover:bg-amber-400 transition ease-in duration-400 font-semibold rounded-sm cursor-pointer "> 
<ImCart className='text-black  mr-[6px] mt-[3px] md:hidden group-hover:block  text-lg'/>
Add to Cart
</button>   }

        </div>
        {/* Checking the Servicebability of the product */}
        <p className='mt-9 text-sm mb-2'>Enter pin code of your city to check if this product can be delivered to your home </p>

        {!service && service!=null && <div className="red  text-red-500 text-xs mb-2 font-bold">Sorry,We do not deliver to your area</div>}

        {service && service!=null && <div className="red text-green-800 text-xs mb-2 font-bold">Yes, we can deliver it to your home</div>}
       
        <div className="checkDelivery flex justify-center space-x-2">
          
          <input onChange={onChangePin} placeholder='Enter Pin Code' type="text" className='border rounded-sm text-sm w-[120px] placeholder-gray-600 px-2 border-gray-400' />
          <button onClick={checkServiceability} className="group flex active:bg-amber-300 text-black bg-shiny border-0 py-2 px-2 focus:outline-none hover:scale-110 hover:bg-amber-400 transition ease-in duration-400 font-semibold rounded-sm cursor-pointer ">
          <TbTruckDelivery className='text-black  mr-[6px] mt-[3px] md:hidden group-hover:block  text-lg'/>
            Check Delivery</button>
        </div>
      </div>

{/* Product Image Below */}

      <Image alt="ecommerce" className=" md:mt-10 p-[2px] lg:w-1/2 w-full md:h-[32rem] h-[27rem] object-scale-down object-top rounded"  width={400} height={600} src={product.image}/>
    </div>
  </div>
</section>
 
  </>
  )
}



export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
}

// Finding All The products in TSHIRT Category 
var product =await productModel.findOne({slug:context.query.slug})// It includes a specific tshirt with a specific title category

if (product) {
  var variants = await productModel.find({title: product.title});
} else {
  console.error("Product is null");
}// we will find all the variants of this specific tshirt title

var colorSizeSlug={}
for (let [key, item] of Object.entries(variants)){

  
// eg Object stored in this variable :{ black:{XL: {slug: superVillain compression tshirt Black} }

 if(item.availableQty>0){
      if(Object.keys(colorSizeSlug).includes(item.color)){
          colorSizeSlug[item.color][item.size]=item.slug

}
      else{
        colorSizeSlug[item.color]={}
          colorSizeSlug[item.color][item.size]=item.slug

        }

  
}
else{
  continue;
}
}


  return {
    
    props: {product:JSON.parse(JSON.stringify(product)),variants:JSON.parse(JSON.stringify(colorSizeSlug)) }
    // deep copy because of object =_id
  }
}


export default Post
