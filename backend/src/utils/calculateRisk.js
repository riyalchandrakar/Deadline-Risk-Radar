export const calculateRisk = ({ dueDate, estimatedHours, priority }) => {
  // 🇮🇳 IST offset (UTC + 5:30)
  const IST_OFFSET = 5.5 * 60 * 60 * 1000;

  // Current time in IST
  const nowIST = new Date(Date.now() + IST_OFFSET);

  // Due date END OF DAY in IST
  const endOfDueDateIST = new Date(dueDate);
  endOfDueDateIST.setUTCHours(23, 59, 59, 999);

  // Remaining time in hours (IST)
  const hoursLeft =
    (endOfDueDateIST - nowIST) / (1000 * 60 * 60);

  // Deadline crossed
  if (hoursLeft <= 0) return "likely_late";

  // Real-world assumptions
  const WORK_HOURS_PER_DAY = 8;
  const BUFFER = 1.2;

  // Priority sensitivity
  const prioritySensitivity = {
    low: 1.0,
    medium: 1.15,
    high: 1.3,
  };

  const sensitivity = prioritySensitivity[priority] || 1;

  // Required effort
  const requiredHours = estimatedHours * BUFFER;

  // Max realistic work hours in a day
  const effectiveAvailableHours = Math.min(
    hoursLeft,
    WORK_HOURS_PER_DAY
  );

  // 🟢 SAFE
  if (
    effectiveAvailableHours >=
    requiredHours * sensitivity * 1.5
  ) {
    return "safe";
  }

  // 🟡 AT RISK
  if (
    effectiveAvailableHours >=
    requiredHours * sensitivity
  ) {
    return "at_risk";
  }

  // 🔴 LIKELY LATE
  return "likely_late";
};
