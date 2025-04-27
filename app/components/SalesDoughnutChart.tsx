// components/SalesDoughnutChart.tsx
'use client';

import { FC } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Smartphones", value: 400 },
  { name: "Laptops", value: 300 },
  { name: "Accessories", value: 300 },
  { name: "Wearables", value: 200 },
];

const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#8b5cf6"];

const SalesDoughnutChart: FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm" style={{ width: "350px" }}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Sales Analytics</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      
    </div>
  );
};

export default SalesDoughnutChart;
