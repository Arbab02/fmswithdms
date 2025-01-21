'use client'

import { useState } from 'react';
import { FiDollarSign, FiCopy } from 'react-icons/fi';

export default function SoftwareCompanyRevenueCalculator() {
  const [revenue, setRevenue] = useState({
    productSales: 0,
    saasSubscriptions: 0,
    professionalServices: 0,
    maintenanceContracts: 0,
    consultingServices: 0,
    trainingIncome: 0,
    cloudServices: 0,
    apiAccessFees: 0,
    advertisingRevenue: 0,
    affiliateIncome: 0,
    marketplaceSales: 0,
    dataLicensing: 0,
    partnershipRevenue: 0,
  });
  const [copied, setCopied] = useState(false);

  const calculateTotalRevenue = () => {
    return Object.values(revenue).reduce((acc, value) => acc + value, 0);
  };

  const handleInputChange = (field, value) => {
    setRevenue({
      ...revenue,
      [field]: Number(value),
    });
  };

  const handleCopy = () => {
    const totalRevenue = calculateTotalRevenue();
    navigator.clipboard.writeText(totalRevenue.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalRevenue = calculateTotalRevenue();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <FiDollarSign className="text-green-500" />Revenue
        Calculator
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Product Sales', key: 'productSales' },
          { label: 'SaaS Subscriptions', key: 'saasSubscriptions' },
          { label: 'Professional Services', key: 'professionalServices' },
          { label: 'Maintenance Contracts', key: 'maintenanceContracts' },
          { label: 'Consulting Services', key: 'consultingServices' },
          { label: 'Training and Certification', key: 'trainingIncome' },
          { label: 'Cloud Services', key: 'cloudServices' },
          { label: 'API Access Fees', key: 'apiAccessFees' },
          { label: 'Advertising Revenue', key: 'advertisingRevenue' },
          { label: 'Affiliate Income', key: 'affiliateIncome' },
          { label: 'Marketplace Sales', key: 'marketplaceSales' },
          { label: 'Data Licensing', key: 'dataLicensing' },
          { label: 'Partnership Revenue', key: 'partnershipRevenue' },
        ].map((field) => (
          <div key={field.key} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {field.label}:
            </label>
            <input
              type="number"
              value={revenue[field.key]}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}
      </div>
      <div className="mt-6  text-center">
        <h2 className="text-2xl font-semibold inline-flex items-center gap-2">
          Total Revenue: ${totalRevenue}
        </h2>
        <button
          onClick={handleCopy}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md inline-flex items-center gap-2"
        >
          <FiCopy /> {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
