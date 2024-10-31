import { useState } from "react";
import { LuPalette } from "react-icons/lu";

// Importa tus imágenes desde la carpeta assets
import fondo1 from "../assets/fondo oscuro.jpg";
import fondo2 from "../assets/fondo_plumas.jpg";
import fondo3 from "../assets/fondo_stich.jpg";
import fondo4 from "../assets/fondo_planetas.jpg";

const CambiadorFondo = () => {
  const [index, setIndex] = useState(0);

  // Array de imágenes
  const imagenes = [
    `url(${fondo1})`,
    `url(${fondo2})`,
    `url(${fondo3})`,
    `url(${fondo4})`,
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
