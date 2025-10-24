import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Calendar, ChevronDown, Plus, Tally1, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'

const Overview = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
       <div className='min-h-screen flex'>
        {/* Sidebar */}
         <Sidebar
          isOpen={sidebarOpen}
          onClose={()=> setSidebarOpen(false)} />

        {/* Main Content */}
        <div className='flex-1 flex flex-col '>
            {/* Header */}
             <Navbar onToggleSidebar={() => (setSidebarOpen(true))}/>

            {/* Overview */}
            <main className='p-5 md:p-6  '>
              <div className='py-4  flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-4 items-center'>
                
                 <h1 className='text-left font-worksans font-bold text-2xl text-[#247b7b]'>Overview</h1>
                
                

                 {/* Date Filter & Export */}
                 <div className='flex gap-2'>

                {/* Date Filter */}
                <div className='flex items-center border border-gray-300 p-2.5 rounded-md focus:outline-none'>
                    <Calendar size={18} className='inline mr-2 text-[#247b7b] '/>
                    <p className='lg:text-base text-xs font-nunito font-medium '>Date Range</p>
                    <Tally1 size={18} className='inline ml-2 text-gray-400 '/>
                    <div className='px-1 lg:px-2'>
                    <p className='lg:text-base text-xs font-nunito font-medium'>Nov 1, 2022 - Nov 7, 2022.</p>
                    </div>
                    <ChevronDown size={18} className='inline text-[#247b7b] '/>
                </div>

                 {/* Export Button */}
                <button className='bg-[#f0f4f4] p-2.5 flex items-center rounded-sm cursor-pointer '>
                    <Upload size={18} className='mr-2 text-[#247b7b]'/>
                    <p className='font-nunito font-medium'>Export</p>
                </button>

                </div>
                
              </div>

              <div className='flex justify-center flex-col  items-center  py-10'>
                <img src="/empty.png" alt="Empty"  className='mb-3 h-[200px]'/>
                <h2 className='font-nunito font-semibold '>No activity yet. Create a new campaign to get started</h2>

                <Link to='/campaign/new'>
                <button className='mt-6 bg-[#247b7b] text-white px-6 py-3 rounded-md font-nunito font-semibold hover:bg-[#1f6666] flex items-center cursor-pointer'>
                    <Plus size={18} className='mr-2'/> 
                    New Campaign
                </button>

                </Link>
              </div>
            </main>
        </div>
       </div>
    </>
  )
}

export default Overview