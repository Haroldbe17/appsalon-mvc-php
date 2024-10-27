let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function(){
    
    iniciarApp();
})

function iniciarApp(){

    mostrarSeccion(); //Muestra y oculta las secciones
    tabs(); //Cambia la seccion cuando se presionen los tabs
    botonesPaginador(); //Agrega o quita los botones del paginador
    paginaSiguiente(); 
    paginaAnterior();
    consultarAPI(); //Consulta la API en el backend
    idCliente();
    nombreCliente(); //Añade el nombre al objeto de cita
    desactivarFechas(); //Desactiva los fines de semana y los dias anteriores al actual en el input type date
    seleccionarFecha(); //Añade la fecha de la cita al objeto cita
    seleccionarHora(); //Añade la hora de la cita al objeto cita
    mostrarResumen(); //Muestra el resumen de la cita

}

function mostrarSeccion(){

    //Ocultar la seccion que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');

    if (seccionAnterior){
        seccionAnterior.classList.remove('mostrar');
    }

    //Seleccionar la seccion con el paso...
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);

    seccion.classList.add('mostrar');

    // Quita la clase de actual a la clase anterior 
    const tabAnterior = document.querySelector('.actual');
    if (tabAnterior){
        tabAnterior.classList.remove('actual');
    }

    //Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function tabs(){
    const botones = document.querySelectorAll('.tabs button')

    botones.forEach( boton => {
        boton.addEventListener('click', function(e){
            paso = parseInt(e.target.dataset.paso);

            mostrarSeccion();


            botonesPaginador();

        })
    } )
}

function botonesPaginador(){
    
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1){
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar')
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion();
}

function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function(){

        if (paso <= pasoInicial) return;

        paso--;

        botonesPaginador();
    });
}

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function(){

        if(paso >= pasoFinal) return;

        paso++;

        botonesPaginador();
    });
}

async function consultarAPI(){

    try {
        const url = `/api/servicios`;
        const resultado = await fetch(url);
        const servicios = await resultado.json();

        mostrarServicios(servicios);
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios( servicios ){
    servicios.forEach( servicio => {
        const { id, nombre, precio} = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function() {
            seleccionarServicio(servicio)
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
    })
}

function seleccionarServicio(servicio){
    const { id } = servicio;
    const { servicios } = cita;

    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    //Comprobar si un servicio esta seleccionado
    if ( servicios.some( agregado => agregado.id === id) ) {
        cita.servicios = servicios.filter( agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    } else {
        //Agregarlo
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }


}
function idCliente() {
    const id = document.querySelector('#id').value;

    cita.id = id;
}

function nombreCliente(){
    const nombre = document.querySelector('#nombre').value;

    cita.nombre = nombre;

}

function desactivarFechas(){
    // Obtener el input del tipo date
    const fechaInput = document.getElementById('fecha');

    // Establecer el valor mínimo como la fecha de hoy
    const hoy = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('min', hoy);

    // Validar cada vez que el usuario seleccione una fecha
    fechaInput.addEventListener('input', function() {
        const fechaSeleccionada = new Date(this.value);
        const diaSemana = fechaSeleccionada.getUTCDay();

        // Si es domingo (0), borrar el valor del input
        if (diaSemana === 0) {
            mostrarAlerta('El domingo no estamos abiertos', 'error', '.alertas');
            this.value = ''; // Elimina la selección
        }
    });
}

function seleccionarFecha(){
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e){

        cita.fecha = inputFecha.value;
    })
}

function seleccionarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e) {

        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if (hora < 9 || hora > 17){
            e.target.value = '';
            mostrarAlerta('Nuestras horas laborales son de 9am a 6pm', 'error', '.alertas')
        } else {
            cita.hora = e.target.value;
        }

    })
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
    const alertaPrevia = document.querySelector('.alerta');

    // Remover la alerta previa si existe
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    const referencia = document.querySelector(elemento);
    

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta', tipo);

    referencia.appendChild(alerta);

    if (desaparece) {
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}


function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen');

    //Limpiar el contenido de resumen
    // while (resumen.firstChild){
    //     resumen.removeChild(resumen.firstChild);
    // }

    if (Object.values(cita).includes('') && cita.servicios.length === 0){
        mostrarAlerta('Faltan datos de la cita (Fecha u Hora) y además debes elegir un servicio', 'error', '.alertas-resumen', false);

    } else if (Object.values(cita).includes('') ){
        mostrarAlerta('Faltan datos de la cita (Fecha u Hora)', 'error', '.alertas-resumen', false );

    } else if (cita.servicios.length === 0){
        mostrarAlerta('Debes elegir al menos 1 servicio', 'error', '.alertas-resumen', false);
        
        
    }
     else {
        while (resumen.firstChild){
            resumen.removeChild(resumen.firstChild);
        }
        formatearResumen();
    }
}

//Formatear el div de resumen
function formatearResumen(){
    const resumen = document.querySelector('.contenido-resumen');
    const { nombre , fecha, hora, servicios} = cita;

    //Heading para Servicios en resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);

    //Iterando en los servicios
    servicios.forEach(servicio => {
        const { id, precio, nombre} = servicio;

        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio: </span>$${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    });

    //Heading para Cita en resumen
    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de Cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    //Formatear fecha
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date( Date.UTC(year, mes, dia));
    
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX', opciones);

    // console.log(cita.servicios); 

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Fecha:</span> ${hora}`;

    //Boton para crear una cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservarCita;


    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);

    resumen.appendChild(botonReservar)
}

async function reservarCita(){

    const { nombre, fecha, hora, servicios, id } = cita;

    const idServicio = servicios.map( servicio => servicio.id );
    // console.log(idServicio);

    const datos = new FormData();

    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicio);

    // console.log([...datos]);

    try {

            //PEticion hacia la API
        const url = `/api/citas`;
        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });

        const resultado = await respuesta.json();
        // console.log(resultado.resultado);

        if (resultado.resultado) {
            Swal.fire({
                icon: "success",
                title: "Cita Creada",
                text: "Tu cita fue creada correctamente",
                button: 'OK'
            }).then ( () => {
                setTimeout( ()=>{
                    window.location.reload();
                },1000)
            })

        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al guardar tu cita",
            button: 'OK'
          });
    }
    

    // console.log([...datos]);

}