'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ListComponent() {
  const currentYear = new Date().getFullYear().toString()

  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [searchMonth, setSearchMonth] = useState('');
  const [searchYear, setSearchYear] = useState(currentYear); // State for the search filter by year
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    // Filter based on both month and year
    let filtered = deals;
    if (searchMonth) {
      filtered = filtered.filter((deal) => deal.month?.toLowerCase() === searchMonth.toLowerCase());
    }
    if (searchYear) {
      filtered = filtered.filter((deal) => deal.year?.toString() === searchYear);
    }
    setFilteredDeals(filtered);
  }, [searchMonth, searchYear, deals]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/deals/${id}`, { method: 'DELETE' });
      if (res.ok) fetchDeals();
      else console.error('Error deleting deal');
    } catch (error) {
      console.error('Failed to delete deal:', error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/dealsedit?editId=${id}`);
  };

  return (
    <main className="bg-gray-100 pt-12 pl-20 pr-4 w-[100%] inline-block">
      <h1 className="text-3xl text-indigo-600 font-bold text-center mb-4">
        Business Deals
      </h1>
      <div className='sticky top-0 z-10 bg-gray-100 py-4'>
      <div className="mb-4 ">
        <label htmlFor="searchMonth" className="block text-sm font-medium text-gray-700 mb-1">
          Search by Month
        </label>
        <select
          id="searchMonth"
          value={searchMonth}
          onChange={(e) => setSearchMonth(e.target.value)}
          className="border rounded-2xl p-2 w-full"
        >
          <option value="">All Months</option>
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
      </div>

      {/* Search by Year */}
      <div className="mb-4">
        <label htmlFor="searchYear" className="block text-sm font-medium text-gray-700 mb-1">
          Search by Year
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
      {loading ? (
        <p className="text-center text-gray-600">Loading deals...</p>
      ) : filteredDeals.length === 0 ? (
        <p className="text-center text-gray-600">No deals available.</p>
      ) : (
        <ul className="space-y-4">
          {filteredDeals.map((deal) => (
            <li key={deal._id} className="p-4 border rounded shadow-sm bg-gray-50">
              <h2 className="text-lg font-bold mb-2">{deal.name} ({deal.industry})</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <p><strong>Business Type:</strong> {deal.businessType}</p>
                <p><strong>Amount:</strong> ${deal.amount}</p>
                <p><strong>Title:</strong> {deal.title}</p>
                <p><strong>Description:</strong> {deal.description || 'N/A'}</p>
                <p><strong>Email:</strong> {deal.email}</p>
                <p><strong>Phone:</strong> {deal.phone}</p>
                <p><strong>Website:</strong> {deal.website || 'N/A'}</p>
                <p><strong>Business:</strong> {deal.business}</p>
                <p><strong>Status:</strong> {deal.status}</p>
                <p><strong>Start Date:</strong> {deal.startDate ? new Date(deal.startDate).toLocaleDateString() : 'N/A'}</p>
                <p><strong>End Date:</strong> {deal.endDate ? new Date(deal.endDate).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Month:</strong> {deal.month || 'N/A'}</p>
                <p><strong>Year:</strong> {deal.year || 'N/A'}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(deal._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(deal._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
