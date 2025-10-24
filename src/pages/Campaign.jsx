import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { ChevronDown, SearchIcon } from 'lucide-react'
import Table from '../components/Table'
import Pagination from '../components/Pagination'
import api from '../api/axiosIntegration'

const Campaign = () => {

    const [campaigns, setCampaigns] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      const fetchCampaigns = async() => {
        try {
           const response = await api.get('/Campaign')
           setCampaigns(response.data || [])
        } catch (error) {
           console.error("Failed to fetch campaigns:", error);
           setError("Unable to load campaigns. Please try again later."); 
        } finally {
            setLoading(false)
        }
      }  
       fetchCampaigns()
    }, [])
    
    

    const durationOptions = [
    { name: 'All', value: '(90)' },
    { name: 'Inactive', value: '(90)' },
    { name: 'Active', value: '(90)' },
    ]
    
  
  return (
    <>
      <div className='min-h-screen flex'>
         {/* Sidebar */}
          <Sidebar />

         {/* Main Content */}
         <div className='flex-1 flex flex-col lg:ml-64'>
             {/* Header */}
              <Navbar/>

           {/* All Campaigns */}
             <main className='p-5 md:p-6'>
                
                {/* Campaign Header */}
                <div className='py-4  w-full'>
                   <h1 className='font-worksans font-bold text-2xl text-[#247b7b]'>
                     All Campaigns
                    </h1> 
                </div>

                {/* Filter Options*/}
                <div className='py-3  flex justify-between'>
                  
                  {/* Duration Filter*/}
                  <div className='flex flex-wrap items-center gap-2'>
                    {durationOptions.map((option, index) => (
                        <button key={index} className=' flex font-nunito text-sm   text-[#247b7b] px-5 py-2 border border-[#247b7b] rounded-md hover:bg-gray-100'>
                            {option.name} {option.value} 
                        </button>
                    ))}
                  </div>

                  <div className='flex items-center gap-2'>
                      {/* Search Bar */}
                    <div className='relative '>  
                        <input type='text' placeholder='Search' className='border border-gray-300 py-2.5 pl-10 pr-4  rounded-md focus:outline-none focus:ring-2 focus:ring-[#247b7b]'/>
                         <SearchIcon size={18} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 '/>
                     </div>

                     {/* Add more campaign related content here */}
                     <div className=''>
                        <select name=""  id=""  className=' border border-gray-300 py-2.5  pr-10 pl-2 rounded-md focus:outline-none'>
                            <option >Filter by date</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                        
                     </div>
                  </div>
                 
                </div>
                
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                   
                   <Table campaigns={campaigns}/>
                )}
                

                 {/*Pagination*/}
                 <Pagination/>


                
             </main>
        </div>
      </div>
    </>
  )
}

export default Campaign