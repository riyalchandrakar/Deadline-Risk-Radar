import { useState } from "react";
import api from "../api/axios";
import RiskBadge from "./RiskBadge";
import { formatDate } from "../utils/formatDate";

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: task.title,
    dueDate: task.dueDate.split("T")[0],
    estimatedHours: task.estimatedHours,
    priority: task.priority,
  });

  const updateTask = async () => {
    const { data } = await api.put(`/tasks/${task._id}`, form);
    onUpdate(data);
    setIsEditing(false);
  };

  const deleteTask = async () => {
    if (!confirm("Delete this task?")) return;
    await api.delete(`/tasks/${task._id}`);
    onDelete(task._id);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm space-y-3">
      {isEditing ? (
        <>
          <input
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            type="date"
            className="w-full border p-2 rounded"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />

          <input
            type="number"
            className="w-full border p-2 rounded"
            value={form.estimatedHours}
            onChange={(e) =>
              setForm({ ...form, estimatedHours: e.target.value })
            }
          />

          <select
            className="w-full border p-2 rounded"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={updateTask}
              className="bg-black text-white px-4 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="border px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-500">
                Due: {formatDate(task.dueDate)} • {task.estimatedHours} hrs •{" "}
                {task.priority}
              </p>
            </div>
            <RiskBadge level={task.riskLevel} />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm underline"
            >
              Edit
            </button>
            <button
              onClick={deleteTask}
              className="text-sm text-red-600 underline"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
