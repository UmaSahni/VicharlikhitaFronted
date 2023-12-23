import React, { useContext } from 'react'
import { Authcontext } from '../Context/AuthContext'
import {  Navigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
    const {IsAuth, token} = useContext(Authcontext)
        console.log(IsAuth, token)
  return token ? children : <Navigate to={"/login"} />
}

export default PrivateRoutes