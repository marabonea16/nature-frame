import ProductItem from '../components/ProductItem';
import { db } from '../firebase';
import { collection, getDocs, query, limit, orderBy, startAfter } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Spinner from "../components/Spinner";
import { useNavigate } from 'react-router-dom';

export default function Shop() {
  const [products, setProducts] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [lastFetchedProduct, setLastFetchedProduct] = useState(null); 
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProducts() {
      try {
          const productsRef = collection(db, 'products');
          const q = query(productsRef, orderBy("timestamp", "desc"), limit(16));
          const querySnap = await getDocs(q);
          const lastVisible = querySnap.docs[querySnap.docs.length - 1];
          setLastFetchedProduct(lastVisible);
          let products = [];
          querySnap.forEach((doc) => {
            return products.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setProducts(products);
          setLoading(false);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    }
    fetchProducts();
  }, []);
  async function onFetchMoreProducts() {
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, orderBy("timestamp", "desc"), limit(8), startAfter(lastFetchedProduct));
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedProduct(lastVisible);
      let products = [];
      querySnap.forEach((doc) => {
        return products.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setProducts((prevState)=>[...prevState, ...products]);
      setLoading(false);
  } catch (error) {
    console.error("Error fetching products: ", error);
  }
  }

  return (
    <div className='px-3 py-5'>
      <h1 className='text-3xl text-center font-bold mt-6 mb-6'>
        Shop
      </h1>
      {loading ? (
        <Spinner />
      ) : products && products.length > 0 ? (
        <>
          <main >
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
            2xl:grid-cols-5'>
              {products.map((product) => (
                <ProductItem key={product.id} product={product.data} id={product.id} />
              ))}
            </ul>
          </main>
          {lastFetchedProduct && (
            <div className='flex justify-center items-center'>
              <button onClick={onFetchMoreProducts}
              className='bg-green-800 px-3 py-1.5 text-white 
              rounded-md mb-6 mt-6 border border-green-950
              hover:border-black transition duration-150 ease-in-out
              hover:bg-green-900'>
                Load More
              </button>
            </div>
          )}
        </>
        ) : (
          navigate('/shop')
          )}
    </div>
  )
}
