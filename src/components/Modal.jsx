import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  const buttonStyle = {
    fontFamily: '"Aladin", cursive',
    padding: "10px 20px",
    backgroundColor: "#5a0a8fab",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#0a0a0a",
    fontWeight: 700,
    margin: "15px",
    transition: "background-color 0.3s, color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#bf59bf6e",
  };

  return (
    <div className="modal-overlay">
      <Box className="modal">
        <Typography
          variant="h6"
          sx={{ fontFamily: '"Aladin", cursive', margin: "15px" }}
        >
          {message}
        </Typography>
        <Box
          mt={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <Button
            onClick={onConfirm}
            sx={{
              ...buttonStyle,
              "&:hover": buttonHoverStyle,
            }}
            color="primary"
          >
            Aceptar
          </Button>

          <Button
            onClick={onClose}
            sx={{
              ...buttonStyle,
              "&:hover": buttonHoverStyle,
            }}
            color="secondary"
          >
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
