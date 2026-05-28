import Logo from "../assets/LogoExpense.png";

export default function Header() {
  return (
    <div className="absolute h-[10%] gap-10 inset-x-0 top-0 flex flex-row justify-center mx-auto w-full max-w-screen-md mt-6 items-center border-2 border-[#94B4C1] bg-[#94B4C1] md:rounded-3xl p-2">
      <div className="flex items-center gap-3">
        <img src={Logo} className="h-15" />
        <h1 className="text-4xl text-shadow-white font-bold shadow-md">Expense Tracker</h1>
      </div>
    </div>
  );
}
