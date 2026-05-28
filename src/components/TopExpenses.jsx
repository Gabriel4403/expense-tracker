import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";

function TopExpenses({ expenses }) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (expense.type !== "Expense") return;
    const date = new Date(expense.date);
    if (date.getMonth() !== currentMonth || date.getFullYear() !== currentYear) return;
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
  });

  const top2 = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([name, value]) => ({ name, value }));

  const monthName = now.toLocaleString("en-US", { month: "long", year: "numeric" });
  const colors = ["#ef4444", "#f97316"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full p-6 rounded-2xl bg-[#181C14] text-white shadow-xl flex flex-col"
    >
      <h2 className="text-2xl font-bold text-center mb-1">Top Spending</h2>
      <p className="text-center text-gray-400 text-sm mb-4">{monthName}</p>

      {top2.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            layout="vertical"
            data={top2}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" horizontal={false} />
            <XAxis type="number" tick={{ fill: "white", fontSize: 11 }} />
            <YAxis type="category" dataKey="name" tick={{ fill: "white", fontSize: 11 }} width={120} />
            <Tooltip
              contentStyle={{ backgroundColor: "#181C14", border: "1px solid white" }}
              labelStyle={{ color: "white" }}
              formatter={(value) => [`$${value.toFixed(2)}`, "Amount"]}
            />
            <Bar dataKey="value" name="Amount" radius={[0, 6, 6, 0]}>
              {top2.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-400 mt-10">No expenses this month.</p>
      )}
    </motion.div>
  );
}

export default TopExpenses;