// VARIABLES
const ListaAutos = document.querySelector('#resultado');

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const maxYear = new Date().getFullYear();
const minYEar = maxYear - 12;

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
};

// EVENTOS
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos);

    llenarSelect();
});

//selector de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
})

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
})

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto()
})

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto()
})

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto()
})

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto()
})

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;

    filtrarAuto()
})

// FUNCIONES
function mostrarAutos(autos){

    limpiarHTML();

    autos.forEach( auto =>{
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
            marca : ${auto.marca},
            modelo: ${auto.modelo},
            year: ${auto.year},
            precio: ${auto.precio}
            puertas: ${auto.puertas},
            color: ${auto.color},
            trasmision: ${auto.transmision}
        `;

        ListaAutos.appendChild(autoHTML);
    })
};

//limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//llenar el selector de los años
function llenarSelect(){
    for( let i = maxYear; i > minYEar; i-- ){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

//BUSQUEDA
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTrasmicion).filter(filtrarColor);

    if( resultado.length ){
        mostrarAutos(resultado);
    } else{
        noHayResultado();
    }
}

function noHayResultado(){
    limpiarHTML()

    const mensaje = document.createElement('div');
    mensaje.classList.add( 'alerta', 'error');
    mensaje.textContent = 'NO HAY AUTOS CON ESAS ESPECIFICACIONES'
    ListaAutos.appendChild(mensaje)
}

function filtrarMarca(auto){
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}

function filtrarYear(auto){
    if(datosBusqueda.year){
        return auto.year === datosBusqueda.year;
    }
    return auto;
}

function filtrarMinimo(auto){
    if(datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    if(datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo
    }
    return auto;
}

function filtrarPuertas(auto){
    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTrasmicion(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }
    return auto;
}
