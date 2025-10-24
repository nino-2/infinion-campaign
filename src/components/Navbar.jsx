import { Bell, ChevronDown, SearchIcon } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className='sticky px-5 py-3  w-full  top-0 bg-white z-50 shadow-sm'>
        <div className='flex items-center justify-between '>
           <div className='relative w-1/2 '>  
               <input type='text' placeholder='Search' className='border border-gray-300 py-2.5 pl-10 pr-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#247b7b]'/>
               <SearchIcon size={18} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 '/>
           </div>

         <div className='flex items-center gap-4'>
            <div className='bg-white p-4 rounded-sm shadow-md'>
                <Bell size={18}/>
            </div>
            <div className='flex gap-3'>
                <img src="/avatar.png" alt="User Avatar" className='h-10 w-10 rounded-full object-cover'/>
                <div className='px-2 flex gap-2 items-center cursor-pointer'>
                    <h3 className='font-nunito text-lg font-medium'>Big Tech</h3>
                    <ChevronDown size={24} className='font-medium text-[#247b7b]'/>
                </div>
            </div>
         </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar