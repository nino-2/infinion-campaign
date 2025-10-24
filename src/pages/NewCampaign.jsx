import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Form from '../components/Form'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosIntegration'

const NewCampaign = () => {

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const navigate = useNavigate()


    const handleCreate = async(data) => {
      try {
        const payload = {
        campaignName: data.campaignName,
        campaignDescription: data.campaignDescription || "",
        startDate: data.startDate + "T00:00:00", // API expects full datetime
        endDate: data.endDate ? data.endDate + "T00:00:00" : null,
        digestCampaign: data.dailyDigest, // ← matches API field name
        linkedKeywords: data.keywords.split(',').map(k => k.trim()), // split by comma
        dailyDigest: data.digestFrequency, // e.g., "Monthly"
      };
      
      await api.post('/Campaign',payload);
      setShowSuccessModal(true)
      
    } catch (error) {
          console.error("Error creating campaign:", error);
          alert("Something went wrong. Please try again.");  
        }
    
    };


  return (
    <>
        <div className='min-h-screen flex'>

            {/*Sidebar*/}
            <Sidebar/>

            {/*Main Content*/}
            <div className='flex-1 flex flex-col lg:ml-64'>
                {/*Header*/}
                <Navbar/>

                {/*Create New Campaign*/}
                <main className='p-5 md:p-6'>
                  
                  {/*New Campaign Header*/}
                  <div className='py-4 w-full'>
                     <h1 className='font-worksans font-bold text-2xl text-[#247b7b]'>
                       Create New Campaign
                     </h1> 
                   </div>

                   {/*Form*/}
                   <Form mode='create' onSubmit={handleCreate}
                    onCancel={() => navigate(-1)}
                   />
                    {/*  Buttons outside form */}
                    <div className="flex gap-3 mt-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-5 py-2 text-sm rounded-md border border-[#247b7b] bg-transparent text-[#247b7b] hover:bg-gray-100 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => document.querySelector('form')?.requestSubmit()}
                        className="px-5 py-2 text-sm rounded-md bg-[#247b7b] text-white hover:bg-[#1f6666] cursor-pointer"
                    >
                        Create Campaign
                    </button>
                    </div>
                </main>

            </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md shadow-lg">
            <div className="p-6 text-center">
                <div className=''>
                    <img src="/success.png" alt="Success Image" className='mx-auto py-3' />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800">
                Campaign Successfully Created!
                </h3>
               

                <div className="mt-6">
                <button
                    onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/campaigns'); 
                    }}
                    className="px-5 py-2 bg-[#247b7b] text-white text-sm font-medium rounded-md hover:bg-[#1f6666]"
                >
                    Go Back to campaign list
                </button>
                </div>
            </div>
            </div>
        </div>
        )}
    </>
  )
}

export default NewCampaign