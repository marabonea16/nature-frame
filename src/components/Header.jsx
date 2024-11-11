import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
export default function Header() {
    const location = useLocation()
    const navigate = useNavigate()
    function pathMathRoute(route) {
        if(route === location.pathname) {
            return true
        } 
        return false
    }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
        <header className="flex justify-between items-center px- max-w-6xl mx-auto">
            <div>
                <img src="https://1drv.ms/i/c/9226078bd30bb073/IQTwMinQFfmXTb0SfFIZcu0fAcOU-t2x6NIHL5vOTl2s3W4?width=512&height=512" alt="logo" className="h-36 cursor-pointer" onClick={()=>navigate("/")}/>
            </div>
            <div>
                <ul className='flex space-x-10'>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-600 border-b-[3px] border-b-transparent ${pathMathRoute("/") && "text-black border-b-green-950"}`} onClick={()=>navigate("/")}>Home</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-600 border-b-[3px] border-b-transparent ${pathMathRoute("/shop") && "text-black border-b-green-950"}`} onClick={()=>navigate("/shop")}>Shop</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-600 border-b-[3px] border-b-transparent ${pathMathRoute("/sign-in") && "text-black border-b-green-950"}`} onClick={()=>navigate("/sign-in")}>Sign in</li>
                </ul>
            </div>
        </header>
    </div>
  )
}
