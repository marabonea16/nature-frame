import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function OAuth() {
  return (
    <div className='justify-center space-y-6'>
      <button 
        className='flex items-center justify-center w-full
        bg-blue-600 text-white px-7 py-3 uppercase
        text-sm font-medium hover:bg-blue-700 active:bg-blue-800
        shadow-md hover:shadow-lg active:shadow-lg transition 
        duration-10 ease-in-out rounded'>
        <div className='flex items-center justify-center bg-white rounded-full p-1 mr-2'>
          <FaFacebookF className='text-blue-600 text-xl'/>
        </div>
        Continue with Facebook
      </button>
      <button
         className='flex items-center justify-center w-full
         bg-red-700 text-white px-7 py-3 uppercase
         text-sm font-medium hover:bg-red-800 active:bg-red-900
        shadow-md hover:shadow-lg active:shadow-lg transition 
        duration-10 ease-in-out rounded'>
        <div className='flex items-center justify-center bg-white rounded-full p-1 mr-2'>
          <FcGoogle className='text-2xl'/>
        </div>
        Continue with Google
      </button>
    </div>
  )
}