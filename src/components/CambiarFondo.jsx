import { useState } from "react";
import { LuPalette } from "react-icons/lu";

import fondo1 from "../assets/fondo oscuro.jpg";
import fondo2 from "../assets/PINK.jpeg";
import fondo3 from "../assets/margaritas.jpeg";
// import fondo4 from "../assets/fondo_planetas.jpeg";

const CambiadorFondo = () => {
  const [index, setIndex] = useState(0);

  // Array de imágenes
  const imagenes = [
    `url(${fondo1})`,
    `url(${fondo2})`,
    `url(${fondo3})`,
    // `url(${fondo4})`,
  ];

  const cambiarFondo = () => {
    const newIndex = (index + 1) % imagenes.length;
    setIndex(newIndex);

    // Cambia la imagen de fondo
    document.body.style.backgroundImage = imagenes[newIndex];
  };

  return (
    <div className="btnCambio">
      <button onClick={cambiarFondo} className="LuPalette">
        <LuPalette />
      </button>
    </div>
  );
};

export default CambiadorFondo;
