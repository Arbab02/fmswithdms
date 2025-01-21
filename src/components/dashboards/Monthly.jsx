'use client';
import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';
import { FaChartBar, FaDollarSign, FaPercent, FaChartPie, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADAR_COLORS = ['#8884d8', '#82ca9d'];

const formatNumber = (value) => {
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1) + 'B';
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + 'M';
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1) + 'K';
  }
  return value.toString();
};

export default function FinanceDashboard() {
  const currentYear = new Date().getFullYear().toString()
  const [metrics, setMetrics] = useState([]);
  const [searchYear, setSearchYear] = useState(currentYear);
  const [filteredMetrics, setFilteredMetrics] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await fetch('/api/metrics');
      const data = await res.json();
      setMetrics(data);
    };
    fetchMetrics();
  }, []);

  useEffect(() => {
    if (searchYear.trim() === '') {
      setFilteredMetrics(metrics);
    } else {
      const filtered = metrics.filter((metric) => 
        metric.year.toString().includes(searchYear.trim())
      );
      setFilteredMetrics(filtered);
    }
  }, [searchYear, metrics]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(metrics);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Metrics');
    XLSX.writeFile(workbook, 'FinanceMetrics.xlsx');
  };

  const exportToPDF = async () => {
    const element = document.getElementById('dashboard');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape');
    pdf.addImage(imgData, 'PNG', 10, 10, 280, 190);
    pdf.save('FinanceMetrics.pdf');
  };

  return (
    <div id="dashboard" className="min-h-screen bg-gray-200 pl-20 pr-4 w-[100%]  py-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-700">Your Finance</h1>

    <div className="flex flex-wrap sticky top-0 z-10 bg-gray-200 justify-center md:justify-end items-center gap-4 p-4 md:p-6 mb-6 text-xs md:text-base">
  <div className="flex flex-col  items-center md:items-end">
    <label
      htmlFor="searchYear"
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      Search by Year
    </label>
    <input
      id="searchYear"
      type="number"
      value={searchYear}
      onChange={(e) => setSearchYear(e.target.value)}
      placeholder="Enter Year"
      className="border rounded-2xl w-full md:w-[200px] px-3 py-2 text-gray-700 focus:ring-2 focus:ring-green-500"
    />
  </div>
  <button
    onClick={exportToExcel}
    className="flex items-center bg-green-900 hover:bg-green-800 text-white py-2 px-4 rounded-lg shadow transition-all duration-200 ease-in-out"
  >
    <FaFileExcel className="text-lg md:text-xl mr-2" />
    Export to Excel
  </button>
  <button
    onClick={exportToPDF}
    className="flex items-center bg-red-900 hover:bg-red-800 text-white py-2 px-4 rounded-lg shadow transition-all duration-200 ease-in-out"
  >
    <FaFilePdf className="text-lg md:text-xl mr-2" />
    Export to PDF
  </button>
</div>



      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-lg shadow-lg flex items-center">
          <FaDollarSign className="text-4xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Total Revenue</h3>
            <p className="text-3xl font-bold">{filteredMetrics.length > 0 ? formatNumber(filteredMetrics.reduce((sum, m) => sum + m.revenue, 0)) : '-'}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-lg shadow-lg flex items-center">
          <FaPercent className="text-4xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Gross Margin</h3>
            <p className="text-3xl font-bold">{filteredMetrics.length > 0 ? formatNumber(filteredMetrics.reduce((sum, m) => sum + m.grossMargin, 0)) : '-'}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-lg shadow-lg flex items-center">
          <FaChartBar className="text-4xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Total Expenses</h3>
            <p className="text-3xl font-bold">{filteredMetrics.length > 0 ? formatNumber(filteredMetrics.reduce((sum, m) => sum + m.expenses, 0)) : '-'}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-lg shadow-lg flex items-center">
          <FaChartPie className="text-4xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Net Income</h3>
            <p className="text-3xl font-bold">{filteredMetrics.length > 0 ? formatNumber(filteredMetrics.reduce((sum, m) => sum + m.netIncome, 0)) : '-'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Revenue vs Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" />
              <Bar dataKey="expenses" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Profit Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={filteredMetrics} dataKey="profit" nameKey="month" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {filteredMetrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatNumber(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Additional Metrics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Loss vs COGS</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Line type="monotone" dataKey="loss" stroke="#FF8042" />
              <Line type="monotone" dataKey="cogs" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">CLV vs CAC</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={filteredMetrics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="month" />
              <PolarRadiusAxis tickFormatter={formatNumber} />
              <Radar name="CLV" dataKey="clv" stroke={RADAR_COLORS[0]} fill={RADAR_COLORS[0]} fillOpacity={0.6} />
              <Radar name="CAC" dataKey="cac" stroke={RADAR_COLORS[1]} fill={RADAR_COLORS[1]} fillOpacity={0.6} />
              <Tooltip formatter={(value) => formatNumber(value)} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">ROI Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Line type="monotone" dataKey="roi" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Churn Rate Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Line type="monotone" dataKey="churnRate" stroke="#FF8042" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
