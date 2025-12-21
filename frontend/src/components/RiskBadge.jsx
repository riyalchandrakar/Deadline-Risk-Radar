const styles = {
  safe: "bg-green-100 text-green-700",
  at_risk: "bg-yellow-100 text-yellow-700",
  likely_late: "bg-red-100 text-red-700",
};

const labels = {
  safe: "Safe",
  at_risk: "At Risk",
  likely_late: "Likely Late",
};

const RiskBadge = ({ level }) => (
  <span className={`px-2 py-1 rounded text-sm ${styles[level]}`}>
    {labels[level]}
  </span>
);

export default RiskBadge;
