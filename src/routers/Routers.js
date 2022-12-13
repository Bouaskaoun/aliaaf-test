import { Routes, Route, Navigate } from 'react-router-dom'
import AddProducts from '../pages/AddProducts'
import Home from '../pages/Home'
import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound'
import ProductDetails from '../pages/ProductDetails'
import Shop from '../pages/Shop'
import Signup from '../pages/Signup'
import UsersList from '../pages/UsersList'
import ProtectedRoute from './ProtectedRoute'

import { useSelector } from "react-redux";
import ProductList from '../pages/ProductList'
import Product from '../pages/Product'
import Users from '../pages/Users'
import User from '../pages/User'
import NewUser from '../pages/NewUser'

const Routers = () => {
  
  const user = useSelector((state) => state.user.currentUser);
  
  return (
    <Routes>
      <Route path='/' element={<Navigate to ='home' />} />
      <Route path='home' element={<Home />}/>
      <Route path='products' element={<ProductList />}/>
      <Route path='users' element={<Users />}/>
      <Route path='newUser' element={<NewUser />}/>
      <Route path='user/:id' element={<User />}/>
      <Route path='product/:id' element={<Product />}/>
      <Route path='login' element={user ? <Navigate to="/" /> : <Login />}/>
      <Route 
        path='addProducts'
        element={
          <ProtectedRoute>
            <AddProducts />
          </ProtectedRoute>
        }
      />
      <Route 
        path='shop/:id' 
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        }
      />
      <Route 
        path='shop'
        element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        }
      />
      <Route path='signup' element={<Signup />}/>
      <Route path='users' element={<UsersList />}/>
      <Route path='*' element={<PageNotFound />}/>
    </Routes>
  )
}

export default Routers