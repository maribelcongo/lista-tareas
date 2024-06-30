
import  { useState } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash, FaCheck, FaRegCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';


const Task = ({ task, toggleComplete, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleEdit = () => {
    editTask(task.ID, newDescription);
    setIsEditing(false);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    setShowCalendar(false); 
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
      <button onClick={() => deleteTask(task.ID)} className="FaTrash">
        <FaTrash />
      </button>
      <button onClick={() => setShowCalendar(!showCalendar)} className="FaRegCalendarAlt">
        <FaRegCalendarAlt />
      </button>
      {showCalendar && (
        <CalendarPopup onChange={handleDateChange} selectedDate={selectedDate} />
      )}
    </div>
  );
};

const CalendarPopup = ({ onChange, selectedDate }) => {
  return (
    <div className="calendar-popup">
      <Calendar
        onChange={onChange}
        value={selectedDate}
      />
    </div>
  );
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
