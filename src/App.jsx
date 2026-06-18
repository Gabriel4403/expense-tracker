import { useState, useEffect } from "react";
import Expenses from "./components/Expenses";
import Header from "./components/Header";
import BalanceContainer from "./components/BalanceContainer";
import OtherDetails from "./components/OtherDetails";
import NotificationToast from "./components/NotificationToast.jsx"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });

  function showToast(message) {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  }

  useEffect(() => {
    fetch(`${API_URL}/api/expenses`)
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((exp) => ({
          ...exp,
          date: new Date(exp.date),
        }));
        setExpenses(normalized);
      })
      .catch((err) => console.error("Error fetching expenses:", err));

    fetch(`${API_URL}/api/wallet`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.balance === "number") setBalance(data.balance);
      })
      .catch((err) => console.error("Failed to fetch balance:", err));
  }, []);

  function addExpenseHandler(newExpense) {
    setExpenses((prev) => [newExpense, ...prev]);
    showToast("Record added successfully!");
  }

  function handleDeleteExpense(id) {
    const expense = expenses.find((exp) => exp.id === id);
    return fetch(`${API_URL}/api/expenses/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to delete expense");
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
      setBalance((prev) =>
        expense.type === "Income"
          ? prev - expense.amount
          : prev + expense.amount
      );
      showToast("Record deleted successfully!");
    });
  }

  function handleEditExpense(updatedExpense) {
    const old = expenses.find((exp) => exp.id === updatedExpense.id);
    return fetch(`${API_URL}/api/expenses/${updatedExpense.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedExpense),
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to update expense");
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
      );
      setBalance((prev) => {
        let newBalance = prev;
        if (old.type === "Income") newBalance -= old.amount;
        else newBalance += old.amount;
        if (updatedExpense.type === "Income") newBalance += updatedExpense.amount;
        else newBalance -= updatedExpense.amount;
        return newBalance;
      });
      showToast("Record updated successfully!");
    });
  }

  return (
    <>
      <Header />
      <BalanceContainer
        onAddExpense={addExpenseHandler}
        balance={balance}
        setBalance={setBalance}
      />
      <Expenses
        items={expenses}
        onDeleteExpense={handleDeleteExpense}
        onEditExpense={handleEditExpense}
      />
      <OtherDetails expenses={expenses} />
      <NotificationToast show={toast.show} message={toast.message} />
    </>
  );
}

export default App;