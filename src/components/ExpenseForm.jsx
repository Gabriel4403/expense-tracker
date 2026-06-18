import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function ExpenseForm({ onSaveExpenseData, setBalance }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredType, setEnteredType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function titleHandler(event) {
    setEnteredTitle(event.target.value);
  }
  function amountHandler(event) {
    setEnteredAmount(event.target.value);
  }
  function categoryHandler(event) {
    setEnteredCategory(event.target.value);
  }
  function dateHandler(date) {
    setEnteredDate(date);
  }
  function typeHandler(event) {
    setEnteredType(event.target.value);
  }
  function closeFormHandler() {
    setShowForm(false);
  }

  const expenseCategories = [
    "Food & Drinks",
    "Shopping",
    "Housing",
    "Transportation",
    "Life & Entertainment",
  ];
  const incomeCategories = [
    "Salary",
    "Gift",
    "Investments",
    "Freelance",
    "Other Income",
  ];
  const categories =
    enteredType === "Income" ? incomeCategories : expenseCategories;

  async function submitExpenseHandler() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const amount = +enteredAmount;
      const expenseData = {
        id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        title: enteredTitle,
        amount,
        category: enteredCategory,
        type: enteredType,
        date: enteredDate ? new Date(enteredDate) : new Date(),
      };

      const response = await fetch(`${API_URL}/api/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      setBalance((prev) =>
        enteredType === "Income" ? prev + amount : prev - amount,
      );

      setEnteredTitle("");
      setEnteredAmount("");
      setEnteredCategory("");
      setEnteredDate("");
      setEnteredType("");
      setShowForm(false);

      onSaveExpenseData(expenseData);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="h-full bg-[#181C14] border-2 border-[#181C14] py-3  rounded-2xl shadow-xl flex items-center justify-center"
      >
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="border-2 border-white rounded-3xl cursor-pointer text-2xl px- py-3 font-bold text-white hover:bg-green-900 transition hover:border-green-950"
        >
          + Add Record
        </button>
      </motion.div>
      {/* Form Modal overlay */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFormHandler} 
          >
            <motion.div
              className="bg-[#181C14] border-2 border-white text-white rounded-3xl shadow-xl p-8 w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
            >
              <h2 className="text-2xl font-bold text-center mb-6">
                New Record
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Title
                  </label>
                  <input
                    onChange={titleHandler}
                    value={enteredTitle}
                    type="text"
                    placeholder="Enter title"
                    className="w-full border rounded-xl px-3 py-2 bg-transparent text-white hover:border-green-600 focus:outline-none placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={enteredAmount}
                    onChange={amountHandler}
                    placeholder="0.00"
                    className="w-full border rounded-xl px-3 py-2 bg-transparent text-white hover:border-green-600 focus:outline-none placeholder-gray-500
                      [&::-webkit-outer-spin-button]:appearance-none
                      [&::-webkit-inner-spin-button]:appearance-none
                      [appearance:textfield]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Date
                  </label>
                  <DatePicker
                    selected={enteredDate}
                    onChange={dateHandler}
                    placeholderText="Select a date"
                    className="w-full border rounded-xl cursor-pointer px-3 py-2 bg-transparent text-white hover:border-green-600 focus:outline-none placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm  text-gray-400 mb-1">
                    Type
                  </label>
                  <div className="relative">
                    <select
                      value={enteredType}
                      onChange={typeHandler}
                      className={`w-full border rounded-xl px-3 py-2 cursor-pointer bg-[#181C14] appearance-none hover:border-green-600 focus:outline-none pr-8
                        ${enteredType === "" ? "text-gray-500" : "text-white"}`}
                    >
                      <option value=""  disabled hidden>
                        Select Type
                      </option>
                      <option className="text-white"  value="Income">
                        Income
                      </option>
                      <option className="text-white" value="Expense">
                        Expense
                      </option>
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white">
                      ▾
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={enteredCategory}
                      onChange={categoryHandler}
                      className={`w-full border rounded-xl px-3 py-2 cursor-pointer bg-[#181C14] appearance-none hover:border-green-600 focus:outline-none pr-8
                        ${enteredCategory === "" ? "text-gray-500" : "text-white"}`}
                    >
                      <option className="text-white" value="" disabled hidden>
                        Select Category
                      </option>
                      {categories.map((category) => (
                        <option
                          key={category}
                          value={category}
                          className="text-white"
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white">
                      ▾
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center mt-8">
                <button
                  type="button"
                  onClick={closeFormHandler}
                  className="text-white font-semibold border cursor-pointer rounded-3xl px-8 py-2 hover:bg-red-700 hover:border-red-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={submitExpenseHandler}
                  className={`text-white font-semibold border rounded-3xl cursor-pointer px-8 py-2 hover:bg-green-900 hover:border-green-950 transition ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Add Record"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ExpenseForm;
