import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function ExpensesLineChart({ expenses }) {
  const monthTotals = {};

  expenses.forEach((expense) => {
    if (expense.type !== "Expense") return;
    const date = new Date(expense.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthTotals[key] = (monthTotals[key] || 0) + expense.amount;
  });

  const data = Object.entries(monthTotals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, value]) => ({ month, value }));

  return (
    <div className="w-full flex justify-center items-center mt-6 border-b-2">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="month"
              tick={{ fill: "white", fontSize: 12 }}
              angle={-25}
              textAnchor="end"
            />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip
              formatter={(value) => [`$${value.toFixed(2)}`, "Expenses"]}
              contentStyle={{ backgroundColor: "#181C14", border: "1px solid white" }}
              labelStyle={{ color: "white" }}
            />
            <Legend wrapperStyle={{ color: "white", paddingTop: "20px" }} />
            <Line
              type="linear"
              dataKey="value"
              name="Expenses"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: "#ef4444", r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <h2 className="text-white text-center text-2xl font-extralight mb-4">
          No expense data for chart.
        </h2>
      )}
    </div>
  );
}

export default ExpensesLineChart;