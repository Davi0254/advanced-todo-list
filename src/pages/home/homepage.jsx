import "/src/index.css";
import ListComponent from "/src/components/list/list.jsx";
import React, { useEffect, useState } from "react";
import LoginRoute from "/src/Routes/loginRoute.jsx";
import "./home.css";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const username = localStorage.getItem("username");
      console.log('username:', username)

      if (!username) {
        setError("Usuario nao encontrado");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `https://localhost:3000/auth/tasks?username=${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setTasks(data.tasks || []);
          setError("");
        } else {
          setError(data.error || "Voce nao possui tarefas");
        }
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        setError("Erro ao conectar com o servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTasks = async () => {
    if (newTask.trim() === "") {
      setError("A tarefa nao pode estar vazia");
      return;
    }

    const username = localStorage.getItem("username");
    if (!username) {
      setError("Usuario nao encontrado");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://localhost:3000/auth/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          description: newTask,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        if (data.taskID) {
          setTasks((prevTasks) => [
            ...prevTasks, 
            { id: data.taskID, description: newTask }
          ]);
          setNewTask("");
          setError("");
        } else {
          setError('"Erro ao adicionar tarefa: dados incompletos do servidor.');
        }
      } else {
        setError(data.error || "Erro ao adicionar tarefa");
      }
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="head">
        <h1 className="title">
          Lista-de-tarefas
          <br />
          avançada
          <img src="src/assets/notepad-svgrepo-com(1).svg" alt="Notepad Icon" />
        </h1>
        <LoginRoute />
      </div>

      <div className="add">
        <input
          className="add-input"
          type="search"
          placeholder="adicione sua tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="adicionar" onClick={addTasks}>
          {loading ? "Carregando..." : "ADICIONAR"}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <ListComponent tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
