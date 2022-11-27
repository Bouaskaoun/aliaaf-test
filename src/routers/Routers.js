import { Routes, Route, Navigate } from 'react-router-dom'
import AddProducts from '../pages/AddProducts'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ProductDetails from '../pages/ProductDetails'
import Shop from '../pages/Shop'
import Signup from '../pages/Signup'
import ProtectedRoute from './ProtectedRoute'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to ='home' />} />
      <Route path='home' element={<Home />}/>
      <Route path='login' element={<Login />}/>
      <Route path='addProducts' element={<AddProducts />}/>
      <Route path='shop/:id' element={<ProductDetails />}/>
      <Route 
        path='shop' 
        element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        }
      />
      <Route path='signup' element={<Signup />}/>
    </Routes>
  )
}

export default Routers