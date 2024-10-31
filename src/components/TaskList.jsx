import { useState, useEffect } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Filters from "./Filters";

const TaskList = () => {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (description) => {
    const newTask = {
      description,
      ID: Date.now().toString(),
      completed: false,
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
    <div className="">
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
