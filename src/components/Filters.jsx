import PropTypes from "prop-types";

const Filters = ({ setFilter }) => {
	return (
		<div className="allFilters">
			<button onClick={() => setFilter("all")} className="all">
				Todas
			</button>
			<button onClick={() => setFilter("pending")} className="pending">
				Pendientes
			</button>
			<button onClick={() => setFilter("completed")} className=" completed">
				Completadas
			</button>
		</div>
	);
};

Filters.propTypes = {
	setFilter: PropTypes.func.isRequired,
};

export default Filters;
