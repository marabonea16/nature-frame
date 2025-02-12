import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import image from '../assets/images/logo.jpeg';

export default function HeaderAdmin() {
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
                        <li className={`cursor-pointer py-3 px-2 text-sm font-semibold ${pathMatchRoute("/admin-dashboard") ? "text-black border-b-green-900 border-b-[3px]" : "text-gray-600 border-b-transparent"}`} onClick={() => navigate("/admin-dashboard")}>Admin Dashboard</li>
                        <li className={`cursor-pointer py-3 px-2 text-sm font-semibold ${pathMatchRoute("/products") ? "text-black border-b-green-900 border-b-[3px]" : "text-gray-600 border-b-transparent"}`} onClick={() => navigate("/products")}>Products</li>
                        <li className={`cursor-pointer py-3 px-2 text-sm font-semibold ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile"))  ? "text-black border-b-green-900 border-b-[3px]" : "text-gray-600 border-b-transparent"}`} 
                            onClick={() => navigate("/profile")}
                            >{pageState}</li>
                    </ul>
                </div>
            </header>
        </div>
    )
}