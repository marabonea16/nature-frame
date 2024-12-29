import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import Spinner from '../components/Spinner';

export default function Product() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
       async function fetchProduct() {
           const docRef = doc(db, "products", params.productId);
           const docSnap = await getDoc(docRef);
           if(docSnap.exists()) {
               setProduct(docSnap.data());
               setLoading(false);
           }
       }
         fetchProduct();

    }, [params.productId]);
    
    if(loading) {
        return <Spinner />
    }
    return <div>[product.title]</div>;
}
