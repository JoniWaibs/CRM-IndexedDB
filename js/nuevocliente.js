//Importar selectores classes y funciones
import { Formulario } from "./Selectores/Selectores.js";
import { dataRead } from './Functions/Functions.js'
(()=>{
    console.log('Agregar Nuevos Clientes');
    //Selectores propios
    //eventos propios
    Formulario.addEventListener('submit', dataRead);   
})();