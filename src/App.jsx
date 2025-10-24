import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Overview from './pages/Overview'
import Campaign from './pages/Campaign'
import NewCampaign from './pages/NewCampaign'
import UserCampaign from './pages/UserCampaign'


function App() {

  return (
    <>
      <Routes>
        {/*Root Route*/}
         <Route path='/' element={<Navigate to='/overview' replace />} />

         <Route path='/overview' element={<Overview/>} />
         <Route path='/campaigns' element={<Campaign/>} />
         <Route path='/campaign/new' element={<NewCampaign/>}/>
         <Route path='/campaign/:id' element={<UserCampaign/>}/>
      </Routes>
    </>
  )
}

export default App
