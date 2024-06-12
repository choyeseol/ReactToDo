import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import TrashPage from "./TrashPage";
import "./App.css";

const TodoApp = () => {
  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(initialTasks);

  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const updatedTasks = [...tasks, { text: newTask, completed: false }];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setNewTask("");
  };

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (index) => {
    const taskToDelete = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    const trashTasks = JSON.parse(localStorage.getItem("trashTasks")) || [];
    const updatedTrashTasks = [...trashTasks, taskToDelete];
    localStorage.setItem("trashTasks", JSON.stringify(updatedTrashTasks));
  };

  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="todo-list-container">
        <p>ToDo LIST</p>
        <div className="todo-input">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="할 일을 입력하세요"
          />
          <button onClick={handleAddTask}>+</button>
        </div>
        <ul className="todo-list">
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(index)}
              />
              <span>{task.text}</span>
              <button onClick={() => handleDeleteTask(index)}>🗑️</button>
            </li>
          ))}
        </ul>
        <div className="trash-layout">
          <button className="trash-button" onClick={() => navigate("/trash")}>
            휴지통
          </button>
        </div>
      </div>
    </div>
  );
};

function MainApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoApp />} />
        <Route path="/trash" element={<TrashPage />} />
      </Routes>
    </Router>
  );
}

export default MainApp;
