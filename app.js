// Cambia este valor en cada prueba de despliegue para confirmar
// que la versión publicada es la más reciente.
const APP_VERSION = "1.0.0";

const form = document.getElementById("contact-form");
const resultado = document.getElementById("resultado");

document.getElementById("version-badge").textContent = `v${APP_VERSION}`;
document.getElementById("fecha-carga").textContent = new Date().toLocaleString("es-CO");

function mostrarError(campo, mensaje) {
  document.getElementById(`error-${campo.id}`).textContent = mensaje;
  campo.classList.toggle("invalido", Boolean(mensaje));
}

function validar() {
  let valido = true;
  const { nombre, email, mensaje } = form.elements;

  if (nombre.value.trim().length < 2) {
    mostrarError(nombre, "Ingresa tu nombre (mínimo 2 caracteres).");
    valido = false;
  } else {
    mostrarError(nombre, "");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    mostrarError(email, "Ingresa un correo válido.");
    valido = false;
  } else {
    mostrarError(email, "");
  }

  if (mensaje.value.trim().length < 5) {
    mostrarError(mensaje, "El mensaje debe tener al menos 5 caracteres.");
    valido = false;
  } else {
    mostrarError(mensaje, "");
  }

  return valido;
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  resultado.hidden = true;

  if (!validar()) return;

  const datos = Object.fromEntries(new FormData(form).entries());

  resultado.innerHTML =
    `<strong>¡Formulario enviado!</strong><br>` +
    `Nombre: ${escapar(datos.nombre)}<br>` +
    `Correo: ${escapar(datos.email)}<br>` +
    `Mensaje: ${escapar(datos.mensaje)}`;
  resultado.hidden = false;

  form.reset();
});

function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}