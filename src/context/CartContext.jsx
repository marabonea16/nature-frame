import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useState } from 'react';
import { db } from '../firebase';
import { useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const auth = getAuth();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchCartItems(currentUser);
      } else {
        setCartItems([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  async function fetchCartItems(currentUser) {
    const cartRef = collection(db, 'users', currentUser.uid, 'cart');
    const cartSnap = await getDocs(cartRef);
    let items = [];
    cartSnap.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setCartItems(items);
  };
  
  async function addToCart(product, productId) {
    if (!user) {
      return false;
    }
    const cartRef = collection(db, 'users', user.uid, 'cart');
    const existingItem = cartItems.find(item => item.ID === product.ID);
    const price = product.offer ? product.salePrice : product.price;

    if (existingItem) {
      //console.log("existing item");
      const itemRef = doc(db, 'users', user.uid, 'cart', existingItem.id);
      await updateDoc(itemRef, { quantity: existingItem.quantity + 1 });
      setCartItems((prevItems) =>
        prevItems.map(item =>
          item.ID === product.ID ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      //console.log("new item");
      const docRef = await addDoc(cartRef, {
        ID: product.ID,
        productId: product.id,
        name: product.name,
        price: price,
        imgUrl: product.imgUrls[0],
        quantity: 1,
      });
      setCartItems((prevItems) => [...prevItems, { id: docRef.id, ID: product.ID, productId: product.id, name: product.name, price: price, imgUrl: product.imgUrls[0], quantity: 1 }]);
    }
    return true;
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    const item = cartItems.find(item => item.ID === productId);
    if (item) {
      const itemRef = doc(db, 'users', user.uid, 'cart', item.id);
      await deleteDoc(itemRef);
      setCartItems((prevItems) => prevItems.filter(item => item.ID !== productId));
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;
    const item = cartItems.find(item => item.ID=== productId);
    if (item) {
      const itemRef = doc(db, 'users', user.uid, 'cart', item.id);
      await updateDoc(itemRef, { quantity });
      setCartItems((prevItems) =>
        prevItems.map(item =>
          item.ID === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = async () => {
    if (!user) return;
    const cartRef = collection(db, 'users', user.uid, 'cart');
    const querySnap = await getDocs(cartRef);
    const batch = writeBatch(db);
    querySnap.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};