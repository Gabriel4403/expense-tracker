import ExpenseDate from "./ExpenseDate";
import Card from "./Card";

function ExpenseItem({ date, title, amount, category, type }) {
  return (
    <div>
      <Card className="flex justify-between items-center p-2 my-4 bg-[#4b4b4b] hover:bg-[#323131] transition-colors">
        <ExpenseDate date={date} />
        <div className="flex flex-col-reverse gap-4 items-end justify-start flex-1 sm:flex-row sm:items-center">
          <h2 className="text-white text-base flex-1 mx-4 sm:text-xl">
            {title}
            <div className="font-bold text-[#141010]">Category- {category}</div>
          </h2>
          <div
            className={`text-white text-base font-bold border border-white p-2 rounded-[12px] sm:text-xl sm:px-6 sm:py-2
    ${type === "Income" ? "bg-green-700" : "bg-red-700"}`}
          >
            ${amount}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ExpenseItem;