import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Colors cycle through this palette if there are more categories than colors
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#ff6384"];

// Shows a pie chart of expenses broken down by category
function ExpensesPieChart({ expenses }) {
  const categoryTotals = {};

  // Sum up expense amounts per category, skipping non-expense entries
  expenses.forEach((expense) => {
    if (expense.type !== "Expense") return;
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  // Convert to array format required by Recharts
  const data = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));

  return (
    <div className="w-full flex justify-center items-center mt-6 border-b-2">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart width={400} height={400} margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
            <Pie
              data={data}
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="55%" // Percentage-based so it scales correctly on mobile
              fill="#8884d8"
              dataKey="value"
              label={({ percent }) => ` ${(percent * 100).toFixed(2)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value.toFixed(2)}`, name]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <h2 className="text-white text-center text-2xl font-extralight mb-4">
          No data for chart.
        </h2>
      )}
    </div>
  );
}

export default ExpensesPieChart;