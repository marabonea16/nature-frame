import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { UserProvider, UserContext } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <UserContext.Consumer>
          {({ isAdmin }) => (
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
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/products" element={<Products />} />
              </Routes>
            </>
          )}
        </UserContext.Consumer>
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

export default App;