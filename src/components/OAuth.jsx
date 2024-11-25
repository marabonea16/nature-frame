import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { db } from "../firebase.js";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick(){
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(), 
        });
      } 
      navigate("/");
    } catch (error) {
      toast.error("Could not authenticate with Google. Please try again.")
    }
  }
  async function onFacebookClick(){
    try {
      const auth = getAuth();
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(), 
        });
      } 
      navigate("/");
    } catch (error) {
      toast.error("Could not authenticate with Facebook. Please try again.")
    }
  }
  return (
    <div className='justify-center space-y-6'>
      <button 
        type = "button"
        onClick={onFacebookClick}
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
         type = "button"
         onClick={onGoogleClick}
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