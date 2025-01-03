import { useState } from 'react'

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: 200,
    image: '',
    description: '',
  })
  const { name, price, image, description } = formData
  function onChange() {}
  return (
    <main className='max-w-lg mx-auto px-2'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Add Product</h1>
      <form className='mt-6 border-black border-2 px-10 py-4 rounded-sm'>
        <div className='mb-4'>
          <p className='text-xl mt-6 font-semibold'>
            Name
          </p>
          <input
            type='text'
            id='name'
            value={name}
            onChange={onChange}
            placeholder='Product Name'
            maxLength={32}
            minLength={10}
            required
            className='w-full px-4 py-2 text-xl  text-gray-700 bg-white border 
            border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:ring-green-700 focus:border-green-700 mb-6'
          />
        </div>
        <div className='mb-4'>
          <p className='text-xl mt-6 font-semibold'>
            Price
          </p>
          <input
            type='number'
            id='price'
            value={price}
            onChange={onChange}
            placeholder='Product Price'
            min="100"
            max="2000"
            required
            className='w-full px-4 py-2 text-xl  text-gray-700 bg-white border 
            border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:ring-green-700 focus:border-green-700 mb-6'
          />
        </div>
        <div className='mb-4'>
          <p className='text-xl mt-6 font-semibold'>
            Description
          </p>
          <input
            type='text'
            id='description'
            value={description}
            onChange={onChange}
            placeholder='Product Description'
            maxLength={100}
            minLength={20}
            required
            className='w-full px-4 py-2 text-xl  text-gray-700 bg-white border 
            border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:ring-green-700 focus:border-green-700 mb-6'
          />
        </div>
        <div className='mb-4'>
          <p className='text-xl mt-6 font-semibold'>
            Images
          </p>
          <p className='text-sm text-gray-600'>
            The first image will be used as the main image for the product.
            (Max 5 images)
          </p>
          <input
            type='file'
            id='images'
            onChange={onChange}
            accept='.jpg,.jpeg,.png'
            multiple
            required
            className='w-full px-3 py-1.5 text-xl  text-gray-700 bg-white border 
            border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:ring-green-700 focus:border-green-700 mb-6'
          />
        </div>
        <button type='submit' className='w-full mb-6 px-7 py-3 bg-green-950 hover:bg-green-900 text-white font-medium rounded
        text-md shadow-md hover:shadow-lg transition duration-150 ease-in-out
        focus:bg-green-800 focus:shadow-lg active:bg-green-700 active:shadow-lg'>
          Add Product
        </button>
      </form>
    </main>
  )
}
