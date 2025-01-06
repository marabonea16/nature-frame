import { getAuth } from 'firebase/auth';
import React, { createContext, useState } from 'react';
import { db } from '../firebase';
import { useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    if(user) {
      fetchCartItems();
    }
  }, [user]);
  const fetchCartItems = async () => {
    const cartRef = collection(db, 'users', user.uid, 'cart');
    const cartSnap = await getDocs(cartRef);
    let items = [];
    cartSnap.forEach((doc) => {
      return items.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    setCartItems(items);
  };

  const addToCart = async (product) => {
    if (!user) {
      return false;
    }
    const cartRef = collection(db, 'users', user.uid, 'cart');
    const existingItem = cartItems.find(item => item.id === product.id);
    const price = product.offer ? product.salePrice : product.price;

    if (existingItem) {
      const itemRef = doc(db, 'users', user.uid, 'cart', existingItem.id);
      await updateDoc(itemRef, { quantity: existingItem.quantity + 1 });
      setCartItems((prevItems) =>
        prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      const docRef = await addDoc(cartRef, {
        productId: product.id,
        name: product.name,
        price: price,
        imgUrl: product.imgUrls[0],
        quantity: 1,
      });
      setCartItems((prevItems) => [...prevItems, { id: docRef.id, ...product, quantity: 1 }]);
    }
    return true;
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      const itemRef = doc(db, 'users', user.uid, 'cart', item.id);
      await deleteDoc(itemRef);
      setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;
    const item = cartItems.find(item => item.productId === productId);
    if (item) {
      const itemRef = doc(db, 'users', user.uid, 'cart', item.id);
      await updateDoc(itemRef, { quantity });
      setCartItems((prevItems) =>
        prevItems.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};