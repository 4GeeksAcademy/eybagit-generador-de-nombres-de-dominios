// Importa Bootstrap y la hoja de estilos (asegúrate de que las rutas sean correctas) import "bootstrap";

import "./style.css";

// Arreglo de pronombres
const pronombres = ['el', 'la'];

// Arreglo de adjetivos
const adjetivos = ['innovador', 'poderoso', 'cautivador', 'elemento'];

// Arreglo de sustantivos (cada uno termina con caracteres que formarán la extensión)
const sustantivos = ['techcom', 'cybernet', 'startupus', 'appio', 'globales'];

// Arreglo de extensiones válidas
const extensiones = ['.com', '.net', '.us', '.io', '.es'];

/**
 * Función que genera un dominio uniendo la base y la extensión.
 * Si el sustantivo termina con la parte de la extensión (sin el punto),
 * se inserta el punto para formar un "domain hack".  
 *
 * @param {string} baseDominio - Texto concatenado (pronombre + adjetivo + sustantivo).
 * @param {string} sustantivo - El sustantivo para detectar el sufijo.
 * @param {string} extension - La extensión a agregar (ej. ".net").
 * @returns {string} - El dominio final.
 */
const generarDominio = (baseDominio, sustantivo, extension) => {
  // Se elimina el punto de la extensión
  const extSinPunto = extension.slice(1);

  // Comparación sin importar mayúsculas/minúsculas
  if (sustantivo.toLowerCase().endsWith(extSinPunto.toLowerCase())) {
    // Si coincide, se hace el "domain hack"
    return baseDominio.slice(0, baseDominio.length - extSinPunto.length) + extension;
  } else {
    // De lo contrario, se concatena la extensión normalmente
    return baseDominio + extension;
  }
};

// Función que se ejecuta al cargarse el DOM
window.onload = function() {
  console.log("DOM cargado y app.js iniciado");

  // Buscar el contenedor en el HTML para la salida
  const contenedorSalida = document.getElementById('salida');
  if (!contenedorSalida) {
    console.error("No se encontró el elemento con id 'salida'");
    return;
  }

  // Generar combinaciones de dominios y mostrarlas
  pronombres.forEach(pronombre => {
    adjetivos.forEach(adjetivo => {
      sustantivos.forEach(sustantivo => {
        const baseDominio = pronombre + adjetivo + sustantivo;
        extensiones.forEach(extension => {
          const dominioFinal = generarDominio(baseDominio, sustantivo, extension);
          console.log("Dominio generado:", dominioFinal);
          
          // Crear un párrafo para cada dominio y añadirlo al contenedor
          const parrafo = document.createElement('p');
          parrafo.textContent = dominioFinal;
          contenedorSalida.appendChild(parrafo);
        });
      });
    });
  });
};
