import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import image from '../assets/images/unknown.jpeg';

export default function ProductItem({ product, id, onEdit, onDelete }) {
  const sortedImgUrls = product?.imgUrls?.slice().sort() || [];

  return (
    <li className='relative bg-white flex flex-col justify-between items-center
    shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow
    duration-150 ease-in-out'>
      <Link className='content' to={`/products/${id}`}>
        <img
          className="w-full max-h-[300px] object-contain hover:scale-105 
          transition-scale duration-200 ease-in"
          loading='lazy'
          src={sortedImgUrls[0] || image}
        />
        <div className='p-[10px] w-full'>
          <p className='text-xl font-semibold m-0 truncate'>
            {product?.name || 'Unknown Product'}
          </p>
          <p className='text-[#195e24] mt-2 font-semibold'>
          {product.offer ? (
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
          <p className='text-sm m-0 text-gray-600'>
            {product?.description || 'Unknown Description'}
          </p>
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className='absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-700'
          onClick={() => onDelete(id)}
        />
      )}
      {onEdit && (
        <MdEdit
          className='absolute bottom-2 right-7 h-[14px] cursor-pointer text-green-800'
          onClick={() => onEdit(id)}
        />
      )}
    </li>
  );
}