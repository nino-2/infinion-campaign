import React from 'react'
import { Link,  useLocation, useNavigate } from 'react-router-dom'
import { CircleGauge, CircleQuestionMark, Megaphone, Plus, Settings, Siren } from 'lucide-react'
const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const menulist = [
        { name: 'New Campaign', href: '/campaign/new', icon: Plus },
        {name: 'Overview', href: '/overview', icon: CircleGauge},
        {name: 'Campaign', href: '/campaigns', icon: Megaphone},
        {name: 'Market Intelligence', href: '/market-intelligence', icon: Siren},
        {name: 'Account Settings', href: '/settings', icon: Settings}
    ]
  return (
    <>
        <div className='bg-[#f0f4f4] w-64 fixed inset-y-0 shadow-md shadow-lg transform transition-transform translate-x-0'>
          {/* Logo */}
          <div className='flex items-center  gap-5 px-4 h-16'>
            <img src="/scrutz.png" alt="" className='h-7 w-auto object-contain lg:h-10 ' />
            <h1 className=' text-4xl font-worksans font-bold bg-gradient-to-r from-[#247b7b] to-[#3b247b] bg-clip-text text-transparent'>Scrutz</h1>
          </div>

          <div className='mt-10 px-4'>
            {
                menulist.map((menu, index) => {
                    const Icon = menu.icon 
                    const isNewCampaign = menu.name === 'New Campaign'
                    return (
                        <Link key={index} to={menu.href}  className={`flex items-center px-4 py-3 mb-2 text-sm font-nunito font-semibold rounded-lg ${
                        isNewCampaign
                        ? 'bg-[#247b7b] mb-8 text-white hover:bg-[#1f6666]'
                        : location.pathname === menu.href
                        ? 'bg-white text-[#247b7b]'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}>
                         <Icon className="mr-3 h-5 w-5" />
                        {menu.name}
                        </Link>
                    )
                }
                
            )}

             <div className='bg-white p-5 shadow-md text-center'>
                <CircleQuestionMark className='mx-auto mb-3 h-6 w-6 text-[#247b7b]'/>
                <h2 className='font-nunito font-semibold bg-gradient-to-r from-[#3b247b] to-[#247b7b] bg-clip-text text-transparent mb-2'>Need help?</h2>
                <p className='text-sm text-gray-700'>We're readily available to provide help</p>
             </div>
          </div>
        </div>
    </>
  )
}

export default Sidebar