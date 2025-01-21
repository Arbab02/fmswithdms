'use client'

import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';

export default function ProfitabilityMetricsCalculator() {
  const [inputs, setInputs] = useState({
    totalRevenue: 0,
    cogs: 0,
    totalExpenses: 0,
    gainFromInvestment: 0,
    costOfInvestment: 0,
    fixedCosts: 0,
    variableCostsPerUnit: 0,
    pricePerUnit: 0,
  });
  const [copied, setCopied] = useState(false);

  const handleInputChange = (field, value) => {
    setInputs({
      ...inputs,
      [field]: Number(value),
    });
  };

  const calculateMetrics = () => {
    const { totalRevenue, cogs, totalExpenses, gainFromInvestment, costOfInvestment, fixedCosts, variableCostsPerUnit, pricePerUnit } = inputs;
    
    const grossMargin = totalRevenue > 0 ? ((totalRevenue - cogs) / totalRevenue) * 100 : "N/A";
    const netProfitMargin = totalRevenue > 0 ? ((totalRevenue - totalExpenses) / totalRevenue) * 100 : "N/A";
    const roi = costOfInvestment > 0 ? ((gainFromInvestment - costOfInvestment) / costOfInvestment) * 100 : "N/A";
    const breakEvenPoint = (pricePerUnit - variableCostsPerUnit) > 0 ? fixedCosts / (pricePerUnit - variableCostsPerUnit) : "N/A";

    return {
      grossMargin: grossMargin !== "N/A" ? grossMargin.toFixed(2) : "N/A",
      netProfitMargin: netProfitMargin !== "N/A" ? netProfitMargin.toFixed(2) : "N/A",
      roi: roi !== "N/A" ? roi.toFixed(2) : "N/A",
      breakEvenPoint: breakEvenPoint !== "N/A" ? breakEvenPoint.toFixed(2) : "N/A",
    };
  };

  const handleCopy = () => {
    const metrics = calculateMetrics();
    const summary = `Gross Margin: ${metrics.grossMargin}%
Net Profit Margin: ${metrics.netProfitMargin}%
ROI: ${metrics.roi}%
Break-Even Point: ${metrics.breakEvenPoint} units`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const metrics = calculateMetrics();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Profitability Metrics Calculator</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue', key: 'totalRevenue' },
          { label: 'Cost of Goods Sold (COGS)', key: 'cogs' },
          { label: 'Total Expenses', key: 'totalExpenses' },
          { label: 'Gain from Investment', key: 'gainFromInvestment' },
          { label: 'Cost of Investment', key: 'costOfInvestment' },
          { label: 'Fixed Costs', key: 'fixedCosts' },
          { label: 'Variable Costs per Unit', key: 'variableCostsPerUnit' },
          { label: 'Price per Unit', key: 'pricePerUnit' },
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
        <p>Gross Margin: {metrics.grossMargin}%</p>
        <p>Net Profit Margin: {metrics.netProfitMargin}%</p>
        <p>Return Of Investment (ROI): {metrics.roi}%</p>
        <p>Break-Even Point: {metrics.breakEvenPoint} units</p>
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
