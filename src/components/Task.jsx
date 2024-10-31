import { useState } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash, FaCheck, FaRegCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../index.css";
import Modal from "./Modal";

const Task = ({ task, toggleComplete, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    editTask(task.ID, newDescription);
    setIsEditing(false);
  };

  const handleDateChange = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date >= today) {
      setSelectedDate(date);
      setShowCalendar(false);
    } else {
      alert("No se pueden seleccionar fechas pasadas.");
    }
  };

  const handleDelete = () => {
    deleteTask(task.ID);
    setShowModal(false);
  };

  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.ID)}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button onClick={handleEdit} className="FaCheck">
            <FaCheck />
          </button>
        </>
      ) : (
        <>
          <span>{task.description}</span>
          <button onClick={() => setIsEditing(true)} className="FaEdit">
            <FaEdit />
          </button>
        </>
      )}
      <button onClick={() => setShowModal(true)} className="FaTrash">
        <FaTrash />
      </button>
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="FaRegCalendarAlt"
      >
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
        onConfirm={handleDelete}
        message="¿Estás seguro de que deseas eliminar esta tarea?"
      />
    </div>
  );
};

const CalendarPopup = ({ onChange, selectedDate, minDate }) => {
  const tileClassName = ({ date }) => {
    return date.toDateString() === selectedDate.toDateString()
      ? "selected-day"
      : null;
  };

  return (
    <div className="calendar-popup">
      <Calendar
        onChange={onChange}
        value={selectedDate}
        minDate={minDate}
        tileClassName={tileClassName}
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
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
