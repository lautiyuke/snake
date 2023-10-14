const VERDE_CLARO = "#aad751";
const VERDE_MEDIO = "#a2d149";

const COLOR_CABEZA = "#2b4996";
const COLOR_CUERPO = "#426fe3";

const COLOR_MANZANAS = "red";
const CANT_MANZANAS = 5;

const ANCHO = 10;
const ALTO = 9;
const TAMAÑO_BLOQUE = 60;

const presentacion = document.getElementById("presentacion");
const gameContainer = document.getElementById("gameContainer");
const divFin = document.getElementById("fin");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let tablero = [];
let manzanas = [];
let serpiente = {
	posiciones: [
		[Math.floor(ANCHO / 2) - 3, Math.floor(ALTO / 2)],
		[Math.floor(ANCHO / 2) - 2, Math.floor(ALTO / 2)],
		[Math.floor(ANCHO / 2) - 1, Math.floor(ALTO / 2)],
	],
	direccion: 39,
};

function crearTablero() {
	canvas.width = ANCHO * TAMAÑO_BLOQUE;
	canvas.height = ALTO * TAMAÑO_BLOQUE;
	context.scale(TAMAÑO_BLOQUE, TAMAÑO_BLOQUE);
	for (let i = 0; i < ALTO; i++) {
		let fila = [];
		for (let x = 0; x < ANCHO; x++) {
			fila.push(0);
		}
		tablero.push(fila);
	}

	for (let i = 0; i < CANT_MANZANAS; i++) {
		dropManzana();
	}
}

function dibujar() {
	tablero.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value === 0) {
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
		context.fillStyle = COLOR_CUERPO;
		context.fillRect(
			serpiente.posiciones[y][0],
			serpiente.posiciones[y][1],
			1,
			1
		);
	}
	context.fillStyle = COLOR_CABEZA;
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

function fin() {
	if (serpiente.posiciones.length >= ANCHO * ALTO) {
		setTimeout(() => {
			console.log("Ganaste!");
			gameContainer.style.display = "none";
			divFin.innerHTML = "<h1>Ganaste!</h1><p>Click para reiniciar</p>";
			divFin.style.background = "green";
			divFin.style.display = "flex";
		}, 1000);
	} else {
		setTimeout(() => {
			console.log("Perdiste!");
			gameContainer.style.display = "none";
			divFin.innerHTML = "<h1>Perdiste :(</h1><p>Click para reiniciar</p>";
			divFin.style.background = "red";
			divFin.style.display = "flex";
		}, 1000);
	}
}

function movimiento(nuevaCabeza, index, tope, nuevaDire) {
	if (
		nuevaCabeza[index] >= 0 &&
		nuevaCabeza[index] < tope &&
		!checkColision(serpiente.posiciones, nuevaCabeza)
	) {
		serpiente.direccion = nuevaDire;
		serpiente.posiciones.push(nuevaCabeza);
		if (checkColision(manzanas, nuevaCabeza)) {
			for (let i = 0; i < manzanas.length; i++) {
				if (
					manzanas[i][0] === nuevaCabeza[0] &&
					manzanas[i][1] === nuevaCabeza[1]
				) {
					manzanas.splice(i, 1);
				}
			}
			dropManzana();
		} else {
			serpiente.posiciones.shift();
		}
	} else {
		fin();
	}
}

function moverse(direccion) {
	let cabeza = serpiente.posiciones[serpiente.posiciones.length - 1];
	switch (direccion) {
		case 37:
			if (serpiente.direccion != 39) {
				let nuevaCabeza = [cabeza[0] - 1, cabeza[1]];
				movimiento(nuevaCabeza, 0, ANCHO, 37);
			}
			break;
		case 38:
			if (serpiente.direccion != 40) {
				let nuevaCabeza = [cabeza[0], cabeza[1] - 1];
				movimiento(nuevaCabeza, 1, ALTO, 38);
			}
			break;
		case 39:
			if (serpiente.direccion != 37) {
				let nuevaCabeza = [cabeza[0] + 1, cabeza[1]];
				movimiento(nuevaCabeza, 0, ANCHO, 39);
			}
			break;
		case 40:
			if (serpiente.direccion != 48) {
				let nuevaCabeza = [cabeza[0], cabeza[1] + 1];
				movimiento(nuevaCabeza, 1, ALTO, 40);
			}
			break;
		default:
			break;
	}
}

function start() {
	presentacion.style.display = "none";
	gameContainer.style.display = "flex";
	crearTablero();
	let interval = setInterval(() => moverse(serpiente.direccion), 500);
	document.addEventListener("keydown", (event) => {
		clearInterval(interval);
		moverse(event.keyCode);
		interval = setInterval(() => moverse(serpiente.direccion), 500);
	});
	actualizar();
}
