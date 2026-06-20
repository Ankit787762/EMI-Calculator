"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
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
        <LineChart data={chartData}>
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

          <Line
            type="monotone"
            dataKey="principal"
            name="Principal"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="interest"
            name="Interest"
            stroke="#f97316"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartView;