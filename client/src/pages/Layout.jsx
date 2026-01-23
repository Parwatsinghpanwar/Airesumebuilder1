import React from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div><h1>layout page</h1>
    <div>
        <Outlet />
    </div>
    
    
    </div>
  )
   
}
