import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
    const location = useLocation()
    const navigate = useNavigate()
    const [currentPath, setCurrentPath] = useState(location.pathname)

    useEffect(() => {
        setCurrentPath(location.pathname)
    }, [location.pathname])

    function pathMatchRoute(route) {
        return route === currentPath
    }

    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-10'>
            <header className="flex justify-between items-center px-4 max-w-6xl mx-auto">
                <div className='mt-[-20px]'>
                    <img src="https://1drv.ms/i/c/9226078bd30bb073/IQTwMinQFfmXTb0SfFIZcu0fAcOU-t2x6NIHL5vOTl2s3W4?width=512&height=512" alt="logo" className="h-40 cursor-pointer" onClick={() => navigate("/")}/>
                </div>
                <div>
                    <ul key={currentPath} className='flex space-x-4 md:space-x-10'>
                        <li className={`cursor-pointer py-3 px-2 text-sm font-semibold ${pathMatchRoute("/") ? "text-black border-b-green-900 border-b-[3px]" : "text-gray-600 border-b-transparent"}`} onClick={() => navigate("/")}>Home</li>
                        <li className={`cursor-pointer py-3 px-2 text-sm font-semibold ${pathMatchRoute("/shop") ? "text-black border-b-green-900 border-b-[3px]" : "text-gray-600 border-b-transparent"}`} onClick={() => navigate("/shop")}>Shop</li>
                        <li className={`cursor-pointer py-3 px-2 text-sm font-semibold ${pathMatchRoute("/sign-in") ? "text-black border-b-green-900 border-b-[3px]" : "text-gray-600 border-b-transparent"}`} onClick={() => navigate("/sign-in")}>Sign in</li>
                    </ul>
                </div>
            </header>
        </div>
    )
}