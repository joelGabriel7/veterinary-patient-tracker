import Notificacion from './classes/Notificacion.js'
import AdminCitas from './classes/AdminCitas.js';
import {citaObj, editando} from './variables.js'
import {formulario, formularioInput, pacienteInput, sintomasInput, propietarioInput, fechaInput,emailInput } from './selectors.js'


const cita = new AdminCitas();

export function datosCita(e) {
    // De esta forma se insertara dinamicamente el valor de los inputs a la propiedades del objecto
    citaObj[e.target.name] = e.target.value
}

export function submitCita(e) {
    e.preventDefault();
    if (Object.values(citaObj).some(valor => valor.trim() === '')) {
        new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        })
        return;
    }

    if (editando.value) {
        cita.editar({...citaObj})
        new Notificacion({
            texto: 'Guardado correctamente',
            tipo: 'exito'
        })
    } else {
        cita.agregar({ ...citaObj })
        new Notificacion({
            texto: 'Paciente Registrado',
            tipo: 'exito'
        })
    }

      
    formulario.reset()
    reinciarObjectoCita()
    formularioInput.value= 'Registrar paciente'
    editando.value=false;
};

export function reinciarObjectoCita() {
    // citaObj.paciente = '';
    // citaObj.propietario = '';
    // citaObj.email = '';
    // citaObj.fecha = '';
    // citaObj.sintomas = '';

    'Es lo mismo'

    Object.assign(citaObj, {
        id: generarIds(),
        paciente: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
    })

}


export function generarIds() {
    return Math.random().toString(36).substring(2) + Date.now();
}

export function cargarEdicion(cita) {
    
    Object.assign(citaObj, cita)
    pacienteInput.value = cita.paciente
    propietarioInput.value = cita.propietario
    emailInput.value = cita.email
    fechaInput.value = cita.fecha
    sintomasInput.value = cita.sintomas
    editando.value = true
    formularioInput.value= 'Guardar Cambios'
}
