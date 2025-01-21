'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function FormComponentContent() {
  const [formData, setFormData] = useState({
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

  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const editId = searchParams?.get('editId');
  const router = useRouter();

  // Fetch existing data if editing
  useEffect(() => {
    const fetchData = async () => {
      if (editId) {
        setLoading(true);
        try {
          const res = await fetch(`/api/deals/${editId}`);
          if (res.ok) {
            const data = await res.json();
            setFormData((prev) => ({ ...prev, ...data }));
          } else {
            console.error('Failed to fetch deal for editing:', res.statusText);
          }
        } catch (error) {
          console.error('Error fetching deal:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [editId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(editId ? `/api/deals/${editId}` : '/api/deals', {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/deals'); // Redirect to the list page after saving
      } else {
        console.error('Failed to save deal:', res.statusText);
      }
    } catch (error) {
      console.error('Error saving deal:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pl-20 pr-4 w-[100%] pt-20 bg-white shadow-md rounded">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Enter deal name"
          required
        />
      </div>

      {/* Industry */}
      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
          Industry
        </label>
        <input
          type="text"
          id="industry"
          name="industry"
          value={formData.industry || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Enter industry"
          required
        />
      </div>

      {/* Business Type */}
      <div>
        <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
          Business Type
        </label>
        <input
          type="text"
          id="businessType"
          name="businessType"
          value={formData.businessType || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Enter business type"
          required
        />
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Enter deal amount"
          required
        />
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Enter deal title"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Enter deal description"
        />
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
          Website
        </label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Enter website"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Enter email"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Enter phone number"
          required
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Enter address"
        />
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status || 'Pending'}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Start Date */}
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* End Date */}
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Month */}
      <div>
        <label htmlFor="month" className="block text-sm font-medium text-gray-700">
          Month
        </label>
        <input
          type="text"
          id="month"
          name="month"
          value={formData.month || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Enter month"
        />
      </div>

      {/* Year */}
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Year
        </label>
        <input
          type="text"
          id="year"
          name="year"
          value={formData.year || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Enter year"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          {editId ? 'Update Deal' : 'Create Deal'}
        </button>
      </div>
    </form>
  );
}

export default function FormComponent() {
  return (
    
    <Suspense fallback={<p>Loading...</p>}>
      <FormComponentContent />
    </Suspense>
  );
}
