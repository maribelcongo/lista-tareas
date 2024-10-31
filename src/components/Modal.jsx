import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <Box className="modal">
        <Typography variant="h6">{message}</Typography>
        <Box mt={2}>
          <Button onClick={onConfirm} color="primary">
            Aceptar
          </Button>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
        </Box>
      </Box>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default Modal;
