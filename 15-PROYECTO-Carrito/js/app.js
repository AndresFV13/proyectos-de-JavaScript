//VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();

function cargarEventListener(){
    // Agregar un curso presionando 'Agregar carrito'
    listaCursos.addEventListener('click', agregarcurso);

    carrito.addEventListener('click', eliminarCurso)

    vaciarCarrito.addEventListener('click', limpiarCarrito);
};

// funciones

function agregarcurso(e){
    e.preventDefault();

    if( e.target.classList.contains('agregar-carrito') ){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
};

function eliminarCurso(e){
    const cursoID = e.target.getAttribute('data-id');

    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoID )

    console.log(articulosCarrito)

    mostrarHTML();
}

// lee el contenido del HTML
function leerDatosCurso(curso){
    // console.log(curso);
    // objeto con el curso actual
    const infoCurso = {
        titulo: curso.querySelector('h4').textContent,
        image: curso.querySelector('img').src,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }
    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe){
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    
    }
    
    console.log(articulosCarrito);

    mostrarHTML();
};

// muestra el carrto de compras en el HTML

function mostrarHTML(){
    // Limpiar el HTML
    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src= ${curso.image} width ="100"/>
            </td>
            <td>
                ${curso.titulo} 
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                ${curso.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>    
        `;

        //Agregar el html del carrito en el tbody
        contenedorCarrito.appendChild(row);

    });
};

function limpiarHTML(){
   while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
   }
};

function limpiarCarrito(){
    
    articulosCarrito = [];
    vaciarCarrito.addEventListener('click', ()=>{
        contenedorCarrito.remove();
    })
}