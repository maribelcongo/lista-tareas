import { useState } from "react";
import { LuPalette } from "react-icons/lu";
const CambiadorFondo = () => {
	const [colorIndex, setColorIndex] = useState(0);

	const imagenes = [
		'url("https://i.pinimg.com/originals/04/6c/43/046c43bfa1fef37cc6775bed8a61b449.jpg")',
		'url("assets/fondo2.png")',
	];
	const colores = ["#FF5733", "#33FF57", "#5733FF", "#FFFF33", "#33FFFF"];

	const cambiarColor = () => {
		const newColorIndex = (colorIndex + 1) % colores.length;
		setColorIndex(newColorIndex);
		document.body.style.backgroundColor = colores[newColorIndex];
		document.body.style.backgroundImage = imagenes[newColorIndex];
	};

	return (
		<div className="btnCambio">
			<button onClick={cambiarColor} className="LuPalette">
				<LuPalette />
			</button>
		</div>
	);
};

export default CambiadorFondo;
