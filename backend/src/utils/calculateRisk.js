export const calculateRisk = ({ dueDate, estimatedHours, priority }) => {
  // ✅ Current time in IST
  const IST_OFFSET = 5.5 * 60 * 60 * 1000;
  const now = new Date(Date.now() + IST_OFFSET);

  // ✅ Due date end of day (IST)
  const endOfDueDate = new Date(dueDate);
  endOfDueDate.setUTCHours(23, 59, 59, 999);

  const hoursLeft =
    (endOfDueDate - now) / (1000 * 60 * 60);

  // Deadline crossed
  if (hoursLeft <= 0) return "likely_late";

  // 🔥 Priority only increases effort (not capacity)
  const priorityMultiplier = {
    low: 1.0,     // jitna estimate utna hi
    medium: 1.2,  // thoda zyada lag sakta hai
    high: 1.4,    // kaafi zyada lag sakta hai
  };

  const multiplier = priorityMultiplier[priority] || 1;

  const requiredHours = estimatedHours * multiplier;

  // ✅ SAFE: kaafi extra time hai
  if (hoursLeft >= requiredHours * 1.3) {
    return "safe";
  }

  // ⚠️ AT RISK: bas bas match ho raha hai
  if (hoursLeft >= requiredHours) {
    return "at_risk";
  }

  // ❌ LIKELY LATE: time kam hai
  return "likely_late";
};
