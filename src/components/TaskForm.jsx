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
		addTask(data.description);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				{...register("description", { required: true, maxLength: 100 })}
				placeholder="Nueva tarea"
			/>
			{errors.description && (
				<span>La tarea es requerida y debe tener menos de 100 caracteres.</span>
			)}
			<button type="submit">Agregar Tarea</button>
		</form>
	);
};

TaskForm.propTypes = {
	addTask: PropTypes.func.isRequired,
};

export default TaskForm;
