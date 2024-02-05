'use client'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TimeExpenses() {
  const data = [
    {
      year: "2016",
      Samsung: 2400,
    },
    {
      year: "2017",
      Samsung: 1398,
    },
    {
      year: "2018",
      Samsung: 2500,
    },
    {
      year: "2019",
      Samsung: 2408,
    },
    {
      year: "2020",
      Samsung: 4800,
    },
    {
      year: "2021",
      Samsung: 3800,
    },
    {
      year: "2022",
      Samsung: 4300,
    },
  ];

return (
  <>
    <ResponsiveContainer width="100%" height="100%" className="" >
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8F52CC" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8F52CC" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="year" />
        <YAxis 
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Samsung"
          stroke="#8F52CC"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </>
);
}

