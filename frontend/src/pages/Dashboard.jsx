import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [openForm, setOpenForm] = useState(false);

  // ✅ Dynamic fetch (system time based risk update)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await api.get("/tasks");
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };

    fetchTasks(); // initial load

    const interval = setInterval(
      fetchTasks,
      5 * 60 * 1000 // refresh every 5 minutes
    );

    return () => clearInterval(interval);
  }, []);

  const updateTaskInList = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
  };

  const deleteTaskFromList = (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((t) => t.riskLevel === filter);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Deadline Risk Radar
        </h1>

        <button
          onClick={() => setOpenForm(true)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          + Add Task
        </button>
      </div>

      {/* 🔹 Filter */}
      <FilterBar active={filter} setActive={setFilter} />

      {/* 🔹 Task List */}
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No tasks found for this filter.
        </p>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={updateTaskInList}
              onDelete={deleteTaskFromList}
            />
          ))}
        </div>
      )}

      {/* 🔹 Modal */}
      {openForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 animate-scaleIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Create New Task</h2>
              <button
                onClick={() => setOpenForm(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <TaskForm
              onAdd={(task) => {
                setTasks((prev) => [task, ...prev]);
                setOpenForm(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
