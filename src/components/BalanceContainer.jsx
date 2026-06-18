import ExpenseForm from "./ExpenseForm";
import Wallet from "./Wallet";

function BalanceContainer({ onAddExpense, balance, setBalance }) {
  return (
    <div className="relative top-24 sm:top-38 flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-6 w-full max-w-[48rem] mx-auto px-4 sm:px-0">
      <div className="flex-1">
        <Wallet balance={balance} setBalance={setBalance} />
      </div>
      <div className="flex-1">
        <ExpenseForm
          onSaveExpenseData={onAddExpense}
          setBalance={setBalance}
        />
      </div>
    </div>
  );
}

export default BalanceContainer;