const filters = [
  { key: "all", label: "All Tasks" },
  { key: "safe", label: "Safe" },
  { key: "at_risk", label: "At Risk" },
  { key: "likely_late", label: "Likely Late" },
];

const styles = {
  all: "bg-gray-200 text-gray-800",
  safe: "bg-green-100 text-green-700",
  at_risk: "bg-yellow-100 text-yellow-700",
  likely_late: "bg-red-100 text-red-700",
};

const FilterBar = ({ active, setActive }) => (
  <div className="flex flex-wrap gap-2">
    {filters.map((f) => {
      const isActive = active === f.key;

      return (
        <button
          key={f.key}
          onClick={() => setActive(f.key)}
          className={`
            px-4 py-1.5
            rounded-full
            text-sm font-medium
            transition
            ${
              isActive
                ? "bg-black text-white shadow-sm"
                : `${styles[f.key]} hover:opacity-80`
            }
          `}
        >
          {f.label}
        </button>
      );
    })}
  </div>
);

export default FilterBar;
