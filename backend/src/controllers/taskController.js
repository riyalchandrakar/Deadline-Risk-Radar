import Task from "../models/Task.js";
import { calculateRisk } from "../utils/calculateRisk.js";

export const createTask = async (req, res) => {
  const { title, dueDate, estimatedHours, priority } = req.body;

  const riskLevel = calculateRisk({
    dueDate,
    estimatedHours,
    priority
  });

  const task = await Task.create({
    title,
    dueDate,
    estimatedHours,
    priority,
    riskLevel,
    user: req.user.id
  });

  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort("-createdAt");
  res.json(tasks);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.user.toString() !== req.user.id)
    return res.status(401).json({ message: "Unauthorized" });

  const updatedData = { ...req.body };
  updatedData.riskLevel = calculateRisk({
    dueDate: updatedData.dueDate,
    estimatedHours: updatedData.estimatedHours,
    priority: updatedData.priority
  });

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true }
  );

  res.json(updatedTask);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task removed" });
};
