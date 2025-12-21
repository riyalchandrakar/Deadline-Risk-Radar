export const calculateRisk = ({ dueDate, estimatedHours, priority }) => {
  const IST_OFFSET = 5.5 * 60 * 60 * 1000;
  const now = new Date(Date.now() + IST_OFFSET);

  const endOfDueDate = new Date(dueDate);
  endOfDueDate.setUTCHours(23, 59, 59, 999);

  const hoursLeft =
    (endOfDueDate - now) / (1000 * 60 * 60);

  if (hoursLeft <= 0) return "likely_late";

  const WORK_HOURS_PER_DAY = 8;
  const BUFFER = 1.2;

  const prioritySensitivity = {
    low: 1.0,
    medium: 1.15,
    high: 1.3,
  };

  const sensitivity = prioritySensitivity[priority] || 1;

  // ✅ MULTI-DAY CAPACITY (THIS WAS MISSING)
  const daysLeft = Math.ceil(hoursLeft / 24);
  const totalAvailableHours = daysLeft * WORK_HOURS_PER_DAY;

  const requiredHours =
    estimatedHours * BUFFER * sensitivity;

  // SAFE
  if (totalAvailableHours >= requiredHours * 1.5) {
    return "safe";
  }

  // AT RISK
  if (totalAvailableHours >= requiredHours) {
    return "at_risk";
  }

  return "likely_late";
};
