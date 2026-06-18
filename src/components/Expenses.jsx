import { useState } from "react";
import Card from "./Card";
import ExpensesList from "./ExpensesList";
import ExpensesFilterYear from "./ExpensesFilter";
import ExpensesCtgFilter from "./ExpensesCtgFilter";
import ExpensesPieChart from "./Chart/ExpensesPieChart";
import IncomePieChart from "./Chart/IncomePieChart";
import ExpensesLineChart from "./Chart/ExpensesLineChart";
import IncomeLineChart from "./Chart/IncomeLineChart";

function Expenses({ items, onDeleteExpense, onEditExpense }) {
  const [filteredYear, setFilteredYear] = useState("ALL");
  const [filteredCategory, setFilteredCategory] = useState("ALL");
  const [activeData, setActiveData] = useState("expenses"); // expenses or income
  const [activeChart, setActiveChart] = useState("pie"); // pie or bar

  const filteredExpenses = items.filter((expense) => {
    const yearMatches =
      filteredYear === "ALL" ||
      expense.date.getFullYear().toString() === filteredYear;
    const categoryMatches =
      filteredCategory === "ALL" || expense.category === filteredCategory;
    return yearMatches && categoryMatches;
  });

  const sortedExpenses = filteredExpenses.sort((a, b) => b.date - a.date);

  return (
    <Card className="p-4 bg-[#181C14] mt-45 mx-auto w-[50rem] max-w-[95%] rounded-2xl shadow-xl">
      <ExpensesCtgFilter
        selected={filteredCategory}
        onChangeCategory={setFilteredCategory}
      />
      <ExpensesFilterYear
        selected={filteredYear}
        onChangeFilter={setFilteredYear}
      />

      {/* Expenses / Income toggle */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setActiveData("expenses")}
          className={`text-white font-semibold cursor-pointer px-6 py-2 rounded-3xl border transition ${
            activeData === "expenses"
              ? "bg-red-700 border-red-900"
              : "hover:bg-red-900 hover:border-red-950"
          }`}
        >
          Expenses
        </button>
        <button
          onClick={() => setActiveData("income")}
          className={`text-white font-semibold cursor-pointer px-6 py-2 rounded-3xl border transition ${
            activeData === "income"
              ? "bg-green-700 border-green-900"
              : "hover:bg-green-900 hover:border-green-950"
          }`}
        >
          Income
        </button>
      </div>

      {/* Pie / Bar toggle */}
      <div className="flex justify-center gap-4 mt-3">
        <button
          onClick={() => setActiveChart("pie")}
          className={`text-white text-sm font-semibold cursor-pointer px-5 py-1.5 rounded-3xl border transition ${
            activeChart === "pie"
              ? "bg-blue-700 border-blue-900"
              : "hover:bg-blue-900 hover:border-blue-950"
          }`}
        >
          Pie Chart
        </button>
        <button
          onClick={() => setActiveChart("bar")}
          className={`text-white text-sm font-semibold cursor-pointer px-5 py-1.5 rounded-3xl border transition ${
            activeChart === "bar"
              ? "bg-blue-700 border-blue-900"
              : "hover:bg-blue-900 hover:border-blue-950"
          }`}
        >
          Line Chart
        </button>
      </div>

      {/* Chart display */}
      {activeData === "expenses" && activeChart === "pie" && <ExpensesPieChart expenses={filteredExpenses} />}
{activeData === "expenses" && activeChart === "bar" && <ExpensesLineChart expenses={filteredExpenses} />}
{activeData === "income" && activeChart === "pie" && <IncomePieChart expenses={filteredExpenses} />}
{activeData === "income" && activeChart === "bar" && <IncomeLineChart expenses={filteredExpenses} />}

      <ExpensesList
        items={sortedExpenses}
        onDeleteExpense={onDeleteExpense}
        onEditExpense={onEditExpense}
      />
    </Card>
  );
}

export default Expenses;