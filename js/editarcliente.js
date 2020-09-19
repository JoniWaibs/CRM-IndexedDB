/*
    buscar cada cliente en la base de datos por id
    bajar el id de la url para comparar
    filtrar y mostrar los datos de ese cliente en el formulario a modo edicion
    crear un evento submit para guardar
    Validar los campos
    crear uun nuevo objeto
    volver a meterlo a la base de datos
*/
import { Formulario } from './Selectores/Selectores.js';
import { upgradeClient ,saveShanges } from './Functions/Functions.js'


(()=>{
    document.addEventListener('DOMContentLoaded', ()=>{
        //Obtener la id que llega por url al iniciar app (Convierto el id en numero para qie luego pueda coincidir con la ddbb)
        if(window.location.search){
            let url = new URLSearchParams(window.location.search)
            let id = Number(url.get('id'))
            //Recargdo el formulario despues de 2 segundos
            setTimeout(()=>{
                upgradeClient(id)
            },250)
        }
    })
    //Guardar los nuevos cambios
    Formulario.addEventListener('submit', saveShanges)
})();