import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import AddNote from './Pages/AddNote'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/' element={<Home/>} />
            <Route path='/add' element={<AddNote/>} />
        </Routes>
        
    </div>
  )
}

export default AllRoutes