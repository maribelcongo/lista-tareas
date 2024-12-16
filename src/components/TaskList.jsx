import { useState, useEffect } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Filters from "./Filters";

const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    return savedTasks.map((task) => ({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    }));
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const tasksToStore = tasks.map((task) => ({
      ...task,
      dueDate:
        task.dueDate instanceof Date
          ? task.dueDate.toISOString()
          : task.dueDate,
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
      dueDate: dueDate instanceof Date ? dueDate : new Date(), // Asegurarse de que dueDate sea un Date
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
      return; // No editar la tarea si la nueva descripción está vacía
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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div>
      <TaskForm addTask={addTask} />
      <Filters setFilter={setFilter} />
      <div className="task_list_containere">
        {filteredTasks.map((task) => (
          <Task
            key={task.ID}
            task={task}
            toggleComplete={toggleComplete}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
