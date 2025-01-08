import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
export default function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const {name, email} = formData;
  function onLogout() {
    auth.signOut().then(() => {
      navigate('/');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  }

  useEffect(() => {
    async function fetchUserData() {
      if (auth.currentUser) {
        const user = auth.currentUser;
        setIsAdmin(user.admin);
      }
    };
    async function fetchOrders () {
      if (auth.currentUser) {
        const user = auth.currentUser;
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userEmail', '==', user.email));
        const querySnapshot = await getDocs(q);
        const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
      }
    };
    fetchUserData();
    fetchOrders();
  }, [auth]);
  
  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>
          My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3 '>
          <form>


            <div className="w-full  flex justify-center px-4 py-2 text-xl mb-6 border-b-2
              text-green-800 bg-white rounded transition ease-in-out font-semibold"> {name} </div>

              <div className="w-full flex justify-center px-4 py-2 text-xl mb-6 border-b-2
              text-green-800 bg-white rounded transition ease-in-out font-semibold"> {email}</div>
              <p>
                user.admin
              </p>
              <div className='flex justify-end whitespace-nowrap text-sm sm:text-lg'>
                <p onClick={onLogout} className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer'>
                  Sign out
                </p>
              </div>
          </form>
      {!isAdmin && (
        <>
          <h1 className="text-xl text-center font-bold mt-10 mb-6">Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} className="mb-4 p-4 border border-gray-300 rounded">
              <h2 className="text-xl font-semibold mb-2">Order ID: {order.id}</h2>
              <p className="mb-2"><strong>Date:</strong> {new Date(order.timestamp.seconds * 1000).toLocaleDateString()}</p>
              <p className="mb-2"><strong>Total Price:</strong> {order.totalPrice} RON</p>
              <h3 className="text-lg font-semibold mb-2">Order Details:</h3>
              <ul className="list-disc list-inside">
                {order.orderDetails.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} x {item.price} RON
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
        </>
      )}
      </div>
      </section>
    </>
  )
}
