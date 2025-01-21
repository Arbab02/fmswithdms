// 'use client';

// import React from 'react';
// import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
// import { formatNumber } from '@/reusables/NumberFormatter'; // Adjust the path as per your project structure

// export function RevenueVsExpensesChart({ data }) {
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis tickFormatter={(value) => formatNumber(value)} />
//         <Tooltip formatter={(value) => formatNumber(value)} />
//         <Legend />
//         <Bar dataKey="revenue" fill="#8884d8" />
//         <Bar dataKey="expenses" fill="#82ca9d" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }
