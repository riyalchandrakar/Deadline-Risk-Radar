export const calculateRisk = ({ dueDate, estimatedHours, priority }) => {
  const now = new Date();
  const timeLeftHours = (new Date(dueDate) - now) / (1000 * 60 * 60);

  if (timeLeftHours <= 0) return "likely_late";

  const priorityMultiplier = {
    low: 1,
    medium: 1.2,
    high: 1.5
  };

  const effectiveEffort =
    estimatedHours * (priorityMultiplier[priority] || 1);

  if (timeLeftHours >= effectiveEffort * 1.5) return "safe";
  if (timeLeftHours >= effectiveEffort) return "at_risk";

  return "likely_late";
};
