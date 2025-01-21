'use client'

import React, { useState } from 'react'
import Monthly from '@/components/dashboards/Monthly'
import Deals from '@/components/dashboards/Deals'
// import Yearly from '@/components/dashboards/Yearly'

const page = () => {
  // State to control the visibility of each component
  const [activeComponent, setActiveComponent] = useState('monthly'); 

  // Handler to set the active component
  const handleClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-200  py-16 sticky top-0 z-10">
      <h1 className="text-4xl font-bold text-center mb-8 pl-16 md:pl-0 text-gray-700">Dashboards</h1>
      {/* Filter Buttons */}
      <div className='pl-16 md:pl-0'>
        <button
          className={`px-6  rounded-full py-2 mr-2 ${activeComponent === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => handleClick('monthly')}
        >
          Finance
        </button>
        <button
          className={`px-6   rounded-full py-2 mr-2 ${activeComponent === 'deals' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => handleClick('deals')}
        >
          Deals
        </button>
        {/* <button
          className={`px-4 py-2 ${activeComponent === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => handleClick('yearly')}
        >
          Yearly
        </button> */}
      </div>

      {/* Conditionally render components */}
      {activeComponent === 'monthly' && <Monthly />}
      {activeComponent === 'deals' && <Deals />}
      {activeComponent === 'yearly' && <Yearly />}
    </div>
  )
}

export default page;
