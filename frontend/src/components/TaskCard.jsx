import RiskBadge from "./RiskBadge";
import { formatDate } from "../utils/formatDate";

const TaskCard = ({ task }) => (
  <div className="bg-white p-4 rounded shadow-sm flex justify-between">
    <div>
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-500">
        Due: {formatDate(task.dueDate)} • {task.estimatedHours} hrs • {task.priority}
      </p>
    </div>
    <RiskBadge level={task.riskLevel} />
  </div>
);

export default TaskCard;
