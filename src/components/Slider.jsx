import { collection, getDocs, query, limit } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
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
import { useNavigate } from "react-router-dom";

export default function Slider() {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
      async function fetchProducts() {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, limit(5));
        const querySnap = await getDocs(q);
        let products = [];
        querySnap.forEach((doc) => {
          return products.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setProducts(products);
        setLoading(false);
      }
      fetchProducts();
    }, []);

  if (loading) {
    return <Spinner />;
  }
  if (products.length === 0) {
    return <></>;
  }
  return (
    products && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 3000 }}
        >
          {products.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/products/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "contain",
                }}
                className="relative w-full h-[400px] overflow-hidden"
              ></div>
              <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#0f5e09] shadow-lg opacity-90 p-2 rounded-br-3xl">
                {data.name}
              </p>
              <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#0f5e09] shadow-lg opacity-90 p-2 rounded-tr-3xl">
              {data.offer ? (
              <>
                <span className='line-through text-red-500'>
                  {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} RON
                </span>
                <span className='ml-2'>
                  {data.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} RON
                </span>
              </>
            ) : (
              `${data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} RON`
            )}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}