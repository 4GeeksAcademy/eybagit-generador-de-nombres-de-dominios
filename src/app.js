import "bootstrap";
import "./style.css";

// Arreglo de pronombres
const pronombres = ['el', 'la'];

// Arreglo de adjetivos
const adjetivos = ['innovador', 'poderoso', 'cautivador', 'elemento'];

// Arreglo de sustantivos (cada uno termina con caracteres que formarán la extensión)
const sustantivos = ['techcom', 'cybernet', 'startupus', 'appio', 'globales'];

// Arreglo de extensiones válidas
const extensiones = ['.com', '.net', '.us', '.io', '.es']

/**
 * Función que genera un dominio uniendo la base y la extensión.
 * Si el sustantivo termina con la parte de la extensión (sin el punto), se inserta el punto para formar un "domain hack"
 * 
 * @param {string} baseDominio - Texto concatenado (pronombre + adjetivo + sustantivo).
 * @param {string} sustantivo - El sustantivo para detectar el sufijo.
 * @param {string} extension - La extensión a agregar (ej. ".net").
 * @returns {string} - El dominio final
 */
const generarDominio = (baseDominio, sustantivo, extension) => {
  // Se elimina el punto de la extensión
  const extSinPunto = extension.slice(1);

  // Comparación sin importar mayúsculas/minúsculas
  if (sustantivo.toLowerCase().endsWith(extSinPunto.toLowerCase())){
    // Si coincide, se hace el "domain hack"
    return baseDominio.slice(0, baseDominio.length - extSinPunto.length) + extension;
  } else { 
    // De lo contrario, se concatena la extensión normalmente
    return baseDominio + extension;
  }
};

// Función que se ejecuta al cargarse el DOM
window.onload = function () {
  console.log("DOM cargado y app.js iniciado");

  // Buscar el contenedor en el HTML (por ejemplo: <div id="salida"></div>)
  const contenedorSalida = document.getElementById('salida');
  if (!contenedorSalida) {
    console.error("No se encontró el elemento con id 'salida'");
    return;
  }

  // Agregamos clases de Bootstrap para centrar el contenido vertical y horizontalmente
  contenedorSalida.classList.add(
    'd-flex',
    'flex-column',
    'justify-content-center',
    'align-items-center'
  );

  // Generar combinaciones de dominios y mostrarlas
  pronombres.forEach(pronombre => {
    adjetivos.forEach(adjetivo => {
      sustantivos.forEach(sustantivo => {
        // Generar la base del dominio
        const baseDominio = pronombre + adjetivo + sustantivo;
        
        // Crear un contenedor para cada grupo de dominios (mismo base)
        // Usamos:
       const grupoDiv = document.createElement('div');

        // Aplicar estilo a los contenedores
        grupoDiv.classList.add('bg-light', 'p-4', 'mb-4', 'mx-auto', 'text-center', 'w-50', 'rounded', 'border', 'border-2', 'border-dark', 'fs-5');
        /** Tambien podriamos hacer esto: 
         * grupoDiv.className = "bg-light p-4 mb-4 mx-auto text-center w-75 rounded border border-2 border-dark fs-5";
         */


        // Agregar un título o descripción a cada grupo
        const titulo = document.createElement('h3');
        titulo.textContent = `Dominios para "${baseDominio}"`;
        titulo.classList.add('mb-3');
        grupoDiv.appendChild(titulo);

        // Iterar sobre cada extensión para combinar con la base del dominio
        extensiones.forEach(extension => {
          const dominioFinal = generarDominio(baseDominio, sustantivo, extension);
          console.log(`Dominio generado: ${dominioFinal}`);

          // Crear un párrafo para cada dominio y añadirlo al grupo
          const parrafo = document.createElement('p');
          parrafo.textContent = dominioFinal;
          parrafo.classList.add('mb-1');
          grupoDiv.appendChild(parrafo);
        });

        // Añadir un separador visual entre cada grupo usando <hr>
        const separador = document.createElement('hr');
        separador.classList.add('bg-light', 'my-3');
        grupoDiv.appendChild(separador);

        // Agregar el grupo completo al contenedor principal
        contenedorSalida.appendChild(grupoDiv);
      });
    });
  });
};
