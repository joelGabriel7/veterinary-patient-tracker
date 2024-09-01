// Selectores
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#formulario-cita');

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


function datosCita(e) {
    // De esta forma se insertara dinamicamente el valor de los inputs a la propiedades del objecto
    citaObj[e.target.name] = e.target.value
}


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
};


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