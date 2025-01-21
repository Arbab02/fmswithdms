// 'use client'

// 'use client'

// import React from 'react';
// import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
// import { formatNumber } from '@/components/reusables/NumberFormatter';

// export function ProfitVsLossChart({ data }) {
//     const profit = 400000;
//     const loss = 0;
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis tickFormatter={(value) => formatNumber(value)} />
//         <Tooltip formatter={(value) => formatNumber(value)} />
//         <Legend />
//         <Line type="monotone" dataKey="profit" stroke="#8884d8" />
//         <Line type="monotone" dataKey="loss" stroke="#ff7300" />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }