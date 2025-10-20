import { useState, useEffect } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Filters from "./Filters";
import "./tasklist.css";

const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks.map((task) => ({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
      notes: task.notes || "", // agregar notas al cargar
    }));
  });

  const [filter, setFilter] = useState("all");

  // Guardar tareas en localStorage
  useEffect(() => {
    const tasksToStore = tasks.map((task) => ({
      ...task,
      dueDate:
        task.dueDate instanceof Date
          ? task.dueDate.toISOString()
          : task.dueDate,
      notes: task.notes || "",
    }));
    localStorage.setItem("tasks", JSON.stringify(tasksToStore));
  }, [tasks]);

  const addTask = (description, dueDate) => {
    if (description.trim() === "") {
      alert("La tarea no puede estar vacía");
      return;
    }
    const newTask = {
      description,
      ID: Date.now().toString(),
      completed: false,
      dueDate: dueDate instanceof Date ? dueDate : new Date(),
      notes: "", // inicializar notas vacías
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.ID === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newDescription) => {
    if (newDescription.trim() === "") {
      alert("La descripción no puede estar vacía");
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.ID === id ? { ...task, description: newDescription } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.ID !== id));
  };

  const updateTaskDate = (id, newDate) => {
    setTasks(
      tasks.map((task) =>
        task.ID === id ? { ...task, dueDate: newDate } : task
      )
    );
  };

  const updateNotes = (id, newNotes) => {
    setTasks(
      tasks.map((task) =>
        task.ID === id ? { ...task, notes: newNotes } : task
      )
    );
  };

  // Filtrar y ordenar tareas
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate - b.dueDate;
    });

  return (
    <div className="task-list-container">
      <TaskForm addTask={addTask} />
      <Filters setFilter={setFilter} />
      <div className="task-list">
        {filteredTasks.map((task) => (
          <Task
            key={task.ID}
            task={task}
            toggleComplete={toggleComplete}
            editTask={editTask}
            deleteTask={deleteTask}
            updateTaskDate={updateTaskDate}
            updateNotes={updateNotes} // pasar función a cada Task
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
