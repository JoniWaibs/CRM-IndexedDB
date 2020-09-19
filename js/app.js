/*
1 - Crear el esquema en cada hoja OK
2 - import y exports 
3 - inicializar la ddbb y configurarla por unica vez OK
4 - instanciar la ddbb para mostrar en el dom los clientes cargados
*/
//Imports
import { showHTML , deleteClient} from "./Functions/Functions.js";
import { clientList } from './Selectores/Selectores.js'
//Disponibilizar todo el codigo unicamente en eeste documento
(()=>{
    console.log('index')
    //Almacenar toda la base de datoa de forma global
    let dataBase;

    //Eventos
    //Cuando cargue el dom crear la base de datos y luego si ya esxiste una cargada mostrarla por html
    document.addEventListener('DOMContentLoaded', ()=>{
        //Crear la bbdd
        crearDB();

        //COmprueba si hay bbdd creada
        if(window.indexedDB.open('CRM', 1)){

            //Mostrar en el dom todos los clientes despues de 2 segundos de cargada la pagina
            setTimeout(()=>{
                showHTML()
            },250)
        }
    })
    //Click para eliminar elementos
    clientList.addEventListener('click', deleteClient)


    //Funcion que crea, conecta y configura por unica vez la ddbb
    function crearDB(){
        //Cearla
        let creandoDB = window.indexedDB.open('CRM', 1)
        //Error
        creandoDB.onerror = function(){
            console.log('No se pudo crear la base de datos')
        }
        //Success
        creandoDB.onsuccess = function(){
            console.log('Creada con exito')
            //Asignarle la ddbb a la variable global
            dataBase = creandoDB.result;
            console.log(dataBase)
        }
        //Set por unica vez
        creandoDB.onupgradeneeded = function(e){
            //Asignar ddbb entera en la variable db
            let db = e.target.result;
            //Crear el almacen
            let objectStore = db.createObjectStore('CRM', {keyPath : 'id', autoIncrement: true})
            //Crear los indexes
            objectStore.createIndex( 'nombre','nombre', { unique: false } )
            objectStore.createIndex( 'email','email', { unique: true } )
            objectStore.createIndex( 'telefono','telefono', { unique: false } )
            objectStore.createIndex( 'empresa','empresa', { unique: false } )
            objectStore.createIndex( 'id','id', { unique: true } )//Ademas de los campos requeridos en el form, cad acliente tendra un id
            console.log('bd configurada')
        }
    };

})();
