import { useState } from "react";
import api from "../api/axios";

const TaskForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    dueDate: "",
    estimatedHours: "",
    priority: "medium",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/tasks", form);
    onAdd(data);
    setForm({
      title: "",
      dueDate: "",
      estimatedHours: "",
      priority: "medium",
    });
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4 bg-white">
      {/* 🔹 Task Title */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Task Title
        </label>
        <input
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          placeholder="e.g. Prepare client presentation"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <p className="text-xs text-gray-500">
          Short, clear name of the task you need to complete.
        </p>
      </div>

      {/* 🔹 Due Date + Hours */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            required
          />
          <p className="text-xs text-gray-500">
            Final deadline for this task.
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Estimated Hours
          </label>
          <input
            type="number"
            min="1"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            placeholder="e.g. 4"
            value={form.estimatedHours}
            onChange={(e) =>
              setForm({ ...form, estimatedHours: e.target.value })
            }
            required
          />
          <p className="text-xs text-gray-500">
            Approximate time required to finish.
          </p>
        </div>
      </div>

      {/* 🔹 Priority */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Priority Level
        </label>
        <select
          className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Low – can be done later</option>
          <option value="medium">Medium – normal importance</option>
          <option value="high">High – urgent or critical</option>
        </select>
        <p className="text-xs text-gray-500">
          Helps us understand how urgent this task is.
        </p>
      </div>

      {/* 🔹 Submit */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
