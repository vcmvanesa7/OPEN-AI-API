// 1 - 1 Modela los mensajes como objetos JS con propiedades autor, contenido y timestamp.
const mensajeUsuario = {
    autor: "Usuario",
    contenido: "Hola Chatcito ¿Cómo estás?",
    timestamp: "2025-06-25 10:32:12"
};
const mensajeIA = {
    autor: "IA",
    contenido: "¡Hola! Estoy muy bien, gracias por preguntar 😊, ¿Y tú?",
    timestamp: "2025-06-25 10:32:17"
};

// 1 - 2 Crea un historial de conversaciones que sea un array de objetos mensaje.
const historial = [
    {
        autor: "Usuario",
        contenido: "Hola amiguito ¿Cómo estás?",
        timestamp: "2025-06-25 10:00:00"
    },
    {
        autor: "IA",
        contenido: "¡Hola! estoy feliz de saludarte, ¿cómo estás hoy?",
        timestamp: "2025-06-25 10:00:02"
    },
    {
        autor: "Usuario",
        contenido: "Estoy entuciasmada, estoy aprendiendo JavaScript",
        timestamp: "2025-06-25 10:00:30"
    },
    {
        autor: "IA",
        contenido: "¡Que emoción! Solo dime, estoy listo para ayudarte 💪✨",
        timestamp: "2025-06-25 10:00:32"
    },
]
// 1 - 3 Crea una función para renderizar los mensajes en el DOM usando .forEach() sobre el array de objetos.
const chat = document.getElementById("chat"); //Div HTML - contenedor mensajes

//Recorrer los elementos con forEach
historial.forEach(function (mensaje) {

    console.log("Mensaje procesado:", mensaje); // para ver en consola

    // Crear un div para el mensaje
    const divMensaje = document.createElement("div");

    // 2. Agregar el contenido
    divMensaje.innerText = `${mensaje.autor}: ${mensaje.contenido} (${mensaje.timestamp})`;

    // 3. Agregar ese div al contenedor del chat
    chat.appendChild(divMensaje);

});

//2 - 4 Demuestra un caso de hoisting, usando una función declarada antes de ser definida.
contarMensajes();

function contarMensajes() {
    console.log(`Tienes ${historial.length} mensajes en el chat`);
}

//2 - 5 Crea una función closure que permita contar cuántas preguntas ha hecho el usuario.
function contadorPreguntas() {
    let contador = 0;

    return function () {
        contador++;
        return contador;
    };
};
const contarPregunta = contadorPreguntas();

//

//Recorrer los elementos con forEach
historial.forEach(function (mensaje) {

    // Crear un div para el mensaje
    const divMensaje = document.createElement("div");

    // 2. Agregar el contenido
    divMensaje.innerText = `${mensaje.autor}: ${mensaje.contenido} (${mensaje.timestamp})`;

    // 3. Agregar ese div al contenedor del chat
    chat.appendChild(divMensaje);

    if (mensaje.autor === "Usuario") {
        const totalPreguntas = contarPregunta();
        console.log("Total de preguntas del usuario hasta ahora:", totalPreguntas);
    };

});