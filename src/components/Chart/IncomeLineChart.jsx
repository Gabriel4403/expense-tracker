import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Shows a line chart of total income grouped by month, sorted chronologically
function IncomeLineChart({ expenses }) {
  const monthTotals = {};

  // Group income amounts by "YYYY-MM" key, skipping non-income entries
  expenses.forEach((expense) => {
    if (expense.type !== "Income") return;
    const date = new Date(expense.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthTotals[key] = (monthTotals[key] || 0) + expense.amount;
  });

  // Sort months chronologically and convert to array for Recharts
  const data = Object.entries(monthTotals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, value]) => ({ month, value }));

  return (
    <div className="w-full flex justify-center items-center mt-6 border-b-2">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            {/* Angled labels to prevent overlap on narrow screens */}
            <XAxis
              dataKey="month"
              tick={{ fill: "white", fontSize: 12 }}
              angle={-25}
              textAnchor="end"
            />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip
              formatter={(value) => [`$${value.toFixed(2)}`, "Income"]}
              contentStyle={{ backgroundColor: "#181C14", border: "1px solid white" }}
              labelStyle={{ color: "white" }}
            />
            <Legend wrapperStyle={{ color: "white", paddingTop: "20px" }} />
            <Line
              type="linear"
              dataKey="value"
              name="Income"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: "#22c55e", r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <h2 className="text-white text-center text-2xl font-extralight mb-4">
          No income data for chart.
        </h2>
      )}
    </div>
  );
}

export default IncomeLineChart;