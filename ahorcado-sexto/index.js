document.addEventListener('DOMContentLoaded', function restar() {
    const canva = document.getElementById("myCanvas");
    const contexto = canva.getContext('2d');
    cargarJuego();
})

const diccionario = [["COMPUTADORA", "TODO PROGRAMADOR LA UTILIZA PARA TRABAJAR"], ["CPU", "LOGICA MATEMATICA DE LA PC"], ["MOUSE", "NOS AYUDA A MOVER EL CURSOR"]];
var numeroAleatorio = Math.floor(Math.random()*diccionario.length);
var palabraJuego;

function cargarJuego(){
    palabraJuego = diccionario[numeroAleatorio];
    console.log(palabraJuego[0]);
    dibujarEstructura();
}

function cargarBotones() {
    
}

function dibujarEstructura( ){
    contexto.beginPath();
    contexto.moveTo(50,50);
    contexto.lineTo(200,100,)
}