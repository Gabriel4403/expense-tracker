const allYears = ["2026", "2025", "2024", "2023", "2022"];

function ExpensesFilterYear(props) {
  function filterYearHandler(event) {
    props.onChangeFilter(event.target.value);
  }

  return (
    <div className="text-white px-4 font-bold border-b">
      <div className="flex w-full items-center justify-between my-4">
        <label>Filter by Year</label>
        <div className="relative inline-block">
          <select
            className="border rounded-3xl px-4 pr-8 text-center appearance-none hover:border-green-600 bg-transparent [text-align-last:center]"
            onChange={filterYearHandler}
            value={props.selected}
          >
            <option
              value="ALL"
              style={{ backgroundColor: "#181C14", textAlign: "center" }}
            >
              All Years
            </option>
            {allYears.map((year) => (
              <option
                key={year}
                value={year}
                style={{ backgroundColor: "#181C14" }}
                className="[text-align-last:center]"
              >
                {year}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white">
            ▾
          </span>
        </div>
      </div>
    </div>
  );
}

export default ExpensesFilterYear;
