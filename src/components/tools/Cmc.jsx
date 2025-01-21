'use client'

import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';

export default function CustomerMetricsCalculator() {
  const [inputs, setInputs] = useState({
    averagePurchaseValue: 0,
    purchaseFrequency: 0,
    customerLifespan: 0,
    totalSalesMarketingExpenses: 0,
    newCustomersAcquired: 0,
    customersAtStart: 0,
    customersAtEnd: 0,
    newCustomersDuringPeriod: 0,
  });
  const [copied, setCopied] = useState(false);

  const handleInputChange = (field, value) => {
    setInputs({
      ...inputs,
      [field]: Number(value),
    });
  };

  const calculateMetrics = () => {
    const { averagePurchaseValue, purchaseFrequency, customerLifespan, totalSalesMarketingExpenses, newCustomersAcquired, customersAtStart, customersAtEnd, newCustomersDuringPeriod } = inputs;
    
    const clv = averagePurchaseValue > 0 && purchaseFrequency > 0 && customerLifespan > 0 
      ? averagePurchaseValue * purchaseFrequency * customerLifespan 
      : "N/A";
    const cac = newCustomersAcquired > 0 
      ? totalSalesMarketingExpenses / newCustomersAcquired 
      : "N/A";
    const churnRate = customersAtStart > 0 
      ? ((customersAtStart - customersAtEnd + newCustomersDuringPeriod) / customersAtStart) * 100 
      : "N/A";

    return {
      clv: clv !== "N/A" ? clv.toFixed(2) : "N/A",
      cac: cac !== "N/A" ? cac.toFixed(2) : "N/A",
      churnRate: churnRate !== "N/A" ? churnRate.toFixed(2) : "N/A",
    };
  };

  const handleCopy = () => {
    const metrics = calculateMetrics();
    const summary = `Customer Lifetime Value (CLV): $${metrics.clv}
Customer Acquisition Cost (CAC): $${metrics.cac}
Churn Rate: ${metrics.churnRate}%`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const metrics = calculateMetrics();

  return (
    <div className="p-6 max-w-4xl mx-auto">
         
      <h1 className="text-3xl font-bold mb-6 text-center">Customer Metrics Calculator</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Average Purchase Value', key: 'averagePurchaseValue' },
          { label: 'Purchase Frequency', key: 'purchaseFrequency' },
          { label: 'Customer Lifespan', key: 'customerLifespan' },
          { label: 'Total Sales and Marketing Expenses', key: 'totalSalesMarketingExpenses' },
          { label: 'Number of New Customers Acquired', key: 'newCustomersAcquired' },
          { label: 'Customers at the Beginning of the Period', key: 'customersAtStart' },
          { label: 'Customers at the End of the Period', key: 'customersAtEnd' },
          { label: 'New Customers Acquired During the Period', key: 'newCustomersDuringPeriod' },
        ].map((field) => (
          <div key={field.key} className="mb-4">
            <label className="block text-sm font-medium mb-2">{field.label}:</label>
            <input
              type="number"
              value={inputs[field.key]}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold">Calculated Metrics</h2>
        <p>Customer Lifetime Value (CLV): ${metrics.clv}</p>
        <p>Customer Acquisition Cost (CAC): ${metrics.cac}</p>
        <p>Churn Rate: {metrics.churnRate}%</p>
        <button
          onClick={handleCopy}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md inline-flex items-center gap-2"
        >
          <FiCopy /> {copied ? 'Copied!' : 'Copy Summary'}
        </button>
      </div>
    </div>
  );
}
