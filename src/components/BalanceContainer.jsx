import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import AddExpenseModal from "./AddExpenseModal";
import Wallet from "./Wallet";

function BalanceContainer({ onAddExpense, balance, setBalance }) {
  const [showModal, setShowModal] = useState(false);

  function saveExpenseDataHandler(enteredExpenseData) {
    onAddExpense(enteredExpenseData);
    setShowModal(true);
  }

  function closeModalHandler() {
    setShowModal(false);
  }

  return (
    <div className="relative top-38 flex flex-row items-stretch justify-center gap-6 w-full max-w-[48rem] mx-auto">
      {showModal && (
        <AddExpenseModal
          onClose={closeModalHandler}
          message="Record added successfully!"
        />
      )}
      <div className="flex-1">
        <Wallet balance={balance} setBalance={setBalance} />
      </div>
      <div className="flex-1">
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          setBalance={setBalance}
        />
      </div>
    </div>
  );
}

export default BalanceContainer;