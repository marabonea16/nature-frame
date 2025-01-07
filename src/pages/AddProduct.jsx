import { useEffect, useState } from 'react'
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';  
import { addDoc, collection, serverTimestamp, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function AddProduct() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    ID: 1,
    name: '',
    offer: false,
    price: 200,
    salePrice: 0,
    description: '',
    images: {},
  });
  useEffect(() => {
    async function fetchProducts() {
        const productRef = collection(db, 'products');
        const q = query(productRef, orderBy('timestamp'));
        const snapshot = await getDocs(q);
        if(snapshot.size === 0) {
          console.log("first one")
            setFormData((prevState)=>({
                ...prevState,
                ID: 1
                
            }))
        } else {
            let lastId = 0;
            snapshot.forEach((doc) => {
                lastId = doc.data().ID;
            });
            setFormData((prevState)=>({
                ...prevState,
                ID: lastId + 1
            }))
        }
    }
    fetchProducts();
  }, [])
  const { price, salePrice, offer } = formData;
  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if(e.target.files) {
      setFormData((prevState)=>({
        ...prevState,
        images: e.target.files
      }))
    }
    if(!e.target.files) {
      setFormData((prevState)=>({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value
      }))
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { images, ...restFormData} = formData;
    if (+salePrice >= +price) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }
    if(images.length > 5) {
      setLoading(false);
      toast.error('You can only upload up to 5 images');
      return;
    }
    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error)=>{
          setLoading(false);
          toast.error('Failed to upload images');
          return;
      });

    const formDataCopy = { 
      ...restFormData, 
      imgUrls,
      timestamp: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "products"), formDataCopy);
    setLoading(false);
    toast.success('Product added successfully');
    navigate(`/products/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className='max-w-xl mx-auto px-2 py-4'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Add Product</h1>
      <form onSubmit={onSubmit} className='mt-6 border-black border-2 px-10 py-4 rounded-sm'>
      <div className='mb-4'>
          <p className='text-xl mt-6 font-semibold'>
            ID
          </p>
          <input
            type='number'
            id='id'
            value={formData.ID}
            readOnly
            className='w-full px-4 py-2 text-xl  text-gray-700 bg-white border 
            border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:ring-green-700 focus:border-green-700 mb-6'
          />
        </div>
        <div className='mb-4'>
          <p className='text-xl mt-6 font-semibold'>
            Name
          </p>
          <input
            type='text'
            id='name'
            value={formData.name}
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
            Description
          </p>
          <input
            type='text'
            id='description'
            value={formData.description}
            onChange={onChange}
            placeholder='Product Description'
            maxLength={500}
            minLength={20}
            required
            className='w-full px-4 py-2 text-xl  text-gray-700 bg-white border 
            border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:ring-green-700 focus:border-green-700 mb-6'
          />
        </div>
        <p className="text-lg font-semibold">Offer</p>
        <div className="mb-4 flex">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-white text-black" : "bg-green-800 text-white"
            }`}
          >
            yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-white text-black" : "bg-green-800 text-white"
            }`}
          >
            no
          </button>
        </div>
        <div className='mb-4 '>
          <p className='text-xl mt-6 font-semibold'>
            Price
          </p>
          <input
            type='number'
            id='price'
            value={formData.price}
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
        {offer && (
        <div className='mb-4'>
          <p className='text-xl mt-6 font-semibold'>
            Sale Price
          </p>
          <input
            type='number'
            id='salePrice'
            value={formData.salePrice}
            onChange={onChange}
            placeholder='Sale Price'
            min="100"
            max="2000"
            required = {offer}
            className='w-full px-4 py-2 text-xl  text-gray-700 bg-white border 
            border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:ring-green-700 focus:border-green-700 mb-6'
          />
        </div>
        )}
        
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
