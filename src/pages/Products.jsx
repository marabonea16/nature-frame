import { useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { useState } from 'react'
import ProductItem from '../components/ProductItem'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Products() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
  async function onDelete(productId) {
    if(window.confirm('Are you sure you want to delete this product?')) {
        await deleteDoc(doc(db, 'products', productId));
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
        toast.success('Product deleted successfully');
    }   
  }
  function onEdit(productId) {
    navigate(`/edit-product/${productId}`);
  }
  return (
    <main className='max-w-xl mx-auto px-2 py-4 '>
      <h1 className='text-3xl text-center mt-6 font-bold'>Products</h1>
      <div>
        {!loading && products.length >0  && (
            <>
            <ul className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {products.map((product)=> (
                    <ProductItem 
                        key={product.id} 
                        id={product.id}
                        product={product.data}
                        onDelete={()=>onDelete(product.id)}
                        onEdit={()=>onEdit(product.id)}
                    />
                ))}
            </ul>
            </>
        )}
      </div>
    </main>
  )
}
