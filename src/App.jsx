import TaskList from "./components/TaskList";
import CambiarFondo from "./components/CambiarFondo";
const App = () => {
	return (
		<div className="container">
			<h1>Lista de Tareas</h1>
			<TaskList />
			<CambiarFondo/>
		</div>
	);
};

export default App;
