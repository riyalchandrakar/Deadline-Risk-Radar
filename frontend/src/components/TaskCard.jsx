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
    if (!confirm("Delete this task permanently?")) return;
    await api.delete(`/tasks/${task._id}`);
    onDelete(task._id);
  };

  return (
    <div className="bg-white rounded-xl border p-4 space-y-3 hover:shadow-md transition">
      {isEditing ? (
        <>
          {/* ✏️ Edit Mode */}
          <div className="space-y-3">
            <input
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black/20 outline-none"
              placeholder="Task title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black/20 outline-none"
                value={form.dueDate}
                onChange={(e) =>
                  setForm({ ...form, dueDate: e.target.value })
                }
              />

              <input
                type="number"
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black/20 outline-none"
                placeholder="Hours"
                value={form.estimatedHours}
                onChange={(e) =>
                  setForm({ ...form, estimatedHours: e.target.value })
                }
              />
            </div>

            <select
              className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-black/20 outline-none"
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </select>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-1.5 rounded-lg border text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={updateTask}
                className="px-4 py-1.5 rounded-lg bg-black text-white text-sm hover:bg-gray-800"
              >
                Save changes
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 📌 View Mode */}
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-800">
                {task.title}
              </h3>

              <p className="text-sm text-gray-500">
                Due {formatDate(task.dueDate)} • {task.estimatedHours} hrs •{" "}
                <span className="capitalize">{task.priority}</span>
              </p>
            </div>

            <RiskBadge level={task.riskLevel} />
          </div>

          <div className="flex gap-4 pt-2 text-sm">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-600 hover:text-black transition"
            >
              ✏️ Edit
            </button>
            <button
              onClick={deleteTask}
              className="text-red-600 hover:text-red-700 transition"
            >
              🗑 Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
