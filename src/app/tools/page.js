'use client';

import React, { useState } from 'react';
import ProfitCal from '@/components/tools/ProfitCal';
import Pmc from '@/components/tools/Pmc';
import Cmc from '@/components/tools/Cmc';

const Page = () => {
  const [visibleComponent, setVisibleComponent] = useState('all');

  return (
    <div className="pl-14 py-10 lg:pl-0">
      <h1 className="text-center text-3xl md:text-4xl font-bold">Finance Tools</h1>
      <div className="flex flex-wrap justify-center gap-4 my-6 px-6 py-8 sticky top-0 bg-white z-10">
        <button 
          onClick={() => setVisibleComponent('all')} 
          className="px-4 py-2 bg-blue-500 text-white rounded-full w-full sm:w-auto"
        >
          Show All
        </button>
        <button 
          onClick={() => setVisibleComponent('profitCal')} 
          className="px-4 py-2 bg-blue-500 text-white rounded-full w-full sm:w-auto"
        >
          Show Profit Calculator
        </button>
        <button 
          onClick={() => setVisibleComponent('pmc')} 
          className="px-4 py-2 bg-blue-500 text-white rounded-full w-full sm:w-auto"
        >
          Show PMC
        </button>
        <button 
          onClick={() => setVisibleComponent('cmc')} 
          className="px-4 py-2 bg-blue-500 text-white rounded-full w-full sm:w-auto"
        >
          Show CMC
        </button>
      </div>
      {visibleComponent === 'all' || visibleComponent === 'profitCal' ? <ProfitCal /> : null}
      {visibleComponent === 'all' || visibleComponent === 'pmc' ? <Pmc /> : null}
      {visibleComponent === 'all' || visibleComponent === 'cmc' ? <Cmc /> : null}
    </div>
  );
};

export default Page;
