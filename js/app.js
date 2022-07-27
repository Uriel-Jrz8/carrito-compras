//varibles
/* Accediendo a estas secciones */
const carrito = document.querySelector('#carrito');
const listCursos = document.querySelector('#lista-cursos');
const contenedor = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener (){
    listCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click',eliminarCurso);
    vaciarCarrito.addEventListener('click' ,() => {
        articulosCarrito = [];
        limpiarHtml();
    })

}

function eliminarCurso(event){
    if(event.target.classList.contains('borrar-curso')){
        const idCurso = event.target.getAttribute('data-id');

        /* Eliminando de una buena practica */
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== idCurso ); 
        htmlCreation();    
    } 
}


/* agregando curso */
function agregarCurso(event){
    const curso = event.target.parentElement.parentElement;
    //console.log(curso);
    event.preventDefault();
    if(event.target.classList.contains('agregar-carrito')){
        //console.log('Agregando');
        infoCurso(curso);
    }

}

/* obteniendo la info del cursoseleccionado */
function infoCurso(cursoSeleccionado){
    const infoCurso = {
        image: cursoSeleccionado.querySelector('img').src,
        title: cursoSeleccionado.querySelector('h4').textContent,
        precio:cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad:1

    };
/* revisar si ya existe un curso agregado */
    const existe = articulosCarrito.some(carrito => carrito.id === infoCurso.id);
    if(existe){
        const cantidadCursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cantidadCursos]
    }else{
        /* agregando los cursos seleccionados al arreglo articulosCarrito por primera ves */
        articulosCarrito = [...articulosCarrito,infoCurso];
    } 
    htmlCreation();
}


/* construir HTML pra colocarlo en el tbody */
function htmlCreation() {
    limpiarHtml();
    articulosCarrito.forEach(carrito =>{
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src=${carrito.image} width =100></td>
        <td>${carrito.title}</td>
        <td>${carrito.precio}</td>
        <td>${carrito.cantidad}</td>
        <td> <a href="#" class= "borrar-curso" data-id=${carrito.id}>X</td>
        `
        /* agregando el html */
        contenedor.appendChild(row);
    })
}

//limpiar los cursos del tbody
function limpiarHtml(){
    //contenedor.innerHTML = '';
   /*  limpiando de una mejor manera el HTML */
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}