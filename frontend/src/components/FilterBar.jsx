const filters = ["all", "safe", "at_risk", "likely_late"];

const FilterBar = ({ active, setActive }) => (
  <div className="flex gap-2">
    {filters.map((f) => (
      <button
        key={f}
        onClick={() => setActive(f)}
        className={`px-3 py-1 rounded ${
          active === f ? "bg-black text-white" : "bg-gray-100"
        }`}
      >
        {f.replace("_", " ")}
      </button>
    ))}
  </div>
);

export default FilterBar;
