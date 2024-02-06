'use client'
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";


export default function InOutCome() {
  const data = [
    { name: "Expenses", value: 500 },
    { name: "Income", value: 1500 },
  ];

  return (
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index === 0 ? "#7F291D" : "#8F52CC"} strokeWidth={0} />
            ))}
        </Pie>
            <Tooltip />
      </PieChart>
  );
}
