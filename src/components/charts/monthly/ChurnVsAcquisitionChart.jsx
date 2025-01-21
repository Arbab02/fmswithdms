// 'use client'

// import React from 'react';
// import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
// import { formatNumber } from '@/components/reusables/NumberFormatter';


// const COLORS = ['#0088FE', '#FF8042'];

// export function ChurnVsAcquisitionChart({ data }) {

//     const churnRate = 10; // Example: 10%
//     const acquisitionCost = 50;
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <PieChart>
//         <Pie
//           data={data}
//           dataKey="value"
//           nameKey="type"
//           cx="50%"
//           cy="50%"
//           outerRadius={100}
//           fill="#8884d8"
//           label
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip formatter={(value) => formatNumber(value)} />
//         <Legend />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// }
