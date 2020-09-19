/*

*/
//Imports
import { nombre, email, telefono, empresa, Formulario } from '../Selectores/Selectores.js';
import { Cliente } from '../Classes/Constructor.js';
import { UI } from '../Classes/UI.js';
//instancio nueva interface
let ui = new UI();
//ALmacenar el id del cliente que se quiere editar
let idCliente;
//DDBB Global
let dataBase;
//Conectar con la base de datos al iniciar el programa
document.addEventListener('DOMContentLoaded', ()=>{


 setTimeout(()=>{
    conectarDB();
    },200)


})


//Funciones
//Conectar con ddbb
function conectarDB(){
    //Cearla
    let conectar = window.indexedDB.open('CRM', 1);
    //Error
    conectar.onerror = function(){
        console.log('hubo un error');
    }
    //Success
    conectar.onsuccess = function(){
        console.log('Conectada');
        //Asignarle la ddbb a la variable global
        dataBase = conectar.result;
    }
};
//Funcion que captura los datos del formulario
export function dataRead(e){
    e.preventDefault();
    //Valirar los campos
    if(nombre.value === '' || email.value === '' || telefono.value ==='' || empresa.value === ''){
        ui.showAlert('red', 'error');
    }else{
        //Crear el objecto
        let id = Date.now();
        let newCliente = new Cliente(nombre.value, email.value, telefono.value, empresa.value, id);
        //inserlarlo en la ddbb
        insertarCliente(newCliente);
        //resetear el formulario
        Formulario.reset();
    
    }
};
//Funcion que inserta los clientes en la base de datos        
function insertarCliente(newCliente){
    //Crear una transaccion
    let transaction = dataBase.transaction('CRM', 'readwrite');
    //Crear el almacen
    let objectStore = transaction.objectStore('CRM');
    //Cargar el nuevo cliente
    objectStore.add(newCliente);
    //Alertas success y error
    transaction.onerror = function(){
        ui.showAlert('red', 'El cliente ya esta registrado');
    }
    transaction.oncomplete = function(){
        ui.listenAudio(newCliente.nombre)
        ui.showAlert('green', 'Nuevo cliente cargado');
        //me dispara hacia el html despues de dos segundos
        setTimeout(()=>{
            window.location.href = 'index.html'
        },300)

    }
};
//Funcion que muestra en el HTML los clientes
export function showHTML(){
    //Instancio las transacciones que hay en el almacen
    let objectStore = dataBase.transaction('CRM').objectStore('CRM');
    //Y con sus metodos, recorro el almacen
    objectStore.openCursor().onsuccess = function(e){
        //Guardo ese resultado en una variable y compruebo
        let clientesDB = e.target.result;
        if(clientesDB){
            //Si existen clientes en la base de datos llamo a mi metodo que los muestra en el dom
            ui.showClientes(clientesDB.value);
            //Continua con el siguiente cliente
            clientesDB.continue();
            
        }else{
            console.log('no hay mas clientes');
        }        
    }
};
//Funcion que Vuelve a llenar el formulario
export function upgradeClient(id){
    //Instancio las transacciones que hay en el almacen
    let objectStore = dataBase.transaction('CRM').objectStore('CRM');
    //Y con sus metodos, recorro el almacen
    objectStore.openCursor().onsuccess = function(e){
        //Compruebo si hay clientes en la ddbb
        if(e.target.result){
            //Obtengo su id para comparar con el id que me llega por params
            let clientesDB = e.target.result.value;
            if(clientesDB.id === id){
                //Llenar los formularios y permitir editar
                nombre.value = clientesDB.nombre;
                email.value = clientesDB.email;
                telefono.value = clientesDB.telefono;
                empresa.value = clientesDB.empresa;
                //Y al id, guardarlo en una variable global
                idCliente = clientesDB.id;
            }
            e.target.result.continue()
        }else{
            console.log('no hay mas')
        }
    }
}
//Funcion que guarda los cambios en la ddbb
export function saveShanges(e){
    e.preventDefault();
     //Valirar los campos
     if(nombre.value === '' || email.value === '' || telefono.value ==='' || empresa.value === ''){
        ui.showAlert('red', 'error');
    }else{
        //Crear el objecto
        let newCliente = new Cliente(nombre.value, email.value, telefono.value, empresa.value, idCliente);
        //inserlarlo en la ddbb
        console.log(newCliente);
        //Crear una transaccion
        let transaction = dataBase.transaction('CRM', 'readwrite');
        //Crear el almacen
        let objectStore = transaction.objectStore('CRM');
        //Cargar el cliente editado
        objectStore.put(newCliente);
        //Alertas success y error
        transaction.onerror = function(){
            ui.showAlert('red', 'Hubo un error');
        }   
        transaction.oncomplete = function(){
            ui.showAlert('green', 'Cambios guardados');
            //me dispara hacia el html despues de dos segundos
            setTimeout(()=>{
                window.location.href = 'index.html'
            },300)
        }
        //resetear el formulario
        Formulario.reset();    
    }

}
//Funcion que elimina elementos
export function deleteClient(e){
    //Compruebo que el elemento tenga la clase eliminar
    if(e.target.classList.contains('eliminar')){
        //Conaigp el id
        const idBorrar = Number(e.target.getAttribute("data-cliente"));
        //Y borro
        console.log(idBorrar)
        //Crear una transaccion
        let transaction = dataBase.transaction('CRM', 'readwrite');
        //Crear el almacen
        let objectStore = transaction.objectStore('CRM');
        //Borra el cliente de la base de datos
        objectStore.delete(idBorrar);
        //Alertas success y error
        transaction.onerror = function(){
            ui.showAlert('red', 'Hubo un error');
        }
        transaction.oncomplete = function(){
            //lo borro del dom para no recargar
            e.target.parentElement.parentElement.remove();
        }
    }
}