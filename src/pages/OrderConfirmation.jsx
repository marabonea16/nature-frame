import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderConfirmation() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-6">Order Confirmation</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
        <p className="mb-4">Your order has been placed successfully and will be processed shortly.</p>
        <p className="mb-4">You will receive an email confirmation with the order details.</p>
        
      </div>
      <div className='mt-6 flex justify-center '>
      <Link to="/shop" className=" bg-green-700 text-white 
              px-6 py-3  rounded text-sm font-medium uppercase 
              shadow-md hover:bg-green-800 transition 
              duration-150 ease-in-out hover:shadow-lg
            active:bg-green-900">
          Continue Shopping
        </Link>
      </div>
    </div>
 
  );
}