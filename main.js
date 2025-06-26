// ===============================
// Chatbot con API de OpenAI
// ===============================

// Historial de mensajes (se guarda aquí cada conversación)
const historial = [];

// ===============================
// Contador de preguntas del usuario (Closure)
// ===============================
function contadorPreguntas() {
  let contador = 0;
  return function () {
    contador++;
    return contador;
  };
}
const contarPregunta = contadorPreguntas();

// ===============================
// Obtener elementos del DOM
// ===============================
const promptInput = document.querySelector("#prompt");
const button = document.querySelector("#generate");
const output = document.querySelector("#output");

// ===============================
// Renderizar los mensajes en el DOM
// ===============================
function renderMensajes() {
  output.innerHTML = ""; // Limpiar antes de volver a renderizar

  historial.forEach((mensaje) => {
    const divMensaje = document.createElement("div");
    divMensaje.innerText = mensaje.contenido;
    divMensaje.classList.add(mensaje.autor === "Usuario" ? "usuario" : "ia");
    output.appendChild(divMensaje);
  });

  // Scroll automático hacia abajo
  output.scrollTop = output.scrollHeight;
}

// ===============================
// Mostrar mensaje de bienvenida
// ===============================
function iniciarChat() {
  const bienvenida = {
    autor: "IA",
    contenido: "¡Hola! 👋 Bienvenido al chat. Estoy listo para ayudarte con tus preguntas.",
    timestamp: new Date().toLocaleString(),
  };
  historial.push(bienvenida);
  renderMensajes();
}

// ===============================
// Función que llama a la API de OpenAI
// ===============================
async function getCompletion(prompt, callback) {
  const API_KEY = 'Reemplazar'; 

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Eres un asistente útil." },
        { role: "user", content: prompt },
      ],
      temperature: 0.9,
    }),
  });

  const data = await res.json();
  callback(data);
}

// ===============================
// Evento al hacer clic en el botón de enviar
// ===============================
button.addEventListener("click", () => {
  const userInput = promptInput.value.trim();
  if (!userInput) return; // No hacer nada si el campo está vacío

  const timestamp = new Date().toLocaleString();

  // Guardar mensaje del usuario en el historial
  historial.push({
    autor: "Usuario",
    contenido: userInput,
    timestamp: timestamp,
  });

  // Contar y mostrar número de preguntas del usuario
  const total = contarPregunta();
  console.log("Preguntas del usuario:", total);

  renderMensajes();
  promptInput.value = "";

  // Llamar a la API de OpenAI
  getCompletion(userInput, (response) => {
    try {
      const mensajeIA = response.choices[0].message.content;
      const timestampIA = new Date().toLocaleString();

      // Guardar respuesta de la IA en el historial
      historial.push({
        autor: "IA",
        contenido: mensajeIA,
        timestamp: timestampIA,
      });

      renderMensajes();
    } catch (error) {
      console.error("Error al obtener respuesta:", error);
      output.innerHTML = "Ocurrió un error. Verifica tu API Key.";
    }
  });
});

// ===============================
// Inicializar el chat al cargar la página
// ===============================
iniciarChat();
