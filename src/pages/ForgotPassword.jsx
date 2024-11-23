import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  function onChange(e){
    setEmail(e.target.value)
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 mt-4'>
          <img src="https://1drv.ms/i/c/9226078bd30bb073/IQTwMinQFfmXTb0SfFIZcu0fAcOU-t2x6NIHL5vOTl2s3W4?width=512&height=512" alt="key" 
          className='w-full rounded-2xl'
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20 '>
          <form>
          
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={onChange}
              placeholder="Email address"
              className="mb-6 w-full px-4 py-2 text-xl
              text-gray-700 bg-white border-gray-300
              rounded transition ease-in-out"
            />
            
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
            <p className='mb-6'>
                Don't have an account?
                <Link to="/sign-up" 
                className="text-red-600 
                hover:text-red-700
                transition duration-200 ease-in-out ml-1">Register</Link>
              </p>
              <p>
                <Link to="/sign-in"
                className="text-blue-600 
                hover:text-blue-800
                transition duration-200 ease-in-out">Sign in instead</Link>
              </p>
            </div>
            <button className="w-full bg-green-700 text-white 
              px-7 py-4 rounded text-sm font-medium uppercase 
              shadow-md hover:bg-green-800 transition 
              duration-150 ease-in-out hover:shadow-lg
            active:bg-green-900"
              type="submit">Send reset password
            </button>
            <div className='my-4 flex items-center 
              before:border-t before:flex-1 before:border-gray-300
              after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}
