//Generamos un numero aleatorio que se encuentre en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
// Creamos una constante que permite identificar el maximo de intentos
const numeroIntentos = 3;
// Guardara el numero de intentos que realiza el usuario
let intentos = 1;
function generarNumeroAleatorio() {
  //Definimos una variable para impresion de mensajes
  let mensaje;
  // Utilizamos el dom para acceder al parrafo creado
  const parrafo = document.querySelector("#idParrafo");

  // Verificamos en que intento esta el usuario
  if (intentos <= numeroIntentos) {
    const numeroCapturado = prompt(
      "¿Que número se ha generado (Intento " + intentos + ")?"
    );
    const numero = Number(numeroCapturado);

    if (Number.isNaN(numero)) {
      mensaje = "Ingrese un número válido del 1 al 25.";
      parrafo.textContent = mensaje;
      return;
    }

    //verificamos el numero aleatorio con el ingresado por el usuario
    if (numero == numeroAleatorio) {
      mensaje = `¡Es sorprente, pudiste adivinar el numero oculto (${numeroAleatorio}).
      Refresque la página para volver a jugar.`;
    } else if (intentos == numeroIntentos) {
      const pista =
        numero < numeroAleatorio
          ? "El número oculto es más alto."
          : "El número oculto es más bajo.";
      mensaje = `Su numero de intentos ha terminado. ${pista}
      El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    } else {
      const pista =
        numero < numeroAleatorio
          ? "El número oculto es más alto."
          : "El número oculto es más bajo.";
      mensaje = `${pista} Vuelve a intentar. Quedan ${
        numeroIntentos - intentos
      } intentos`;
    }

    //aumentamos el valor de los intentos
    intentos++;
  } else {
    mensaje = `Su numero de intentos ha terminado.
    El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
  }

  parrafo.innerHTML = mensaje;
}
