import {  pacienteInput, propietarioInput, emailInput, fechaInput, sintomasInput, formulario} from "./selectors.js";
import { datosCita, submitCita } from "./functions.js";
// Eventos 
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);
formulario.addEventListener('submit', submitCita)



