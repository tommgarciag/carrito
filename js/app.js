// Variables

const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');

// Event Listeners

eventListeners()

function eventListeners() {
    // Agregar al carrito
    cursos.addEventListener('click', comprarCurso);
    // Eliminar del carrito
    carrito.addEventListener('click', eliminarCurso);
    // Btn vaciar carrito
    btnVaciarCarrito.addEventListener('click', vaciarCarrito);
    // Al cargar documentos, mostrar Local Storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
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
    let curso;
    let cursoId;
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
        console.log(cursoId);
    };     
    eliminarCursoLocalStorage(cursoId);
    
}

function vaciarCarrito() {
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
    // Vaciar Local Storage
    vaciarLocalStorage();
}

function leerLocalStorage() {
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach((curso) => {
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
    });
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
    guardarLocalStorage(curso);
}

function guardarLocalStorage(curso) {
    let cursos;
    cursos = obtenerCursosLocalStorage();
    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function obtenerCursosLocalStorage() {
    let cursosLS;
    // Comprobar si hay cursos en Local Storage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

// Elimina el curso por medio de su atributo 'data-id'
function eliminarCursoLocalStorage(cursoId) {
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach((curso, index) => {
        if (curso.id === cursoId) {
            cursosLS.splice(index, 1);
        }         
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}