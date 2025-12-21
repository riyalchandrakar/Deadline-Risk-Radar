import Task from "../models/Task.js";
import { calculateRisk } from "../utils/calculateRisk.js";

/**
 * CREATE TASK
 * ❌ Do NOT store risk in DB
 * ✅ Calculate only for response
 */
export const createTask = async (req, res) => {
  const { title, dueDate, estimatedHours, priority } = req.body;

  const task = await Task.create({
    title,
    dueDate,
    estimatedHours,
    priority,
    user: req.user.id,
  });

  const taskWithRisk = {
    ...task.toObject(),
    riskLevel: calculateRisk({
      dueDate: task.dueDate,
      estimatedHours: task.estimatedHours,
      priority: task.priority,
    }),
  };

  res.status(201).json(taskWithRisk);
};

/**
 * GET TASKS
 * ✅ Risk calculated dynamically EVERY TIME
 */
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort("-createdAt");

  const tasksWithDynamicRisk = tasks.map((task) => ({
    ...task.toObject(),
    riskLevel: calculateRisk({
      dueDate: task.dueDate,
      estimatedHours: task.estimatedHours,
      priority: task.priority,
    }),
  }));

  res.json(tasksWithDynamicRisk);
};

/**
 * UPDATE TASK
 * ❌ Do NOT store risk
 * ✅ Recalculate for response
 */
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task)
    return res.status(404).json({ message: "Task not found" });

  if (task.user.toString() !== req.user.id)
    return res.status(401).json({ message: "Unauthorized" });

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  const taskWithRisk = {
    ...updatedTask.toObject(),
    riskLevel: calculateRisk({
      dueDate: updatedTask.dueDate,
      estimatedHours: updatedTask.estimatedHours,
      priority: updatedTask.priority,
    }),
  };

  res.json(taskWithRisk);
};

/**
 * DELETE TASK
 */
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task removed" });
};
