import React, { useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import HeaderAdmin from './components/HeaderAdmin';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Shop from './pages/Shop';
import AdminDashboard from './pages/AdminDashboard';
import Products from './pages/Products';
import Product from './pages/Product';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import { UserProvider, UserContext } from './context/UserContext';
import { CartProvider, CartContext } from './context/CartContext';

function App() {



  return (
    <UserProvider>
     <CartProvider>
      <Router>
        <Main />
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
     </CartProvider>
    </UserProvider>
  );
}

function Main() {
  const { isAdmin, setIsAdmin, checkingStatus, setCheckingStatus } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (!checkingStatus) {
      if (isAdmin && location.pathname === '/') {
        navigate('/admin-dashboard');
      }
    }
  }, [isAdmin, checkingStatus, location, navigate]);

  return (
    <>
      {isAdmin ? <HeaderAdmin /> : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/admin-dashboard" element={<AdminRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/products" element={<AdminRoute />}>
          <Route path="/products" element={<Products />} />
        </Route>
        <Route path="/add-product" element={<AdminRoute />}>
          <Route path="/add-product" element={<AddProduct />} />
        </Route>
        <Route path="/edit-product" element={<AdminRoute />}>
          <Route path="/edit-product/:productId" element={<EditProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;