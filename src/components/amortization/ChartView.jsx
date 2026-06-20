"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function ChartView({ schedule }) {
  if (!schedule?.length) return null;

  const chartData =
    schedule.length > 60
      ? schedule.filter((_, index) => index % 2 === 0)
      : schedule;

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="99%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            tickCount={10}
            interval="preserveStartEnd"
          />

          <YAxis
            width={80}
            tickFormatter={(value) =>
              new Intl.NumberFormat("en-IN", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(value)
            }
          />

          <Tooltip
            formatter={(value) =>
              `₹${Number(value).toLocaleString("en-IN")}`
            }
          />

          <Legend />

          <Bar
            dataKey="principal"
            name="Principal"
            stackId="payment"
            fill="#2563eb"
          />

          <Bar
            dataKey="interest"
            name="Interest"
            stackId="payment"
            fill="#f97316"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartView;