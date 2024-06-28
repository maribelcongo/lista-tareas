import  { useState } from 'react';
import { LuPalette } from "react-icons/lu";
const CambiadorFondo = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const colores = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#33FFFF'];

  const cambiarColor = () => {
    setColorIndex((colorIndex + 1) % colores.length);
    document.body.style.backgroundColor = colores[colorIndex];
  };

  return (
    <div>
      <button onClick={cambiarColor} className="fondo"><LuPalette /></button>
    </div>
  );
};

export default CambiadorFondo;
