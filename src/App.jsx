import TaskList from "./components/TaskList";
import CambiarFondo from "./components/CambiarFondo";

const App = () => {
	return (
		<div className="container">
				<CambiarFondo/>
			<h1>Lista de Tareas</h1>
			
			<TaskList />
		 
		</div>
	);
};

export default App;
