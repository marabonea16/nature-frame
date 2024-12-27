import { getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const {name, email} = formData;
  function onLogout(){
    auth.signOut();
    navigate("/");
  }
  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>
          My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3 '>
          <form>
            {/* Name Input*/}

            <input 
              type="text" 
              id="name" 
              value={name}
              className="w-full px-4 py-2 text-xl mb-6
              text-gray-700 bg-white border-gray-300
              rounded transition ease-in-out"></input>
              {/* Email Input*/}

              <input 
              type="email" 
              id="email" 
              value={email}
              className="w-full px-4 py-2 text-xl mb-6
              text-gray-700 bg-white border-gray-300
              rounded transition ease-in-out"></input>

              <div className='flex justify-end whitespace-nowrap text-sm sm:text-lg'>
                <p onClick={onLogout} className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer'>
                  Sign out
                </p>
              </div>
          </form>
        </div>
      </section>
    </>
  )
}
