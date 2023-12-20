import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/' element={<Home/>} />
        </Routes>
        
    </div>
  )
}

export default AllRoutes