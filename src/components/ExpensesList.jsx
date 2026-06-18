import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ExpenseItem from "./ExpenseItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ExpensesList({ items, onDeleteExpense, onEditExpense }) {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editType, setEditType] = useState("");

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
    editType === "Income" ? incomeCategories : expenseCategories;

  function openEdit() {
    setEditTitle(selectedExpense.title);
    setEditAmount(selectedExpense.amount);
    setEditCategory(selectedExpense.category);
    setEditDate(new Date(selectedExpense.date));
    setEditType(selectedExpense.type);
    setIsEditing(true);
  }

  function closeAll() {
    setSelectedExpense(null);
    setIsEditing(false);
  }

  const handleDelete = async () => {
    if (!selectedExpense?.id || !onDeleteExpense) return;
    setIsDeleting(true);
    try {
      await onDeleteExpense(selectedExpense.id);
      closeAll();
    } catch (error) {
      alert(`Error deleting expense: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedExpense?.id || !onEditExpense) return;
    setIsSaving(true);
    try {
      const updatedExpense = {
        ...selectedExpense,
        title: editTitle,
        amount: +editAmount,
        category: editCategory,
        date: editDate ? new Date(editDate) : new Date(),
        type: editType,
      };
      await onEditExpense(updatedExpense);
      closeAll();
    } catch (error) {
      alert(`Error updating expense: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (items.length === 0) {
    return (
      <h2 className="text-white text-center text-4xl font-bold mb-4">
        Found no expenses.
      </h2>
    );
  }

  return (
    <>
      <div className="max-h-[28rem] overflow-y-auto pr-2">
        <motion.ul className="space-y-4">
          <AnimatePresence>
            {items.map((expense) => (
              <motion.li
                key={expense.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setSelectedExpense(expense);
                  setIsEditing(false);
                }}
                className="cursor-pointer hover:bg-white/10 transition-colors rounded-lg"
              >
                <ExpenseItem {...expense} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      {/* Delete / Edit choice modal */}
      <AnimatePresence>
        {selectedExpense && !isEditing && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#181C14] text-white rounded-lg border-2 border-white shadow-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <h3 className="text-xl font-bold mb-1">
                {selectedExpense.title}
              </h3>
              <p className="mb-6 text-gray-400 text-sm">
                {selectedExpense.type} — ${selectedExpense.amount}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeAll}
                  className="px-4 py-2 border rounded-lg cursor-pointer hover:bg-green-900 hover:border-green-950 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={openEdit}
                  className="px-4 py-2 text-white border  cursor-pointer rounded-lg hover:bg-blue-700 hover:border-blue-900 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2  text-white border rounded-lg cursor-pointer hover:bg-red-700 hover:border-red-800 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit modal */}
      <AnimatePresence>
        {selectedExpense && isEditing && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#181C14] text-white rounded-lg border-2 border-white shadow-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <h3 className="text-xl font-bold mb-4">Edit Record</h3>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full border rounded-xl px-3 py-2 bg-transparent text-white hover:border-green-600 focus:outline-none"
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
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="w-full border rounded-xl px-3 py-2 bg-transparent text-white hover:border-green-600 focus:outline-none
                      [&::-webkit-outer-spin-button]:appearance-none
                      [&::-webkit-inner-spin-button]:appearance-none
                      [appearance:textfield]"
                  />
                </div>
                <div>
                  <label className="block text-sm  text-gray-400 mb-1">
                    Date
                  </label>
                  <DatePicker
                    selected={editDate}
                    onChange={(date) => setEditDate(date)}
                    className="w-full border rounded-xl px-3 py-2 cursor-pointer bg-transparent text-white hover:border-green-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm  text-gray-400 mb-1">
                    Type
                  </label>
                  <div className="relative">
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                      className="w-full border rounded-xl px-3 py-2 cursor-pointer bg-[#181C14] text-white appearance-none hover:border-green-600 focus:outline-none pr-8"
                    >
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white">
                      ▾
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full border rounded-xl px-3 py-2 bg-[#181C14] cursor-pointer text-white appearance-none hover:border-green-600 focus:outline-none pr-8"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white">
                      ▾
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeAll}
                  disabled={isSaving}
                  className="px-4 py-2 border rounded-lg cursor-pointer hover:bg-red-700 hover:border-red-800 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                  className="px-4 py-2  text-white rounded-lg border cursor-pointer hover:bg-green-900 hover:border-green-950 transition-colors disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ExpensesList;