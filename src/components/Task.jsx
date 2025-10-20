import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash, FaCheck, FaRegCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "./Modal";
import "./task.css";
const Task = ({
  task,
  toggleComplete,
  editTask,
  deleteTask,
  updateTaskDate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(task.dueDate || new Date());
  const [showModal, setShowModal] = useState(false);
  const [dueClass, setDueClass] = useState("");

  // Determinar clase según fecha
  useEffect(() => {
    if (!task.dueDate) {
      setDueClass("due-later");
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);

    const diffTime = taskDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (task.completed) {
      setDueClass("completed");
    } else if (diffDays <= 0) {
      setDueClass("due-today");
    } else if (diffDays <= 3) {
      setDueClass("due-soon");
    } else {
      setDueClass("due-later");
    }
  }, [task.dueDate, task.completed]);

  const handleEdit = () => {
    editTask(task.ID, newDescription);
    setIsEditing(false);
  };

  const handleDateChange = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date >= today) {
      setSelectedDate(date);
      updateTaskDate(task.ID, date);
      setShowCalendar(false);
    } else {
      alert("No se pueden seleccionar fechas pasadas.");
    }
  };

  return (
    <div className={`task ${dueClass}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.ID)}
      />
      {isEditing ? (
        <>
          <input
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button onClick={handleEdit}>
            <FaCheck />
          </button>
        </>
      ) : (
        <>
          <span>{task.description}</span>
          <span className="due-date">
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Sin fecha"}
          </span>
          <button onClick={() => setIsEditing(true)}>
            <FaEdit />
          </button>
        </>
      )}
      <button onClick={() => setShowModal(true)}>
        <FaTrash />
      </button>
      <button onClick={() => setShowCalendar(!showCalendar)}>
        <FaRegCalendarAlt />
      </button>
      {showCalendar && (
        <CalendarPopup
          onChange={handleDateChange}
          selectedDate={selectedDate}
          minDate={new Date()}
        />
      )}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          deleteTask(task.ID);
          setShowModal(false);
        }}
        message="¿Estás seguro de que deseas eliminar esta tarea?"
      />
    </div>
  );
};

const CalendarPopup = ({ onChange, selectedDate, minDate }) => {
  return (
    <div className="calendar-popup">
      <Calendar
        onChange={onChange}
        value={selectedDate}
        minDate={minDate}
        tileClassName={({ date }) =>
          date.toDateString() === selectedDate.toDateString()
            ? "selected-day"
            : null
        }
      />
    </div>
  );
};

CalendarPopup.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  minDate: PropTypes.instanceOf(Date).isRequired,
};

Task.propTypes = {
  task: PropTypes.shape({
    ID: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    dueDate: PropTypes.instanceOf(Date),
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTaskDate: PropTypes.func.isRequired,
};

export default Task;
