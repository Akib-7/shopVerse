import { React, useState } from "react";

import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");  
  const [state, setstate] = useState("");
  const [disabled, setdisabled] = useState(true);

  async function initiatePayment() {
//const data={email:email,name:name,address:address,pincode:pincode,phone:phone}
    
    // Initiating payment procedure

// User initiates payment on the client-side using Pay Now Button here in checkout.js.
// Client(initiatePayment method) sends cart details(stringified JSON) to the server api(create-session.js).
// Server processes these details and requests Stripe to create a checkout session.
// For the server to create a stripe session it checks product_price,product_details,unit_amount and quantity as well
// Then Stripe responds with a unique session URL.
// Server sends this URL back to the client(checkout.js).
// Client redirects the user to this Stripe URL for payment completion.
//    
    // 
    try {
      const res = await fetch("/api/stripePaymentSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: Object.keys(cart).map((itemCode) => ({
            id: itemCode,
            qty: cart[itemCode].qty,
            name: cart[itemCode].name,
            price: cart[itemCode].price,
            size: cart[itemCode].size,
            variant: cart[itemCode].variant,
          })),
          orderDetails:{
            orderId: Math.floor(Math.random()*Date.now()),
            name,
            email,
            address,
            pincode,
            phone,
            subTotal:subTotal
          }
        }),
      });
      // console.log(await res.text());

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      const { url } = await res.json();

      window.location = url;
  

    } catch (error) {
      console.error({ error });
    }
  }

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    }
    if (name && email && phone && address && pincode) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  };
  return (
    <div className="container m-auto my-4">
      <h1 className="mx-auto text-center text-3xl font-bold mt-8 mb-8">
        Checkout
      </h1>
      <h2 className="px-5 text-xl font-bold">1. Delivery Details</h2>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
          {/* Name */}
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-black"
          >
            Name
          </label>
          <input
            onChange={handleChange}
            value={name}
            type="text"
            name="name"
            id="name"
            className="bg-white border-gray-300  text-black sm:text-sm rounded-lg w-full p-2.5 border"
            placeholder="Full Name"
            required={true}
          />
        </div>

        {/* Email */}
        <div className=" ml-2 w-1/2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-black"
          >
            Your email
          </label>
          <input
            onChange={handleChange}
            value={email}
            type="email"
            name="email"
            id="email"
            className="bg-white border-gray-300  text-black sm:text-sm rounded-lg w-full p-2.5 border"
            placeholder="name@company.com"
            required={true}
          />
        </div>
      </div>

      <div className="">
        {/* Address */}
        <div className="px-3 w-full">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-black"
          >
            Address
          </label>

          <textarea
            onChange={handleChange}
            value={address}
            name="address"
            id="address"
            cols="30"
            rows="10"
            className="bg-white border-gray-300  text-black sm:text-sm rounded-lg w-full p-2.5 border"
            placeholder="Your Address"
            required={true}
          ></textarea>
        </div>

        {/* Phone and City */}

        <div className="flex-col">
          <div className=" px-2 w-full">
            {" "}
            {/*Phone  */}
            <label
              htmlFor="phone"
              className=" mb-2 text-sm font-medium text-black"
            >
              Phone No.
            </label>
            <input
              onChange={handleChange}
              value={phone}
              type="text"
              name="phone"
              id="phone"
              className="bg-white border-gray-300  text-black sm:text-sm rounded-lg w-full p-2.5 border"
              placeholder="Phone No."
              required={true}
            />
          </div>
          {/* Pin Code */}
          <div className="px-2 w-full">
            <label
              htmlFor="pin"
              className=" mb-2 text-sm font-medium text-black"
            >
              Pin Code.
            </label>
            <input
              onChange={handleChange}
              value={pincode}
              type="text"
              name="pincode"
              id="pincode"
              className="bg-white border-gray-300  text-black sm:text-sm rounded-lg w-full p-2.5 border"
              placeholder="Enter Pin Code"
              required={true}
            />
          </div>
          {/* City */}
          <div className=" px-2 w-full mt-6">
            <label
              htmlFor="city"
              className=" mb-2 text-sm font-medium text-black"
            >
              City
            </label>
            <input
              value={city}
              type="text"
              name="city"
              id="city"
              className="bg-white border-gray-300  text-black sm:text-sm rounded-lg w-full p-2.5 border"
              placeholder="city"
              readOnly={true}
            />
          </div>

          {/* State */}
          <div className="px-2 w-full">
            <label
              htmlFor="state"
              className=" mb-2 text-sm font-medium text-black"
            >
              State.
            </label>
            <input
              value={state}
              type="text"
              name="state"
              id="state"
              className="bg-white border-gray-300  text-black sm:text-sm rounded-lg w-full p-2.5 border"
              placeholder="State."
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <h2 className="px-5 text-xl font-bold mt-10 mb-6 ">
        2.Review Cart Items
      </h2>

      {/* Checkout cart */}
      <div className="mx-auto md:mx-4 z-50 w-80 md:w-96 h-full sidebar px-7 py-10   bg-shadowColor shadow-lg">
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>

        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="noItem justify-center p-5 flex  items-center">
              You cart is empty
            </div>
          )}

          {/* Loop Through list Items using map function  */}
          {Object.keys(cart).map((itemCode) => {
            return (
              <li key={itemCode}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">
                    {cart[itemCode].name}({cart[itemCode].variant})/(
                    {cart[itemCode].size})
                  </div>
                  <div className="w-1/3 font-semibold flex justify-center items-center text-xl">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          itemCode,
                          1,
                          cart[itemCode].name,
                          cart[itemCode].price,
                          cart[itemCode].size,
                          cart[itemCode].varient
                        );
                      }}
                      className="text-shiny cursor-pointer"
                    />
                    <span className="mx-2 text-sm font-semibold">
                      {" "}
                      {cart[itemCode].qty}{" "}
                    </span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          itemCode,
                          1,
                          cart[itemCode].name,
                          cart[itemCode].price,
                          cart[itemCode].size,
                          cart[itemCode].varient
                        );
                      }}
                      className="text-shiny cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="font-bold">SubTotal: Rs. {subTotal}/-</span>

        {/* Checkout Button of Cart */}
      </div>

      <div className="mt-4">
        <button
          disabled={disabled}
          onClick={initiatePayment}
          className=" ml-10 md:ml-4 group flex disabled:bg-amber-100 active:bg-amber-300 text-black bg-shiny border-0 py-2 px-3 focus:outline-none hover:scale-105 hover:bg-amber-400 transition ease-in duration-400 font-semibold rounded-sm cursor-pointer "
        >
          <BsFillCreditCard2BackFill className="text-black mx-[6px] text-xl mt-[3px] md:hidden group-hover:block" />
          Pay Rs. {subTotal}/-
        </button>
      </div>
    </div>
  );
};

export default Checkout;
