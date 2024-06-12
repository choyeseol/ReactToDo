import React from "react";
import { useNavigate } from "react-router-dom";
import "./TrashPage.css";

const TrashPage = () => {
  const navigate = useNavigate();
  const trashTasks = JSON.parse(localStorage.getItem("trashTasks")) || [];

  const handleDeleteTaskPermanently = (index) => {
    const updatedTrashTasks = trashTasks.filter((_, i) => i !== index);
    localStorage.setItem("trashTasks", JSON.stringify(updatedTrashTasks));
    window.location.reload();
  };

  const handleRestoreTask = (index) => {
    const taskToRestore = trashTasks[index];
    const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = [...currentTasks, taskToRestore];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    handleDeleteTaskPermanently(index);
  };

  return (
    <div className="trash-container">
      <h2>휴지통</h2>
      <ul className="trash-list">
        {trashTasks.map((task, index) => (
          <li key={index}>
            <span>{task.text}</span>
            <div>
              <button onClick={() => handleRestoreTask(index)}>복원</button>
              <button onClick={() => handleDeleteTaskPermanently(index)}>
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="trash-layout">
        <button className="back-button" onClick={() => navigate("/")}>
          ToDO로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default TrashPage;
