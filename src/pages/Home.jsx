import Slider from '../components/Slider';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, limit, orderBy, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import ProductItem from '../components/ProductItem';
export default function Home() {
  const [recentProducts, setRecentProducts] = useState(null); 
  useEffect(() => {
    async function fetchRecentProducts() {
      try {
          const productsRef = collection(db, 'products');
          const q = query(productsRef, orderBy("timestamp", "desc"), limit(4));
          const querySnap = await getDocs(q);
          let products = [];
          querySnap.forEach((doc) => {
            return products.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setRecentProducts(products);
      } catch (error) {
        console.error("Error fetching recent products: ", error);
      }
    }
    fetchRecentProducts();
  }, []);

  const [saleProducts, setSaleProducts] = useState(null); 
  useEffect(() => {
    async function fetchSaleProducts() {
      try {
          const productsRef = collection(db, 'products');
          const q = query(productsRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(4));
          const querySnap = await getDocs(q);
          let products = [];
          querySnap.forEach((doc) => {
            return products.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setSaleProducts(products);
      } catch (error) {
        console.error("Error fetching discounted products: ", error);
      }
    }
    fetchSaleProducts();
  }, []);
  return (
    <div>
      <Slider/>
      <div className='max-w-6xl mx-auto pt-4space-y-6'>
        {recentProducts && recentProducts.length > 0 && (
            <div className='m-2 mb-6'>
              <h2 className='px-3 text-2xl mt-6 font-semibold'>
                Recently added products </h2>
                <Link to ='/shop'>
                  <p className='px-3 text-sm text-green-800 hover:text-green-900
                  transition duration-150 ease-in-out'> 
                    Show more products
                  </p> 
                </Link>
                <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 
                xl:grid-cols-4 sm:gap-4'>
                  {recentProducts.map((product) => (
                    <ProductItem 
                      key={product.key} 
                      product={product.data}
                      id={product.id}
                      />
                  ))}
                </ul>
             
            </div>
        )}
        {saleProducts && saleProducts.length > 0 && (
            <div className='m-2 mb-6'>
              <h2 className='px-3 text-2xl mt-6 font-semibold'>
                Sale products </h2>
                <Link to ='/shop'>
                  <p className='px-3 text-sm text-green-800 hover:text-green-900
                  transition duration-150 ease-in-out'> 
                    Show more products
                  </p> 
                </Link>
                <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 
                xl:grid-cols-4 sm:gap-4'>
                  {saleProducts.map((product) => (
                    <ProductItem 
                      key={product.key} 
                      product={product.data}
                      id={product.id}
                      />
                  ))}
                </ul>
            </div>
        )}
      </div>
    </div>
  )
}
