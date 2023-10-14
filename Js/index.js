const VERDE_CLARO = "#aad751";
const VERDE_MEDIO = "#a2d149";
const VERDE_OSCURO = "#578a34";

const ANCHO = 20;
const ALTO = 18;
const TAMAÑO_BLOQUE = 30;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = ANCHO * TAMAÑO_BLOQUE;
canvas.height = ALTO * TAMAÑO_BLOQUE;
context.scale(TAMAÑO_BLOQUE, TAMAÑO_BLOQUE);

let tablero = [];
crearTablero();

let serpiente = {
	nombre: "Sergio",
	posiciones: [
		[4, 7],
		[5, 7],
		[6, 7],
		[7, 7],
		[7, 8],
		[7, 9],
		[7, 10],
		[8, 10],
		[9, 10],
	],
	direccion: 39,
	colorCabeza: "#2b4996",
	color: "#426fe3",
};

function crearTablero() {
	for (let i = 0; i < ALTO; i++) {
		let fila = [];
		for (let x = 0; x < ANCHO; x++) {
			fila.push(0);
		}
		tablero.push(fila);
	}
}

function dibujar() {
	tablero.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value == 0) {
				if (y % 2 != 0) {
					if (x % 2 != 0) {
						context.fillStyle = VERDE_CLARO;
						context.fillRect(x, y, 1, 1);
					}
					if (x % 2 === 0) {
						context.fillStyle = VERDE_MEDIO;
						context.fillRect(x, y, 1, 1);
					}
				} else {
					if (x % 2 === 0) {
						context.fillStyle = VERDE_CLARO;
						context.fillRect(x, y, 1, 1);
					}
					if (x % 2 != 0) {
						context.fillStyle = VERDE_MEDIO;
						context.fillRect(x, y, 1, 1);
					}
				}
			}
		});
	});

	for (let y = 0; y < serpiente.posiciones.length - 1; y++) {
		context.fillStyle = serpiente.color;
		context.fillRect(
			serpiente.posiciones[y][0],
			serpiente.posiciones[y][1],
			1,
			1
		);
	}
	context.fillStyle = serpiente.colorCabeza;
	context.fillRect(
		serpiente.posiciones[serpiente.posiciones.length - 1][0],
		serpiente.posiciones[serpiente.posiciones.length - 1][1],
		1,
		1
	);
}

function actualizar() {
	dibujar();
	window.requestAnimationFrame(actualizar);
}

function checkColision(nuevaPos) {
	return serpiente.posiciones.includes(nuevaPos);
}

function LEFT() {
	let cabeza = serpiente.posiciones[serpiente.posiciones.length - 1];
	let nuevaCabeza = [cabeza[0] - 1, cabeza[1]];

	if (
		nuevaCabeza[0] >= 0 &&
		nuevaCabeza[0] < ANCHO &&
		!checkColision(nuevaCabeza)
	) {
		serpiente.direccion = 37;
		serpiente.posiciones.push(nuevaCabeza);
		serpiente.posiciones.shift();
	} else {
		console.log("Perdiste!");
	}
}

function UP() {
	let cabeza = serpiente.posiciones[serpiente.posiciones.length - 1];
	let nuevaCabeza = [cabeza[0], cabeza[1] - 1];

	if (nuevaCabeza[1] >= 0 && nuevaCabeza[1] < ALTO) {
		serpiente.direccion = 38;
		serpiente.posiciones.push(nuevaCabeza);
		serpiente.posiciones.shift();
	} else {
		console.log("Perdiste!");
	}
}

function RIGHT() {
	let cabeza = serpiente.posiciones[serpiente.posiciones.length - 1];
	let nuevaCabeza = [cabeza[0] + 1, cabeza[1]];

	if (nuevaCabeza[0] >= 0 && nuevaCabeza[0] < ANCHO) {
		serpiente.direccion = 39;
		serpiente.posiciones.push(nuevaCabeza);
		serpiente.posiciones.shift();
	} else {
		console.log("Perdiste!");
	}
}

function DOWN() {
	let cabeza = serpiente.posiciones[serpiente.posiciones.length - 1];
	let nuevaCabeza = [cabeza[0], cabeza[1] + 1];

	if (nuevaCabeza[1] >= 0 && nuevaCabeza[1] < ALTO) {
		serpiente.direccion = 40;
		serpiente.posiciones.push(nuevaCabeza);
		serpiente.posiciones.shift();
	} else {
		console.log("Perdiste!");
	}
}

function moverse() {
	switch (serpiente.direccion) {
		case 37:
			LEFT();
			break;
		case 38:
			UP();
			break;
		case 39:
			RIGHT();
			break;
		case 40:
			DOWN();
			break;
		default:
			break;
	}
}

function acelerado(evento) {
	switch (event.keyCode) {
		case 37:
			if (serpiente.direccion != 39) {
				LEFT();
			}
			break;
		case 38:
			if (serpiente.direccion != 40) {
				UP();
			}
			break;
		case 39:
			if (serpiente.direccion != 37) {
				RIGHT();
			}
			break;
		case 40:
			if (serpiente.direccion != 38) {
				DOWN();
			}
			break;
		default:
			break;
	}
}

function noacelerado(evento) {
	switch (event.keyCode) {
		case 37:
			if (serpiente.direccion != 39 && serpiente.direccion != 37) {
				LEFT();
			}
			break;
		case 38:
			if (serpiente.direccion != 40 && serpiente.direccion != 38) {
				UP();
			}
			break;
		case 39:
			if (serpiente.direccion != 37 && serpiente.direccion != 39) {
				RIGHT();
			}
			break;
		case 40:
			if (serpiente.direccion != 48 && serpiente.direccion != 40) {
				DOWN();
			}
			break;
		default:
			break;
	}
}

document.addEventListener("keydown", (event) => {
	acelerado(event);
});

actualizar();
let interval = setInterval(moverse, 500);
