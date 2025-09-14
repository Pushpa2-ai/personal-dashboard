// src/components/TasksWeekly.jsx
import React, { useState } from "react";

function TasksWeekly() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Weekly 1 Task", done: false },
    { id: 2, text: "Weekly 2 Task", done: false },
    { id: 3, text: "Weekly 3 Task", done: false },
    { id: 4, text: "Weekly 4 Task", done: false },
  ]);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Weekly Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="w-5 h-5"
            />
            <span
              className={`${
                task.done ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksWeekly;
