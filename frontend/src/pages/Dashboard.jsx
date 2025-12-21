import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("/tasks").then((res) => setTasks(res.data));
  }, []);

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.riskLevel === filter);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <TaskForm onAdd={(task) => setTasks([task, ...tasks])} />
      <FilterBar active={filter} setActive={setFilter} />

      {filteredTasks.length === 0 && (
        <p className="text-gray-500">No tasks found.</p>
      )}

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
