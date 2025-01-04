import { useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs, doc } from 'firebase/firestore'
import { useState } from 'react'
import ProductItem from '../components/ProductItem'

export default function EditProducts() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProducts() {
        const productRef = collection(db, 'products');
        const snapshot = await getDocs(productRef);
        let products = [];
        snapshot.forEach((doc) => {
            return products.push({
                id: doc.id,
                data: doc.data(),
            });
        });
        setProducts(products);
        setLoading(false);
    }
    fetchProducts();
  }, [])
  return (
    <main className='max-w-xl mx-auto px-2 py-4'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Edit Products</h1>
      <div>
        {!loading && products.length >0  && (
            <>
            <ul>
                {products.map((product)=> (
                    <ProductItem 
                        key={product.id} 
                        id={product.id}
                        product={product.data}
                    />
                ))}
            </ul>
            </>
        )}
      </div>
    </main>
  )
}
