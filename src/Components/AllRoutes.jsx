import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import Home from '../Pages/Home'
import AddNote from '../Pages/AddNote'
import PrivateRoutes from './PrivateRoutes'
import About from '../Pages/About'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/add' element={ <PrivateRoutes> <AddNote/> </PrivateRoutes> } />
        </Routes>
        
    </div>
  )
}

export default AllRoutes