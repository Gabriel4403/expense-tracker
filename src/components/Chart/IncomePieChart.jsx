import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#82ca9d", "#8884d8", "#ffc658", "#ff8042", "#00C49F"];

function IncomePieChart({ expenses }) {
  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (expense.type !== "Income") return;
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  const data = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));

  return (
    <div className="w-full flex justify-center items-center mt-6 border-b-2">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              fill="#82ca9d"
              dataKey="value"
              label={({ percent }) => ` ${(percent * 100).toFixed(2)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`$${value.toFixed(2)}`, name]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <h2 className="text-white text-center text-2xl font-extralight mb-4">
          No income data for chart.
        </h2>
      )}
    </div>
  );
}

export default IncomePieChart;