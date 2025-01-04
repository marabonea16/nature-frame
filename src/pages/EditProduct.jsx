import { useState, useEffect } from 'react'
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';  
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function EditProduct() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 200,
    description: '',
    images: {},
  });
  const params = useParams();
  useEffect(()=>{
    setLoading(true);
    async function fetchProducts() {
        const docRef = doc(db, "products", params.productId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            setProduct(docSnap.data());
            setFormData({...docSnap.data(), });
            setLoading(false);
        }else {
            navigate('/');
            toast.error('Product not found');
        }

    }
    fetchProducts();
  },[])
  function onChange(e) {
    if(e.target.files) {
      setFormData((prevState)=>({
        ...prevState,
        images: e.target.files
      }))
    }
    if(!e.target.files) {
      setFormData((prevState)=>({
        ...prevState,
        [e.target.id]: e.target.value
      }))
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { images, ...restFormData} = formData;
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
    const docRef = doc(db, "products", params.productId);
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success('Product edited successfully');
    navigate(`/products/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className='max-w-xl mx-auto px-2 py-4'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Edit Product</h1>
      <form onSubmit={onSubmit} className='mt-6 border-black border-2 px-10 py-4 rounded-sm'>
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
          Edit Product
        </button>
      </form>
    </main>
  )
}
