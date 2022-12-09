import React from 'react'
//import useAuth from '../custom-hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {

    //const {currentUser} = useAuth()
    const user = useSelector((state) => state.user.currentUser);

  return user ? children : <Navigate to='/login' />
}

export default ProtectedRoute