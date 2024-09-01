// Selectores
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#formulario-cita');
const contenedorCita = document.querySelector('#citas')

// Eventos 
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);
formulario.addEventListener('submit', submitCita)


// Objeto de citas
const citaObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}


class Notificacion {

    constructor({ texto, tipo }) {
        this.texto = texto,
            this.tipo = tipo
    }

    mostrar() {

        // Crear la notificacion

        const alerta = document.createElement('div');
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');

        // Eliminar alertas duplicadas
        const alertPrevia = document.querySelector('.alert')
        alertPrevia?.remove()

        // Si la notificacion es de error!

        this.tipo === 'error'
            ? alerta.classList.add('bg-red-500')
            : alerta.classList.add('bg-green-500');

        // Mensaje de notificacion
        alerta.textContent = this.texto

        // insertar en el DOM
        formulario.parentElement.insertBefore(alerta, formulario)

        // Quitar despues de 5 segundos
        setTimeout(() => {
           alerta.remove() 
        }, 3000);

    }
}

class AdminCitas {
    constructor(){
        this.citas = []
        console.log(this.citas)
    }

    agregar(cita){
       this.citas = [...this.citas, cita];
       this.mostrar();
    }

    mostrar() {
        // Limpiar HTML
        while(contenedorCita.firstChild) {
            contenedorCita.removeChild(contenedorCita.firstChild)
        }

        // Generando la cita
        this.citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');
        
            const paciente = document.createElement('p');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;
        
            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;
        
            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;
        
            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;
        
            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;
        
            // Agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            contenedorCita.appendChild(divCita);
        });      
    }
}

function datosCita(e) {
    // De esta forma se insertara dinamicamente el valor de los inputs a la propiedades del objecto
    citaObj[e.target.name] = e.target.value
}

const cita = new AdminCitas();

function submitCita(e) {
    e.preventDefault();
    if (Object.values(citaObj).some(valor => valor.trim() === '')) {
        const notificacion = new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        })
        notificacion.mostrar();
        return;
    }
    cita.agregar(citaObj)
    
};


