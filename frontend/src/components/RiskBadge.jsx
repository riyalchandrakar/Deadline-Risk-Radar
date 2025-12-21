const styles = {
  safe: {
    container: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  at_risk: {
    container: "bg-yellow-50 text-yellow-700 border-yellow-200",
    dot: "bg-yellow-500",
  },
  likely_late: {
    container: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500 animate-pulse",
  },
};

const labels = {
  safe: "Safe",
  at_risk: "At Risk",
  likely_late: "Likely Late",
};

const RiskBadge = ({ level }) => {
  if (!level) return null;

  return (
    <span
      className={`
        inline-flex items-center gap-2
        px-3 py-1.5
        rounded-full
        text-xs font-medium
        border
        ${styles[level].container}
        transition
      `}
    >
      {/* status dot */}
      <span
        className={`w-2 h-2 rounded-full ${styles[level].dot}`}
      />
      {labels[level]}
    </span>
  );
};

export default RiskBadge;
