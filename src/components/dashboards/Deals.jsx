'use client';

import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FaChartPie, FaChartBar } from 'react-icons/fa';

export default function DashboardComponent() {
  const currentYear = new Date().getFullYear().toString();
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [searchMonth, setSearchMonth] = useState('');
  const [searchYear, setSearchYear] = useState(currentYear);
  const [loading, setLoading] = useState(true);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
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
      filtered = filtered.filter(
        (deal) => deal.month?.toLowerCase() === searchMonth.toLowerCase()
      );
    }
    if (searchYear) {
      filtered = filtered.filter((deal) => deal.year?.toString() === searchYear);
    }

    setFilteredDeals(filtered);
  }, [searchMonth, searchYear, deals]);

  // Calculate total deal amount by month
  const monthlyDealData = filteredDeals.reduce((acc, deal) => {
    const month = deal.month || 'Unknown';
    const existing = acc.find((item) => item.name === month);
    if (existing) {
      existing.amount += deal.amount || 0; // Use deal amount for comparison
    } else {
      acc.push({ name: month, amount: deal.amount || 0 });
    }
    return acc;
  }, []);

  // Calculate total deal amount by industry
  const industryData = filteredDeals.reduce((acc, deal) => {
    const industry = deal.industry || 'Other';
    const existing = acc.find((item) => item.name === industry);
    if (existing) {
      existing.amount += deal.amount || 0;
    } else {
      acc.push({ name: industry, amount: deal.amount || 0 });
    }
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384'];

  return (
    <main className="pl-20 pr-4 py-16 w-[100%] bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        <FaChartPie className="inline-block mr-2" />
        Business Deals Dashboard
      </h1>

      {/* Filters */}
      <div className=" p-6 sticky top-0 z-10 bg-gray-200 shadow-md rounded mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="searchMonth"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Month
            </label>
            <select
              id="searchMonth"
              value={searchMonth}
              onChange={(e) => setSearchMonth(e.target.value)}
              className="border rounded-2xl p-2 w-full"
            >
              <option value="">All Months</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="searchYear"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Year
            </label>
            <input
              id="searchYear"
              type="number"
              value={searchYear}
              onChange={(e) => setSearchYear(e.target.value)}
              placeholder="Enter Year"
              className="border rounded-2xl p-2 w-full"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading data...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-white py-6 px-16 shadow-md  rounded">
            <h2 className="text-lg font-semibold text-center mb-4">
              Total Deal Amount by Industry
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={industryData}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  {industryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white py-6 px-16 shadow-md rounded">
            <h2 className="text-lg font-semibold text-center mb-4">
              Total Deal Amount by Month
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyDealData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </main>
  );
}
