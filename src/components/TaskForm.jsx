import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import "./taskform.css";
const TaskForm = ({ addTask }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const selectedDate = data.dueDate ? new Date(data.dueDate) : new Date();

    // Normalizar fechas a medianoche
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("No se pueden agregar tareas con fecha pasada.");
      return;
    }

    addTask(data.description, selectedDate);
    reset();
  };

  // Fecha de hoy para el input type="date"
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="task-form">
      <input
        type="text"
        {...register("description", { required: true, maxLength: 60 })}
        placeholder="Nueva tarea"
      />
      {errors.description && (
        <span>La tarea es requerida y debe tener menos de 60 caracteres.</span>
      )}

      <input
        type="date"
        {...register("dueDate")}
        min={todayStr} // evita seleccionar fechas pasadas
      />

      <button type="submit" className="add-task-btn">
        Agregar Tarea
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TaskForm;
