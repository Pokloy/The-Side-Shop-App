import AppNavbar from './components/AppNavbar';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Products';
import ProductView from './pages/ProductsView'
import AddProducts from './pages/AddProduct';
import CheckOut from './pages/CheckOut';
import OrderHistory from './pages/OrderHistory';
import AllUserPage from './pages/AllUserPage';


import Footer from './components/Footer'

import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';



function App() {

  const [user, setUser] = useState({
  id: null,
  isAdmin: null
  })


  const unsetUser = () => {
    localStorage.clear();
  }


    useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (typeof data._id !== "undefined") {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });

      } else {

        setUser({
            id: null,
            isAdmin: null
        })
      }
    })
  }, [])



  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
            <AppNavbar />
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path="/products/:productId" element={<ProductView/>}/>
              <Route path="/addProducts" element={<AddProducts/>}/>
              <Route path="/checkout" element={<CheckOut/>}/>
              <Route path="/orderHistory" element={<OrderHistory/>}/>
              <Route path="/allUser" element={<AllUserPage/>}/>
            </Routes>
            <Footer />
      </Router>
    </UserProvider>  
  );
}

export default App;
