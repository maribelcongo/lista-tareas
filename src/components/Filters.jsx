import PropTypes from "prop-types";

const Filters = ({ setFilter }) => {
	return (
		<div>
			<button onClick={() => setFilter("all")}>Todas</button>
			<button onClick={() => setFilter("pending")}>Pendientes</button>
			<button onClick={() => setFilter("completed")}>Completadas</button>
		</div>
	);
};

Filters.propTypes = {
	setFilter: PropTypes.func.isRequired,
};

export default Filters;
