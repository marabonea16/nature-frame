import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderDetails = cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.offer ? item.salePrice : item.price,
      }));

      try {
        await addDoc(collection(db, 'orders'), {
          userEmail: user.email,
          shippingInfo,
          orderDetails,
          totalPrice: totalPrice.toFixed(2),
          timestamp: new Date(),
        });
      } catch (error) {
        console.error('Error adding order to Firestore:', error);
      }

      const functions = getFunctions();
      const sendOrderConfirmation = httpsCallable(functions, 'sendOrderConfirmation');
      try {
        await sendOrderConfirmation({
          email: shippingInfo.email,
          name: shippingInfo.name,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
          city: shippingInfo.city,
          postalCode: shippingInfo.postalCode,
          country: shippingInfo.country,
          totalPrice: totalPrice.toFixed(2),
          orderDetails: JSON.stringify(orderDetails, null, 2),
        });
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Failed to send email:', error);
      }
  
    await clearCart();
    navigate('/order-confirmation');
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.offer ? item.salePrice : item.price) * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-6">Checkout</h1>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img src={item?.imgUrls?.slice().sort()[0]}  className="w-30 h-40 object-cover mr-4 " />
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">{item.offer ? item.salePrice : item.price} RON</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-right mt-6 border-t pt-4">
              <h2 className="text-2xl font-bold">Total: {totalPrice.toFixed(2)} RON</h2>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className='lg:w-1/2 mx-auto'>
        <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
        <div className="mb-4">
          <p className="text-lg mt-6 font-semibold">Name</p>
          <input
            type="text"
            name="name"
            id="name"
            value={shippingInfo.name}
            onChange={handleShippingChange}
            className='w-full px-4 py-2 text-xl  text-gray-700 bg-white border 
            border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:ring-green-700 focus:border-green-700 mb-6'
            required
          />
        </div>
        <div className="mb-4">
          <p className="text-lg mt-6 font-semibold">Email</p>
          <input
            type="email"
            name="email"
            id="email"
            value={shippingInfo.email}
            onChange={handleShippingChange}
            className='w-full px-4 py-2 text-xl  text-gray-700 bg-white border 
            border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:ring-green-700 focus:border-green-700 mb-6'
            required
          />
        </div>
        <div className="mb-4">
          <p className="text-lg mt-6 font-semibold">Phone</p>
          <input
            type="text"
            name="phone"
            id="phone"
            value={shippingInfo.phone}
            onChange={handleShippingChange}
            className='w-full px-4 py-2 text-xl  text-gray-700 bg-white border 
            border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:ring-green-700 focus:border-green-700 mb-6'
            required
          />
        </div>
        <div className="mb-4">
          <p className="text-lg mt-6 font-semibold">Address</p>
          <input
            type="text"
            name="address"
            id="address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
            className='w-full px-4 py-2 text-xl  text-gray-700 bg-white border 
            border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:ring-green-700 focus:border-green-700 mb-6'
            required
          />
        </div>
        <div className="mb-4">
          <p className="text-lg mt-6 font-semibold">City</p>
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={handleShippingChange}
            className='w-full px-4 py-2 text-xl  text-gray-700 bg-white border 
            border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:ring-green-700 focus:border-green-700 mb-6'
            required
          />
        </div>
        <div className="mb-4">
          <p className="text-lg mt-6 font-semibold">Postal Code</p>
          <input
            type="text"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleShippingChange}
            className='w-full px-4 py-2 text-xl  text-gray-700 bg-white border 
            border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:ring-green-700 focus:border-green-700 mb-6'
            required
          />
        </div>
        <div className="mb-4">
          <p className="text-lg mt-6 font-semibold">Country</p>
          <input
            type="text"
            name="country"
            value={shippingInfo.country}
            onChange={handleShippingChange}
            className='w-full px-4 py-2 text-xl  text-gray-700 bg-white border 
            border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:ring-green-700 focus:border-green-700 mb-6'
            required
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
        <p className="mb-4">Payment will be done at delivery.</p>

        <button type="submit" className=" bg-green-700 text-white 
              px-6 py-3 mt-4 rounded text-sm font-medium uppercase 
              shadow-md hover:bg-green-800 transition 
              duration-150 ease-in-out hover:shadow-lg
            active:bg-green-900 w-full mb-8">
          Place Order
        </button>
      </form>
    </div>
  );
}