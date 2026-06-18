import ExpenseDate from "./ExpenseDate";
import Card from "./Card";

function ExpenseItem({ date, title, amount, category, type }) {
  return (
    <div>
      <Card className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-2 my-4 bg-[#4b4b4b] hover:bg-[#323131] transition-colors">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <ExpenseDate date={date} />
          <h2 className="text-white text-base flex-1 sm:text-xl">
            {title}
            <div className="font-bold text-[#141010]">Category- {category}</div>
          </h2>
        </div>
        <div
          className={`self-end sm:self-auto text-white text-base font-bold border border-white p-2 rounded-[12px] sm:text-xl sm:px-6 sm:py-2
  ${type === "Income" ? "bg-green-700" : "bg-red-700"}`}
        >
          ${amount}
        </div>
      </Card>
    </div>
  );
}

export default ExpenseItem;