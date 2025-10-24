import React, { useState } from "react";
import { Task } from "../types/Task";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState<string>("");
  const [estimatedHours, setEstimatedHours] = useState<number | "">("");
  const [dueDate, setDueDate] = useState<string>("");
  const [dependencies, setDependencies] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !estimatedHours || !dueDate) return;

    const newTask: Task = {
      title,
      estimatedHours: Number(estimatedHours),
      dueDate,
      dependencies: dependencies
        ? dependencies.split(",").map((d) => d.trim())
        : [],
    };

    onAddTask(newTask);
    setTitle("");
    setEstimatedHours("");
    setDueDate("");
    setDependencies("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Task Title"
        className="w-full border rounded-lg p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Estimated Hours"
        className="w-full border rounded-lg p-2"
        value={estimatedHours}
        onChange={(e) =>
          setEstimatedHours(e.target.value ? Number(e.target.value) : "")
        }
      />
      <input
        type="date"
        className="w-full border rounded-lg p-2"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dependencies (comma separated)"
        className="w-full border rounded-lg p-2"
        value={dependencies}
        onChange={(e) => setDependencies(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition-all"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
