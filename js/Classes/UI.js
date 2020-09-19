import { alertas, clientList } from '../Selectores/Selectores.js'

//Clase encargada de toda la interface
export class UI{
    //ALertas
    showAlert(color, msj){
        alertas.innerHTML = `
        <div class="bg-${color}-500 text-white font-bold rounded-t px-4 py-2 text-center">
            <p>${msj}</p>
        </div>
        `
        setTimeout(()=>{
            alertas.innerHTML = ''
        },3000)
    }
    //Muestra clientes de la ddbb en el dom
    showClientes(item){
        //Deconstruir cada objeto del almacen
        let { nombre, email, telefono, empresa, id } = item;
        //crear el html correspondiente (Atencion con el +=  que sirve para replicar el template x cada cliente)
        clientList.innerHTML += `
        <tr>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                <p class="text-gray-700">${telefono}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
                <p class="text-gray-600">${empresa}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
            </td>
        </tr>
        `
        //Mando el id como parametro en la URL que conduce al ficheero editar porque lo voy a necesitar para capturar, editar y volver a guardar
    }
    listenAudio(audio){
        speechSynthesis.speak(new SpeechSynthesisUtterance(audio))
    }
}