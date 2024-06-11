import React from 'react'
import { Link } from 'react-router-dom'
import { FaFire } from "react-icons/fa";

const Nav = () => {
  return (
    <div className='flex bg-[#0F0F0F] shadow-custom sticky items-center justify-between mx-auto text-white py-5 px-5 text-lg lg:w-3/4'>
      <h1 className='flex items-center justify-center gap-3 font-bold text-2xl tracking-wider'><FaFire className=' scale-110' /> Courses.in</h1>
      <Link to={"/dashboard"} className='font-semibold' >Dashboard</Link>
    </div>
  )
}

export default Nav