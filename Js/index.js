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
    colorCabeza: "dark-blue",
    color: "blue",
    cabeza: {x: 10, y: 10},
    direccion: "DERECHA",
    largo: 2,
}

function crearTablero(){
    for(let i = 0; i<ALTO; i++){
        let fila = [];
        for (let x = 0; x<ANCHO; x++){
            fila.push(0);
        }
        tablero.push(fila);
    }
}

function dibujar(){
    tablero.forEach((row, y) => {
        row.forEach((value, x) =>{
            if (value == 0){
                if (y % 2 != 0){
                    if (x % 2 != 0 ){
                        context.fillStyle = VERDE_CLARO;
                        context.fillRect(x, y, 1, 1);
                    }
                    if (x % 2 === 0){
                        context.fillStyle = VERDE_MEDIO;
                        context.fillRect(x, y, 1, 1);
                    }
                } else {
                    if (x % 2 === 0 ){
                        context.fillStyle = VERDE_CLARO;
                        context.fillRect(x, y, 1, 1);
                    }
                    if (x % 2 != 0){
                        context.fillStyle = VERDE_MEDIO;
                        context.fillRect(x, y, 1, 1);
                    }
                }
            }
        });
    });
}

function actualizar(){
    dibujar();
    window.requestAnimationFrame(actualizar);
}

actualizar();