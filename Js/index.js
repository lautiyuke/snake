const VERDE_CLARO = "#aad751";
const VERDE_MEDIO = "#a2d149";
const VERDE_OSCURO = "#578a34";
const COLOR_MANZANAS = "red";
const CANT_MANZANAS = 5;

const ANCHO = 10;
const ALTO = 9;
const TAMAÑO_BLOQUE = 60;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = ANCHO * TAMAÑO_BLOQUE;
canvas.height = ALTO * TAMAÑO_BLOQUE;
context.scale(TAMAÑO_BLOQUE, TAMAÑO_BLOQUE);

let tablero = [];
let manzanas = [];
let serpiente = {
	nombre: "Sergio",
	posiciones: [
		[Math.floor(ANCHO / 2) - 3, Math.floor(ALTO / 2)],
		[Math.floor(ANCHO / 2) - 2, Math.floor(ALTO / 2)],
		[Math.floor(ANCHO / 2) - 1, Math.floor(ALTO / 2)],
	],
	direccion: 39,
	colorCabeza: "#2b4996",
	color: "#426fe3",
};
for (let i = 0; i < CANT_MANZANAS; i++) {
	dropManzana();
}
crearTablero();

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

	manzanas.forEach((row, y) => {
		row.forEach((value, x) => {
			context.fillStyle = COLOR_MANZANAS;
			context.fillRect(manzanas[y][0], manzanas[y][1], 1, 1);
		});
	});
}

function actualizar() {
	dibujar();
	window.requestAnimationFrame(actualizar);
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function dropManzana() {
	let nueva = [random(0, ANCHO), random(0, ALTO)];
	if (
		!checkColision(manzanas, nueva) &&
		!checkColision(serpiente.posiciones, nueva)
	) {
		manzanas.push(nueva);
	} else {
		dropManzana();
	}
}

function checkColision(array, nuevaPos) {
	for (let i = 0; i < array.length; i++) {
		if (array[i][0] === nuevaPos[0] && array[i][1] === nuevaPos[1]) {
			return true;
		}
	}
	return false;
}

function perdiste() {
	if (serpiente.posiciones.length >= ANCHO * ALTO) {
		console.log("Ganaste!");
	} else {
		console.log("Perdiste!");
	}
}

function movimiento(nuevaCabeza) {
	serpiente.posiciones.push(nuevaCabeza);
	if (checkColision(manzanas, nuevaCabeza)) {
		for (let i = 0; i < manzanas.length; i++) {
			if (manzanas[i][0] === nuevaCabeza[0] && manzanas[i][1] === nuevaCabeza[1]) {
				manzanas.splice(i, 1);
			}
		}
		dropManzana();
	} else {
		serpiente.posiciones.shift();
	}
}

function LEFT() {
	let cabeza = serpiente.posiciones[serpiente.posiciones.length - 1];
	let nuevaCabeza = [cabeza[0] - 1, cabeza[1]];

	if (
		nuevaCabeza[0] >= 0 &&
		nuevaCabeza[0] < ANCHO &&
		!checkColision(serpiente.posiciones, nuevaCabeza)
	) {
		serpiente.direccion = 37;
		movimiento(nuevaCabeza);
	} else {
		perdiste();
	}
}

function UP() {
	let cabeza = serpiente.posiciones[serpiente.posiciones.length - 1];
	let nuevaCabeza = [cabeza[0], cabeza[1] - 1];

	if (
		nuevaCabeza[1] >= 0 &&
		nuevaCabeza[1] < ALTO &&
		!checkColision(serpiente.posiciones, nuevaCabeza)
	) {
		serpiente.direccion = 38;
		movimiento(nuevaCabeza);
	} else {
		perdiste();
	}
}

function RIGHT() {
	let cabeza = serpiente.posiciones[serpiente.posiciones.length - 1];
	let nuevaCabeza = [cabeza[0] + 1, cabeza[1]];

	if (
		nuevaCabeza[0] >= 0 &&
		nuevaCabeza[0] < ANCHO &&
		!checkColision(serpiente.posiciones, nuevaCabeza)
	) {
		serpiente.direccion = 39;
		movimiento(nuevaCabeza);
	} else {
		perdiste();
	}
}

function DOWN() {
	let cabeza = serpiente.posiciones[serpiente.posiciones.length - 1];
	let nuevaCabeza = [cabeza[0], cabeza[1] + 1];

	if (
		nuevaCabeza[1] >= 0 &&
		nuevaCabeza[1] < ALTO &&
		!checkColision(serpiente.posiciones, nuevaCabeza)
	) {
		serpiente.direccion = 40;
		movimiento(nuevaCabeza);
	} else {
		perdiste();
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

document.addEventListener("keydown", (event) => {
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
});
actualizar();
let interval = setInterval(moverse, 500);
