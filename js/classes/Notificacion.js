import {formulario} from '../selectors.js'

export default class Notificacion {

    constructor({ texto, tipo }) {
        this.texto = texto,
        this.tipo = tipo
        this.mostrar()
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
