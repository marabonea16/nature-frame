import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';

export default function Product() {
  const params = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
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
  
  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please sign in first or create an account");
      navigate("/sign-in");
      return;
    }
    const success = await addToCart({ ...product, id: params.productId, quantity: 1 });
    if(success) {
      toast.success("Product added to cart successfully!");
    } else {
      toast.error("Product could not be added to cart. Please try again later");
    }
  };

  if (loading) {
    return <Spinner />;
  }
  
  return (
    <main className="max-w-4xl mx-auto my-6">
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
      <div className='p-4 max-w-6xl lg:mx-auto rounded
      shadow-lg bg-white '>
        <div className='w-full h-[200px] lg-[400px]'>
          <p className='text-2xl font-bold mb-3 text-green-900
          '>
            {product.name} - {product.offer ? (
              <>
                <span className='line-through text-red-500'>
                  {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} RON
                </span>
                <span className='ml-2'>
                  {product.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} RON
                </span>
              </>
            ) : (
              `${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} RON`
            )}
          </p>
          <p className="mt-3 mb-3">          
            {product.description}
          </p>
          {!isAdmin && (
            <button
              className=' bg-green-700 text-white 
              px-6 py-3 mt-4 rounded text-sm font-medium uppercase 
              shadow-md hover:bg-green-800 transition 
              duration-150 ease-in-out hover:shadow-lg
            active:bg-green-900'
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