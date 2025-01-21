'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { FaSearch } from 'react-icons/fa';

export default function ListComponent() {
  const currentYear = new Date().getFullYear().toString();

  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [searchMonth, setSearchMonth] = useState('');
  const [searchYear, setSearchYear] = useState(currentYear);
  const [loading, setLoading] = useState(true);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const fetchDeals = async () => {
    try {
      const res = await fetch('/api/deals');
      if (res.ok) {
        const data = await res.json();
        setDeals(data);
        setFilteredDeals(data);
      } else {
        console.error('Failed to fetch deals');
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    let filtered = deals;
    if (searchMonth) {
      filtered = filtered.filter((deal) => deal.month?.toLowerCase() === searchMonth.toLowerCase());
    }
    if (searchYear) {
      filtered = filtered.filter((deal) => deal.year?.toString() === searchYear);
    }
    setFilteredDeals(filtered);
  }, [searchMonth, searchYear, deals]);

  // Calculate totals for the charts
  const chartData = () => {
    const industryTotals = {};
    const companyNames = [];

    filteredDeals.forEach((deal) => {
      if (!industryTotals[deal.industry]) {
        industryTotals[deal.industry] = 0;
      }
      industryTotals[deal.industry] += deal.amount;
      if (!companyNames.includes(deal.name)) companyNames.push(deal.name);
    });

    // Bar chart data
    const barData = Object.keys(industryTotals).map((industry) => ({
      name: industry,
      amount: industryTotals[industry],
    }));

    // Pie chart data
    const pieData = companyNames.map((name) => ({
      name,
      value: filteredDeals
        .filter((deal) => deal.name === name)
        .reduce((acc, deal) => acc + deal.amount, 0),
    }));

    return { barData, pieData };
  };

  const { barData, pieData } = chartData();

  return (
    <main className="bg-gray-200 pt-12 px-4 sm:px-8 md:px-16 lg:px-20">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Your Deals</h1>
      
      {/* Search Section */}
      <div className="sticky top-0 z-10 bg-gray-200 py-4  mb-8">
        <div className="flex justify-between items-center">
          <div className="w-full max-w-xs mx-auto space-y-4">
            {/* Month Filter */}
            <div className="flex items-center space-x-2">
              <FaSearch className="text-lg text-gray-600" />
              <select
                id="searchMonth"
                value={searchMonth}
                onChange={(e) => setSearchMonth(e.target.value)}
                className="border rounded-2xl p-2 w-full text-gray-600 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Months</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div className="flex items-center space-x-2">
              <FaSearch className="text-lg text-gray-600" />
              <input
                id="searchYear"
                type="number"
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)}
                placeholder="Enter Year"
                className="border rounded-2xl p-2 w-full text-gray-600 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Deals Content */}
      {loading ? (
        <p className="text-center text-gray-600">Loading deals...</p>
      ) : filteredDeals.length === 0 ? (
        <p className="text-center text-gray-600">No deals available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Industry Comparison</h2>
            <BarChart width={500} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#4F46E5" />
            </BarChart>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Company Breakdown</h2>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#4F46E5"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      )}
    </main>
  );
}
