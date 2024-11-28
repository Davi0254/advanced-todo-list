import React, { useState } from "react";
import "/src/index.css";

export default function ListComponent({ tasks, setTasks }) {
  const [isEditing, setIsEditing] = useState(null);
  const [newText, setNewText] = useState("");
  
  const toggleCompleted = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index && task ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://localhost:3000/auth/delete?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorDetails = `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(`Failed to delete ${errorDetails}`);
      }

      const data = await response.json();
      console.log(data);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Could not delete the task. Please try again");
    }
  };

  const startEditing = (index) => {
    setIsEditing(index);
    setNewText(tasks[index].description);
  };

  const handleEditChange = (event) => {
    console.log(event.target.value);
    setNewText(event.target.value);
  };

  const saveEdit = async (index) => {
    const taskToUpdate = tasks[index];
    console.log(taskToUpdate)
    if (!taskToUpdate || !taskToUpdate.id) {
      console.error("Task ou id nao encontrados")
    }

    try {
      const response = await fetch(`https://localhost:3000/auth/updatetask/${taskToUpdate.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: newText }),
      });
      console.log(response)

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const data = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task, i) =>
          i === index ? { ...task, description: newText } : task
        )
      );

      setIsEditing(null);
      setNewText("");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setNewText("");
  };

  return (
    <ol className="list">
      {tasks.map((task, index) =>
        task ? (
          <div key={task.id} className="item">
            {isEditing === index ? (
              <div className="edit-input">
                <input
                  className="edit-placeholder"
                  type="text"
                  value={newText}
                  onChange={handleEditChange}
                />
                <div className="save-cancel">
                  <button className="save" onClick={() => saveEdit(index)}>
                    Save
                  </button>
                  <button className="cancel" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <li
                onClick={() => toggleCompleted(index)}
                className={task.completed ? "done" : ""}
              >
                {task.description}
              </li>
            )}
            <div className="button">
              <button onClick={() => startEditing(index)}>EDITAR</button>
              <button className="delete" onClick={() => handleDelete(task.id)}>
                DELETAR
              </button>
            </div>
          </div>
        ) : (
          <div key={task.id} className="error-item">
            Tarefa invalida
          </div>
        )
      )}
    </ol>
  );
}
