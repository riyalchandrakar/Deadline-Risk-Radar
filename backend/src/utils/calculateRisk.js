export const calculateRisk = ({ dueDate, estimatedHours, priority }) => {
  const now = new Date();

  // Treat deadline as END OF DAY
  const endOfDueDate = new Date(dueDate);
  endOfDueDate.setHours(23, 59, 59, 999);

  const hoursLeft =
    (endOfDueDate - now) / (1000 * 60 * 60);

  // Deadline truly crossed
  if (hoursLeft <= 0) return "likely_late";

  // Real-world assumptions
  const WORK_HOURS_PER_DAY = 8;
  const BUFFER = 1.2; // 20% buffer

  // Priority affects sensitivity (not effort)
  const prioritySensitivity = {
    low: 1.0,
    medium: 1.15,
    high: 1.3,
  };

  const sensitivity = prioritySensitivity[priority] || 1;

  const requiredHours = estimatedHours * BUFFER;

  // User realistically can work max 8 hrs/day
  const effectiveAvailableHours = Math.min(
    hoursLeft,
    WORK_HOURS_PER_DAY
  );

  // SAFE
  if (
    effectiveAvailableHours >=
    requiredHours * sensitivity * 1.5
  ) {
    return "safe";
  }

  // AT RISK
  if (effectiveAvailableHours >= requiredHours) {
    return "at_risk";
  }

  // LIKELY LATE
  return "likely_late";
};
