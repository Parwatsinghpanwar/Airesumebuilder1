import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Componet/Navbar'

export const Layout = () => {
  return (
    <div>
    <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <Outlet />
    </div>
    
    
    </div>
  )
   
}
