import React from 'react'
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Link } from 'react-router-dom';
import image from '../assets/images/addproduct.jpg';
import image2 from '../assets/images/editproducts.jpg';

export default function AdminDashboard() {
  return (
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col md:flex-row gap-6 min-h-screen p-6'>
      <div className='flex flex-col items-center w-full md:w-[50%] lg:w-[40%]'>
        <button type="submit" className="relative w-full h-72
        text-white uppercase text-lg font-bold rounded shadow-md
        hover:bg-green-800 transition duration-150 ease-in-out
        hover:shadow-lg active:bg-green-900 overflow-hidden">
          <Link to="/add-product" className='flex flex-col justify-center items-center w-full h-full'>
            <img src={image} alt="Add Product" className='absolute inset-0 w-full h-full object-cover opacity-50' />
            <MdOutlineProductionQuantityLimits className='text-5xl mb-2 relative z-10' />
            <span className='relative z-10 bg-black bg-opacity-50 px-2 py-1 rounded'>Add Product</span>
          </Link>
        </button>
      </div>
      <div className='flex flex-col items-center w-full md:w-[50%] lg:w-[40%]'>
        <button type="submit" className="relative w-full h-72
        text-white uppercase text-lg font-bold rounded shadow-md
        hover:bg-green-800 transition duration-150 ease-in-out
        hover:shadow-lg active:bg-green-900 overflow-hidden">
          <Link to="/products" className='flex flex-col justify-center items-center w-full h-full'>
            <img src={image2} alt="Edit Products" className='absolute inset-0 w-full h-full object-cover opacity-50' />
            <MdOutlineProductionQuantityLimits className='text-5xl mb-2 relative z-10' />
            <span className='relative z-10 bg-black bg-opacity-50 px-2 py-1 rounded'>Edit Products</span>
          </Link>
        </button>
      </div>
    </section>
  )
}