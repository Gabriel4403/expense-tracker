import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

function CashflowChart({ expenses }) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthData = { income: 0, expenses: 0 };

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    if (date.getMonth() !== currentMonth || date.getFullYear() !== currentYear) return;
    if (expense.type === "Income") monthData.income += expense.amount;
    else monthData.expenses += expense.amount;
  });

  monthData.net = parseFloat((monthData.income - monthData.expenses).toFixed(2));

  const monthName = now.toLocaleString("en-US", { month: "long", year: "numeric" });

  const data = [
    { name: "Income", value: monthData.income, fill: "#22c55e" },
    { name: "Expenses", value: monthData.expenses, fill: "#ef4444" },
    { name: "Net", value: monthData.net, fill: monthData.net >= 0 ? "#60a5fa" : "#f97316" },
  ];

  const hasData = monthData.income > 0 || monthData.expenses > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full p-6 rounded-2xl bg-[#181C14] text-white shadow-xl flex flex-col"
    >
      <h2 className="text-2xl font-bold text-center mb-1">Cashflow</h2>
      <p className="text-center text-gray-400 text-sm mb-4">{monthName}</p>

      {hasData ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" horizontal={false} />
            <XAxis type="number" tick={{ fill: "white", fontSize: 11 }} />
            <YAxis type="category" dataKey="name" tick={{ fill: "white", fontSize: 11 }} width={70} />
            <Tooltip
              contentStyle={{ backgroundColor: "#181C14", border: "1px solid white" }}
              labelStyle={{ color: "white" }}
              formatter={(value) => [`$${value.toFixed(2)}`, ""]}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-400 mt-10">No data this month.</p>
      )}
    </motion.div>
  );
}

export default CashflowChart;