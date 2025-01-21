'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function FormComponentContent() {
  const [formData, setFormData] = useState({
    month: '',
    year: '',
    revenue: '',
    expenses: '',
    profit: '',
    loss: '',
    cogs: '',
    grossMargin: '',
    netIncome: '',
    clv: '',
    cac: '',
    roi: '',
    churnRate: '',
  });

  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams(); // Suspense required here
  const editId = searchParams?.get('editId');
  const router = useRouter();

  // Fetch existing data if editing
  useEffect(() => {
    const fetchData = async () => {
      if (editId) {
        setLoading(true);
        try {
          const res = await fetch(`/api/metrics/${editId}`);
          if (res.ok) {
            const data = await res.json();
            setFormData((prev) => ({ ...prev, ...data }));
          } else {
            console.error('Failed to fetch metric for editing:', res.statusText);
          }
        } catch (error) {
          console.error('Error fetching metric:', error);
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
      const res = await fetch(editId ? `/api/metrics/${editId}` : '/api/metrics', {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/metrics'); // Redirect to the list page after saving
      } else {
        console.error('Failed to save metric:', res.statusText);
      }
    } catch (error) {
      console.error('Error saving metric:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow-md rounded">
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
          placeholder="e.g., January"
          required
        />
      </div>

      {/* Year */}
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Year
        </label>
        <input
          type="number"
          id="year"
          name="year"
          value={formData.year || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="e.g., 2025"
          required
        />
      </div>

      {/* Other Financial Metrics */}
      {Object.keys(formData)
        .filter((key) => key !== 'month' && key !== 'year')
        .map((key) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
              {key
                .split(/(?=[A-Z])/)
                .join(' ')
                .replace(/^\w/, (c) => c.toUpperCase())}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key] || ''}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {editId ? 'Update Metric' : 'Add Metric'}
      </button>
    </form>
  );
}

export default function FormComponent() {
  return (
    <main className="bg-gray-100 pl-20 pr-4 w-[100%] absolute pt-20">
      <h1 className="text-2xl font-bold text-indigo-600 mb-6">Add or Edit Metric</h1>
      <Suspense fallback={<p>Loading form...</p>}>
        <FormComponentContent />
      </Suspense>
    </main>
  );
}
