import { Box, Typography, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";

import GitHubIcon from "@mui/icons-material/GitHub";
import Favorite from "@mui/icons-material/Favorite";
const Footer = () => {
  return (
    <Box className="footer">
      <Typography variant="body1" className="footer-text">
        Hecho con <Favorite style={{ color: "red", fontSize: "16px" }} /> por
        Maribel
      </Typography>
      <Box className="icon-container">
        <IconButton
          href="https://www.linkedin.com/in/maribel-congo-379727268/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon className="footer-icon" />
        </IconButton>
        <IconButton
          href="encantada.bs@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MailIcon className="footer-icon" />
        </IconButton>
        <IconButton
          href="https://github.com/maribelcongo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon className="footer-icon" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
