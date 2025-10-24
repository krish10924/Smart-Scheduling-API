import React,  { useEffect,useState } from "react";

import axios from "axios";
import { Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import ScheduleResult from "./components/ScheduleResult";
import "./index.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
});
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
  const [recommendedOrder, setRecommendedOrder] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (index: number) => {
  if (window.confirm(`Delete task "${tasks[index].title}"?`)) {
    setTasks(tasks.filter((_, i) => i !== index));
  }
};

const handleDependencyChange = (taskIndex: number, depTitle: string, checked: boolean) => {
  setTasks(prevTasks => {
    const updatedTasks = [...prevTasks];
    const deps = new Set(updatedTasks[taskIndex].dependencies);

    if (checked) deps.add(depTitle);
    else deps.delete(depTitle);

    updatedTasks[taskIndex].dependencies = Array.from(deps);
    return updatedTasks;
  });
};


  const handleSchedule = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post(
"https://smart-scheduling-api-2.onrender.com/api/v1/projects/123/schedule",
        { tasks }
      );
      setRecommendedOrder(response.data.recommendedOrder);
    } catch {
      setError("Failed to generate schedule. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          🧠 Smart Task Scheduler
        </h1>

        <TaskForm onAddTask={handleAddTask} />

        {tasks.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Current Tasks:</h2>
            <ul className="list-none ml-0 space-y-2">
  {tasks.map((t, i) => (
  <li
    key={i}
    className="flex flex-col bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition"
  >
    <div className="flex justify-between items-center">
      <div>
        <span className="font-medium">{t.title}</span> — {t.estimatedHours}h (Due {t.dueDate})
      </div>
      <button
        onClick={() => handleDeleteTask(i)}
        className="text-red-600 hover:text-red-800 font-bold"
        title="Delete task"
      >
        ❌
      </button>
    </div>

    {/* Dependencies editor */}
    <div className="mt-1">
      <span className="font-sm text-gray-600">Dependencies:</span>
      <div className="flex flex-wrap gap-2 mt-1">
        {tasks
          .filter(task => task.title !== t.title)
          .map((task, idx) => (
            <label key={idx} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={t.dependencies.includes(task.title)}
                onChange={(e) => handleDependencyChange(i, task.title, e.target.checked)}
              />
              {task.title}
            </label>
          ))}
      </div>
    </div>
  </li>
))}

</ul>

          </div>
        )}

        <button
          onClick={handleSchedule}
          disabled={loading || tasks.length === 0}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-all"
        >
          {loading ? "Generating..." : "Generate Schedule"}
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}

        {recommendedOrder.length > 0 && (
          <ScheduleResult recommendedOrder={recommendedOrder} />
        )}
      </div>
    </div>
  );
};

export default App;
