import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import "./filters.css";
const Filters = ({ setFilter }) => {
  return (
    <div className="allFilters">
      <Button
        onClick={() => setFilter("all")}
        variant="contained"
        className="all"
      >
        Todas
      </Button>
      <Button
        onClick={() => setFilter("pending")}
        variant="outlined"
        className="pending"
      >
        Pendientes
      </Button>
      <Button
        onClick={() => setFilter("completed")}
        variant="outlined"
        className="completed"
      >
        Completadas
      </Button>
    </div>
  );
};

Filters.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default Filters;
