import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function Wallet({ balance, setBalance }) {
  const [isChangingBalance, setIsChangingBalance] = useState(false);
  const [inputBalance, setInputBalance] = useState("");

  function openBalanceChanger() {
    setInputBalance(balance ? balance.toString() : "");
    setIsChangingBalance(true);
  }

  function handleInputChange(event) {
    setInputBalance(event.target.value);
  }

  function applyBalanceChange() {
    const newBalance = parseFloat(inputBalance);
    if (!isNaN(newBalance)) {
      setBalance(newBalance);
      fetch(`${API_URL}/api/wallet`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ balance: newBalance }),
      }).catch((err) => console.error("Failed to update balance:", err));
    }
    setIsChangingBalance(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full p-8 rounded-2xl bg-[#181C14] border-2 border-[#181C14] text-white text-center shadow-xl flex flex-col items-center justify-center"
    >
      <h2 className="text-4xl font-bold mb-6">Wallet Balance</h2>

      {balance !== null && balance !== undefined && balance !== "" ? (
        // Balance exists — show it, click to edit
        <div
          onClick={openBalanceChanger}
          className="border-2 rounded-2xl text-center px-20 py-10 text-4xl hover:border-green-600 cursor-pointer transition"
        >
          ${balance}
        </div>
      ) : (
        // No balance set yet — show set balance button
        <button
          onClick={openBalanceChanger}
          className="border-2 border-white rounded-3xl text-xl px-8 py-3 font-bold text-white hover:bg-green-900 hover:border-green-950 transition"
        >
          Set Initial Balance
        </button>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isChangingBalance && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsChangingBalance(false)}
          >
            <motion.div
              className="bg-[#181C14] border-2 border-white text-white rounded-3xl shadow-xl p-8 w-full max-w-sm"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-center mb-6">
                {balance ? "Change Balance" : "Set Initial Balance"}
              </h3>
              <input
                className="w-full border rounded-2xl text-center px-4 py-3 bg-transparent text-white text-xl hover:border-green-600 focus:outline-none
                  [&::-webkit-outer-spin-button]:appearance-none
                  [&::-webkit-inner-spin-button]:appearance-none
                  [appearance:textfield]"
                type="number"
                value={inputBalance}
                onChange={handleInputChange}
                placeholder="Enter amount"
                autoFocus
              />
              <div className="flex gap-4 justify-center mt-6">
                <button
                  onClick={() => setIsChangingBalance(false)}
                  className="text-white font-semibold border rounded-3xl px-8 py-2 hover:bg-red-700 hover:border-red-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={applyBalanceChange}
                  className="text-white font-semibold border rounded-3xl px-8 py-2 hover:bg-green-900 hover:border-green-950 transition"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Wallet;