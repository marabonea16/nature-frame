import React, { useContext, useEffect } from 'react';
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
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AddProduct from './pages/AddProduct';
import EditProducts from './pages/EditProducts';
import { UserProvider, UserContext } from './context/UserContext';

function App() {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}

function Main() {
  const { isAdmin, checkingStatus } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

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
        <Route path="/admin-dashboard" element={<AdminRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/products" element={<AdminRoute />}>
          <Route path="/products" element={<Products />} />
        </Route>
        <Route path="/add-product" element={<AdminRoute />}>
          <Route path="/add-product" element={<AddProduct />} />
        </Route>
        <Route path="/edit-products" element={<AdminRoute />}>
          <Route path="/edit-products" element={<EditProducts />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;