const allCategories = [
  "Food & Drinks",
  "Shopping",
  "Housing",
  "Transportation",
  "Life & Entertainment",
  "Salary",
  "Gift",
  "Investments",
  "Freelance",
  "Other Income",
];

function ExpensesCtgFilter(props) {
  function filterCategoryHandler(event) {
    props.onChangeCategory(event.target.value);
  }

  return (
    <div className="text-white px-4 font-bold border-b">
      <div className="flex w-full items-center justify-between my-4">
        <label>Filter by Category</label>
        <div className="relative inline-block">
          <select
            className="border rounded-3xl px-4 pr-8 text-center appearance-none hover:border-green-600 bg-transparent"
            onChange={filterCategoryHandler}
            value={props.selected}
          >
            <option value="ALL" style={{ backgroundColor: "#181C14", textAlign: "center" }}>
              All Categories
            </option>
            {allCategories.map((category) => (
              <option
                key={category}
                value={category}
                style={{ backgroundColor: "#181C14", textAlign: "center" }}
              >
                {category}
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

export default ExpensesCtgFilter;