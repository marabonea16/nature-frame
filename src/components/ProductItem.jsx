import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
export default function ProductItem({product, id, onEdit, onDelete}) {
  return (
    <li className='relative bg-white flex flex-col justify-between items-center
    shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow
    duration-150 ease-in-out m-[10px]'>
        <Link className='contents'
        to={`/products/${id}`}>
            <img className="h-[170px] w-full object-cover hover:scale-105 
            transition-scale duration-200 ease-in" 
             loading='lazy'
             src={product.imgUrls[0]}/>
            <div className='p-[10px] w-full'>
                <p className='text-xl font-semibold m-0 truncate '>
                    {product.name}
                </p>
                <p className='text-[#195e24] mt-2 font-semibold'>
                    {product.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
            </div>
        </Link>
        {onDelete && (
            <FaTrash className='absolute bottom-2 right-2 
            h-[14px] cursor-pointer text-red-700'
            onClick={() => onDelete(id)}
            />
            
        )}
        {onEdit && (
            <MdEdit className='absolute bottom-2 right-7 
            h-[14px] cursor-pointer text-green-800'
            onClick={() => onEdit(id)}
            />
            
        )}
    </li>
  )
}
