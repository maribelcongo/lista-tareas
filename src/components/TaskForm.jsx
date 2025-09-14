import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const TaskForm = ({ addTask }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const dueDate = data.dueDate ? new Date(data.dueDate) : new Date();
    addTask(data.description, dueDate);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="task-form">
      <input
        {...register("description", { required: true, maxLength: 60 })}
        placeholder="Nueva tarea"
      />
      {errors.description && (
        <span>La tarea es requerida y debe tener menos de 60 caracteres.</span>
      )}
      <input type="date" {...register("dueDate")} />
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
