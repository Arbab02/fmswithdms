'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [searchMonth, setSearchMonth] = useState(''); // State for the search filter
  const [form, setForm] = useState({
    name: '',
    industry: '',
    businessType: '',
    amount: '',
    title: '',
    description: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    business: '',
    status: 'Pending',
    startDate: '',
    endDate: '',
    month: '',
    year: '',
  });
  const [editId, setEditId] = useState(null); // For tracking the deal being edited

  // List of months for dropdown
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Fetch all deals from the database
  const fetchDeals = async () => {
    const res = await fetch('/api/deals');
    const data = await res.json();
    setDeals(data);
    setFilteredDeals(data); // Initially, show all deals
  };

  // Initial data fetch on component load
  useEffect(() => {
    fetchDeals();
  }, []);

  // Handle search-by-month functionality
  useEffect(() => {
    if (searchMonth) {
      setFilteredDeals(deals.filter((deal) => deal.month.toLowerCase() === searchMonth.toLowerCase()));
    } else {
      setFilteredDeals(deals); // Reset to show all deals if search is cleared
    }
  }, [searchMonth, deals]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(editId ? `/api/deals/${editId}` : '/api/deals', {
        method: editId ? 'PUT' : 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        setForm({
          name: '',
          industry: '',
          businessType: '',
          amount: '',
          title: '',
          description: '',
          website: '',
          email: '',
          phone: '',
          address: '',
          business: '',
          status: 'Pending',
          startDate: '',
          endDate: '',
          month: '',
          year: '',
        });
        setEditId(null); // Clear edit state
        fetchDeals();
      } else {
        console.error('Error creating or updating deal');
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  // Handle deal deletion
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/deals/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchDeals();
      } else {
        console.error('Error deleting deal');
      }
    } catch (error) {
      console.error('Failed to delete deal:', error);
    }
  };

  // Handle deal edit
  const handleEdit = (deal) => {
    setForm({
      name: deal.name,
      industry: deal.industry,
      businessType: deal.businessType,
      amount: deal.amount,
      title: deal.title,
      description: deal.description,
      website: deal.website,
      email: deal.email,
      phone: deal.phone,
      address: deal.address,
      business: deal.business,
      status: deal.status,
      startDate: deal.startDate,
      endDate: deal.endDate,
      month: deal.month,
      year: deal.year,
    });
    setEditId(deal._id);
  };

  return (
    <main className="bg-gray-200  pl-20 pr-4 w-[100%] pt-28">
      <h1 className="text-3xl text-indigo-600 font-bold text-center mb-6">
        Deals Management Form
      </h1>

      {/* Form to add or edit deals */}
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(form).map((key) => (
          key !== 'month' ? (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                id={key}
                type={key === 'year' || key === 'amount' ? 'number' : 'text'}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                required
                className="border rounded-2xl p-3 w-full"
                placeholder={`Enter ${key}`}
              />
            </div>
          ) : (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </label>
              <select
                id={key}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                required
                className="border rounded-md p-2 w-full"
              >
                <option value="">Select Month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
            </div>
          )
        ))}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700"
        >
          {editId ? 'Update Deal' : 'Add Deal'}
        </button>
      </form>

      {/* Search by Month */}
      <div className="mb-4">
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

      {/* Display list of deals */}
      <ul className="space-y-4">
        {filteredDeals.map((deal) => (
          <li
            key={deal._id}
            className="p-4 border rounded shadow-sm bg-gray-50"
          >
            <h2 className="text-lg font-bold mb-2">
              {deal.month} {deal.year} - {deal.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <p><strong>Name:</strong> {deal.name}</p>
              <p><strong>Industry:</strong> {deal.industry}</p>
              <p><strong>Email:</strong> {deal.email}</p>
              <p><strong>Phone:</strong> {deal.phone}</p>
              <p><strong>Website:</strong> {deal.website}</p>
              <p><strong>Address:</strong> {deal.address}</p>
              <p><strong>Business Type:</strong> {deal.businessType}</p>
              <p><strong>Description:</strong> {deal.description}</p>
              <p><strong>Amount:</strong> {deal.amount}</p>
              <p><strong>Status:</strong> {deal.status}</p>
              <p><strong>Start Date:</strong> {new Date(deal.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {deal.endDate ? new Date(deal.endDate).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(deal)}
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
    </main>
  );
}