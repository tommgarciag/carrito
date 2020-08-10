// Variables

const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');

// Event Listeners

eventListeners()

function eventListeners() {
    // Agregar al carrito
    cursos.addEventListener('click', comprarCurso);
    // Eliminar del carrito
    carrito.addEventListener('click', eliminarCurso);
}

// Functions

function comprarCurso(e) {
    e.preventDefault();
    // Delegation para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // Leer curso seleccionado para enviar sus datos       
        leerDatosCurso(curso);
    };
}

function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
    }; 
    
}

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),

    }
    insertarAlCarrito(infoCurso);
}

function insertarAlCarrito(curso) {    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src='${curso.imagen}' width='100'>
        </td>
        <td>${curso.nombre}</td>
        <td>${curso.precio}</td>    
        <td>
            <a href='#' class='borrar-curso' data-id='${curso.id}'>X</a>
        </td>
    `;
    listaCursos.appendChild(row);
}