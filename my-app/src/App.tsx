import { useState } from "react";
import "./App.css";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (newTask.trim() === "") {
      return;
    }

    const task: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div className="app">
      <div className="container">
        <h1>My Task Manager</h1>

        <p className="subtitle">
          React + TypeScript + Vite
        </p>

        <div className="input-area">
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
          />

          <button onClick={addTask}>
            Add
          </button>
        </div>

        <p className="stats">
          {completedTasks} of {tasks.length} completed
        </p>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">
              No tasks yet. Add one above.
            </p>
          ) : (
            tasks.map((task) => (
              <div className="task" key={task.id}>
                <label className="task-text">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />

                  <span
                    className={
                      task.completed ? "completed" : ""
                    }
                  >
                    {task.text}
                  </span>
                </label>

                <button
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;