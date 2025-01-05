import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from "swiper/react";
import { 
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
} from "swiper/modules"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { FaShare } from "react-icons/fa";
import { UserContext } from '../context/UserContext';


export default function Product() {
  const params = useParams();
  const { isAdmin } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  useEffect(() => {
    async function fetchProduct() {
      const docRef = doc(db, 'products', params.productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.productId]);
  
  const handleAddToCart = () => {
    // Add to cart logic here
  };

  if (loading) {
    return <Spinner />;
  }
  
  return (
    <main>
      <Swiper
        className="max-w-4xl mx-auto my-6"
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        effect="fade"
        autoplay={{ delay: 3000 }}
        navigation
        slidesPerView={1}
        pagination={{ type: "progressbar" }}>
        {product && product.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="object-contain h-[500px] w-full mx-auto"
              style={{
                background: `url(${product.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='fixed top-[25%] right-[3%] z-50 
      cursor-pointer border-2 border-green-900 bg-green-800 bg-opacity-30
      rounded-full w-10 h-10 flex justify-center items-center'
      onClick={() => {
        navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        setTimeout(() => {
          setShareLinkCopied(false)
        }, 2000)
      }}>
        <FaShare className='text-lg text-white'/>
      </div>
      {shareLinkCopied && (
      <p className='fixed top-[31%] right-[5%] font-semibold
      border-2 border-green-900 rounded-md z-50 bg-white p-2'>
        Link Copied
      </p>
        )}
      <div className='p-4 max-w-6xl lg:mx-auto rounded-lg 
      shadow-lg bg-white '>
        <div className='w-full h-[200px] lg-[400px]'>
          <p className='text-2xl font-bold mb-3 text-green-900
          '>
            {product.name} - {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} RON
          </p>
          <p className="mt-3 mb-3">          
            {product.description}
          </p>
          {!isAdmin && (
            <button
              className='bg-green-700 text-white px-4 py-2 rounded'
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </main>
  );
}