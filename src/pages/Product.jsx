import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
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
export default function Product() {
  const params = useParams();
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
  console.log(product)
  console.log("yes")
  if (loading) {
    return <Spinner />;
  }
  
  return (
    <main>
      <Swiper
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        effect="fade"
        autoplay={{ delay: 3000 }}
        navigation
        slidesPerView={1}
        pagination={{ type: "progressbar" }}>
        {product && product.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative overflow-hidden h-[370px] w-full"
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
    </main>
  );
}