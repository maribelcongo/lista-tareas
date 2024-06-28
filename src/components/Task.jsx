import { useState } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

const Task = ({ task, toggleComplete, editTask, deleteTask }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newDescription, setNewDescription] = useState(task.description);

	const handleEdit = () => {
		editTask(task.ID, newDescription);
		setIsEditing(false);
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
