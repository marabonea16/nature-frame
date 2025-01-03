import { Link } from 'react-router-dom';

export default function ProductItem({product, id}) {
  return (
    <li className='relative bg-white flex flex-col justify-between items-center
    shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow
    duration-150 ease-in-out m-[10px]'>
        <Link className='contents'
        to={`/products/${id}`}>
            <img className="h-[170px] w-full object-cover hover:scale-105 
            transition-scale duration-200 ease-in" 
             loading='lazy'
             src={products.imgUrls[0]}/>
            <div className='p-[10px] w-full'>
                <p className='text-xl font-semibold m-0 truncate '>
                    {products.name}
                </p>
                <p className='text-[#195e24] mt-2 font-semibold'>
                    {products.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
            </div>
        </Link>
    </li>
  )
}
