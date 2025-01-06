import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

import { Link } from 'react-router-dom'
export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleQuantityChange = (productId, event) => {
    const quantity = parseInt(event.target.value, 10);
    updateQuantity(productId, quantity);
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.offer ? item.salePrice : item.price) * item.quantity, 0);
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Link className='content' to={`/products/${item.id}`}>
                <img src={item?.imgUrls?.slice().sort()[0]}  className="w-30 h-40 object-cover mr-4 hover:scale-105 
          transition-scale duration-200 ease-in" />
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">{item.offer ? (
              <>
                <span className='line-through text-red-500'>
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} RON
                </span>
                <span className='ml-2'>
                  {item.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} RON
                </span>
              </>
            ) : (
              `${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} RON`
            )}</p>
                </div>
                </Link>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) => handleQuantityChange(item.id, event)}
                  className="w-16 p-2 border border-gray-300 rounded mr-4"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-6 border-t pt-4">
            <h2 className="text-2xl font-bold">Total: {totalPrice.toFixed(2)} RON</h2>
            {cartItems.length > 0 && (
            <Link to="/checkout">
            <button className=" bg-green-700 text-white 
              px-6 py-3 mt-4 rounded text-sm font-medium uppercase 
              shadow-md hover:bg-green-800 transition 
              duration-150 ease-in-out hover:shadow-lg
            active:bg-green-900"
            type='submit'>
              Proceed to Checkout
            </button>
            </Link>
            )}
          </div>
        </div>

      )}
    </div>
  );
}