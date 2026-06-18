import ExpenseDate from "./ExpenseDate";
import Card from "./Card";

function ExpenseItem({ date, title, amount, category, type }) {
  return (
    <div>
      <Card className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 p-3 my-4 bg-[#4b4b4b] hover:bg-[#323131] transition-colors">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <ExpenseDate date={date} />
          <div className="flex-1">
            <h2 className="text-white text-base sm:text-xl">{title}</h2>
            <p className="font-bold text-[#141010] text-sm sm:text-base">Category- {category}</p>
          </div>
        </div>
        <div
          className={`self-center sm:self-auto text-center text-white text-base font-bold border border-white p-2 px-4 rounded-[12px] sm:text-xl sm:px-6 sm:py-2
  ${type === "Income" ? "bg-green-700" : "bg-red-700"}`}
        >
          ${amount}
        </div>
      </Card>
    </div>
  );
}

export default ExpenseItem;