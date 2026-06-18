import CashflowChart from "./Chart/CashFlowChart";
import TopExpenses from "./TopExpenses";

export default function OtherDetails({ expenses }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-6 w-full max-w-[47.5rem] mx-auto mt-6 mb-10 px-4 sm:px-0">
      <div className="flex-1">
        <CashflowChart expenses={expenses} />
      </div>
      <div className="flex-1">
        <TopExpenses expenses={expenses} />
      </div>
    </div>
  );
}