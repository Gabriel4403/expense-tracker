import Logo from "../assets/LogoExpense.png";

// Simple Header showing title of the app and the icon

export default function Header() {
  return (
    <div className="absolute h-auto sm:h-[10%] gap-3 sm:gap-10 inset-x-0 top-0 flex flex-row justify-center mx-auto w-full  sm:max-w-screen-md max-w-screen-md mt-4 sm:mt-6 items-center border-2 border-[#94B4C1] bg-[#94B4C1] md:rounded-3xl p-3 sm:p-2">
      <div className="flex items-center gap-2 sm:gap-3">
        <img src={Logo} className="h-10 sm:h-15" />
        <h1 className="text-2xl sm:text-4xl text-shadow-white font-bold shadow-md">Expense Tracker</h1>
      </div>
    </div>
  );
}