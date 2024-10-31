import TaskList from "./components/TaskList";
import CambiarFondo from "./components/CambiarFondo";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <div className="container">
        <CambiarFondo />
        <h1>Lista de Tareas</h1>

        <TaskList />
      </div>
      <Footer />
    </>
  );
};

export default App;
