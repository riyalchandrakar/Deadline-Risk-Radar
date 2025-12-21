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
    setForm({ title: "", dueDate: "", estimatedHours: "", priority: "medium" });
  };

  return (
    <form onSubmit={submitHandler} className="space-y-3 bg-white p-4 rounded">
      <input
        className="w-full border p-2 rounded"
        placeholder="Task title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <input
        type="date"
        className="w-full border p-2 rounded"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        required
      />
      <input
        type="number"
        className="w-full border p-2 rounded"
        placeholder="Estimated hours"
        value={form.estimatedHours}
        onChange={(e) => setForm({ ...form, estimatedHours: e.target.value })}
        required
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

      <button className="w-full bg-black text-white py-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
