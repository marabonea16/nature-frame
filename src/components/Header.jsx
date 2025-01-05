import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import image from '../assets/images/logo.jpeg';
import { FaUser, FaShoppingCart } from 'react-icons/fa';


export default function Header() {
    const [pageState, setPageState] = useState("Sign in")
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPageState("Profile")
            } else {
                setPageState("Sign in")
            }
        })
    }, [auth])
    const [currentPath, setCurrentPath] = useState(location.pathname)

    useEffect(() => {
        setCurrentPath(location.pathname)
    }, [location.pathname])

    function pathMatchRoute(route) {
        return route === currentPath
    }

    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
            <header className="flex justify-between items-center px-4 max-w-6xl mx-auto">
                <div className='mt-[-10px]'>
                    <img src={image} alt="key" onClick={() => navigate("/")} className='h-40'/>
                </div>
                <div>
                    <ul key={currentPath} className='flex space-x-4 md:space-x-10'>
                        <li className={`cursor-pointer py-3 px-2 text-sm font-semibold ${pathMatchRoute("/") ? "text-black border-b-green-900 border-b-[3px]" : "text-gray-600 border-b-transparent"}`} onClick={() => navigate("/")}>Home</li>
                        <li className={`cursor-pointer py-3 px-2 text-sm font-semibold ${pathMatchRoute("/shop") ? "text-black border-b-green-900 border-b-[3px]" : "text-gray-600 border-b-transparent"}`} onClick={() => navigate("/shop")}>Shop</li>
                        <li className={`cursor-pointer py-3 px-2 text-sm font-semibold ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile"))  ? "text-black border-b-green-900 border-b-[3px]" : "text-gray-600 border-b-transparent"}`} 
                            onClick={() => navigate("/profile")}
                        >
                            <FaUser className="text-lg" />
                        </li>
                         <li className={`cursor-pointer py-3 px-2 text-sm font-semibold ${pathMatchRoute("/cart") ? "text-black border-b-green-900 border-b-[3px]" : "text-gray-600 border-b-transparent"}`} 
                            onClick={() => navigate("/cart")}
                        >
                            <FaShoppingCart className="text-lg" />
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    )
}