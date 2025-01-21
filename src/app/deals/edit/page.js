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
    status: 'Pending', // Default status
    startDate: '',
    endDate: '',
    month: '',
    year: '',
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
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow-md rounded">
      {/* Form Fields */}
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label
            htmlFor={key}
            className="block text-sm font-medium text-gray-700"
          >
            {key
              .split(/(?=[A-Z])/)
              .join(' ')
              .replace(/^\w/, (c) => c.toUpperCase())}
          </label>
          <input
            type={key === 'amount' || key === 'phone' ? 'number' : key.includes('Date') ? 'date' : 'text'}
            id={key}
            name={key}
            value={value || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder={`Enter ${key}`}
            required={['name', 'industry', 'businessType', 'amount', 'email', 'phone', 'business'].includes(key)}
          />
        </div>
      ))}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {editId ? 'Update Deal' : 'Add Deal'}
      </button>
    </form>
  );
}

export default function FormComponent() {
  return (
    <main className="bg-gray-100 pl-20 pr-4 w-[100%] absolute pt-20">
      <h1 className="text-2xl font-bold text-indigo-600 mb-6">Add or Edit Deal</h1>
      <Suspense fallback={<p>Loading form...</p>}>
        <FormComponentContent />
      </Suspense>
    </main>
  );
}
