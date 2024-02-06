"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/api/api";

export const getExpenses = async () => {
  const bills = await api.get(
    "/AJxL5LCBnefcHprCHwOoArQ3AZt-AlioPw.aHR0cHM6Ly9wcm9kLXM4LWZhY2FkZS5udWJhbmsuY29tLmJyL2FwaS9hY2NvdW50cy81ZGE3NGUxOC1kOGI4LTQwZDktOTEzOC05NDAwZDhmMjllYzcvYmlsbHMvc3VtbWFyeQ",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );

  let newUrl = bills.data.bills.find(
    (element: { state: string }) => element.state === "open"
  )._links.self.href;
  const response = await api.get(newUrl, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  console.log(response.data);
  return response.data;
};

export default function TimeExpenses() {
  

  const { isLoading, data, error } = useQuery({
    queryKey: ["timeExpenses"],
    queryFn: getExpenses,
  });

  const formatAmount = (amount: number) => {
    return amount / 100;
  };

  // Function to aggregate data based on post_date and format amounts
  const formatChartData = (lineItems) => {
    const aggregatedData = lineItems.reduce((acc, item) => {
      if (item.amount >= 0) {
        // Exclude negative amounts
        const date = item.post_date;
        acc[date] = (acc[date] || 0) + item.amount;
      }
      return acc;
    }, {});

    return Object.keys(aggregatedData).map((post_date) => ({
      date: post_date.split("-").reverse().join("/"),
      Spent: formatAmount(aggregatedData[post_date]),
    }));
  };

  const personalizedTooltip = ({ active, payload, label }) => {
    if (active && payload && label) {
      return (
        <div className="bg-neutral-800 p-2 rounded-lg shadow-md">
          <p className="font-semibold text-purple-700">
            {label}: R$ {payload[0].value}
          </p>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="flex flex-col gap-2 bg-neutral-900 rounded-2xl p-4">
      <h2 className="font-semibold text-xl text-purple-700">
        Month Expenses January
      </h2>
      <h3 className="font-semibold text-lg text-purple-200">
        You spent R$ {data?.bill?.summary?.total_balance / 100}
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          onClick={() =>
            console.log(formatChartData(data?.bill?.line_items || []))
          }
          width={730}
          height={250}
          data={formatChartData(data?.bill?.line_items || [])}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8F52CC" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8F52CC" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 'dataMax']}/>
          <Tooltip  content={personalizedTooltip}/>
          <Area
            type="monotone"
            dataKey="Spent"
            stroke="#8F52CC"
            fillOpacity={1}
            fill="url(#colorPv)"
            dot
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
