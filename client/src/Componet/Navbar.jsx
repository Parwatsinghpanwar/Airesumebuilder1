import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Navbar = () => {
    const user ={name:" John Doe  "}
    const navigate= useNavigate()
    const Logoutuser=()=>{
        navigate('/')
    }
  return (
    <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7x1 mx-auto px-4 py-3.5'>
     <Link to='/'>
     <img src="/logo.svg" alt="logo" className='h-11 w-auto' />
     </Link>
     <div className='flex items-center gap-4 text-sm'>
        <p className='max-sm:hidden '>Hello ,{user?.name}
        <button onClick={Logoutuser} className='bg-white hover:bg-slate-50  border border-gry-300 px-7 py-1.5 rounded-full active:scale-95  transition-all'> Logout</button>

        </p>
     </div>
        </nav>

    </div>
  )
}

export default Navbar